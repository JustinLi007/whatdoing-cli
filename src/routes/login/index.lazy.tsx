import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '../../ui/Input';
import FetchLogin from '../../api/login';
import { refreshInterval } from '../../utils/timer';

export const Route = createLazyFileRoute('/login/')({
  component: Login,
})

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("sample@sample.com");
  const [password, setPassword] = useState("shit");

  function handleEmailOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setEmail(val);
  }

  function handlePasswordOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setPassword(val);
  }

  const mutation = useMutation({
    mutationFn: FetchLogin,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries();
      localStorage.setItem("whatdoing-user-id", data.user.id);
      const t = refreshInterval({ seconds: 10, minutes: 1, hours: 1 });
      localStorage.setItem("whatdoing-next-refresh", new Date(t).toString());
      navigate({
        to: `${data.next}`,
      });
    },
    onError: (err) => {
      console.log(`error: failed to login: ${err}`);
    },
  });

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate({
      email: email,
      password: password,
    });
  }

  return (
    <div className={`flex flex-col flex-nowrap h-full items-center justify-center pb-6 gap-1.5`}>
      <form onSubmit={handleFormSubmit}>
        <div className={`flex flex-col flex-nowrap gap-2`}>
          <div>
            <Input
              id='email'
              value={email}
              type='email'
              label='Email'
              onChange={handleEmailOnChange}
              required={true}
            />
          </div>
          <div>
            <Input
              id='password'
              value={password}
              type='password'
              label='Password'
              onChange={handlePasswordOnChange}
              required={true}
            />
          </div>
          <div>
            <button type="submit" className={`border-1 border-gray-500 p-3 w-full active:bg-gray-500`}>Login</button>
          </div>
        </div>
      </form>
      <div>
        <div>
          <Link
            className={`text-sm underline`}
            to="/signup"
          >Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
