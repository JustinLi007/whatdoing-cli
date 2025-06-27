import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '../../ui/Input';
import FetchLogin from '../../api/login';
import { refreshInterval } from '../../utils/timer';

export const Route = createLazyFileRoute('/login/')({
  component: Login,
})

function Login() {
  const navigate = useNavigate({
    from: "/login",
  });
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("sample@sample.com");
  const [password, setPassword] = useState("shit");

  function handleEmailOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
    setEmail(val);
  }

  function handlePasswordOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
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
    // @ts-ignore
    mutation.mutate({
      email: email,
      password: password,
    });
  }

  return (
    <div className={`flex flex-col flex-nowrap h-full items-center justify-center pb-6`}>
      <form onSubmit={handleFormSubmit}>
        <div>
          <Input
            Id='email'
            Value={email}
            Type='email'
            Label='Email'
            OnChange={handleEmailOnChange}
            Required={true}
          />
        </div>
        <div>
          <Input
            Id='password'
            Value={password}
            Type='password'
            Label='Password'
            OnChange={handlePasswordOnChange}
            Required={true}
          />
        </div>
        <div>
          <button type="submit" className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}>Login</button>
        </div>
      </form>
    </div>
  );
}
