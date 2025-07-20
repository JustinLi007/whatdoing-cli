import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '../../ui/Input';
import FetchLogin from '../../api/login';
import { refreshInterval } from '../../utils/timer';
import Button from '../../ui/Button';

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("testuser4@testuser.com");
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
    onSuccess: () => {
      queryClient.invalidateQueries();
      const t = refreshInterval({ hours: 1 });
      localStorage.setItem("whatdoing-next-refresh", new Date(t).toString());
      navigate({
        to: "/library",
        reloadDocument: true,
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
    <div className="flex flex-col flex-nowrap h-full items-center justify-center pb-6 gap-1.5">
      <form
        className="flex flex-col flex-nowrap gap-2"
        onSubmit={handleFormSubmit}>
        <div>
          <Input
            id="email"
            value={email}
            type="email"
            label="Email"
            onChange={handleEmailOnChange}
            required={true}
          />
        </div>
        <div>
          <Input
            id="password"
            value={password}
            type="password"
            label="Password"
            onChange={handlePasswordOnChange}
            required={true}
          />
        </div>
        <div>
          <Button type="submit" text="Login" onClick={() => { return; }} />
        </div>
      </form>
      <div>
        <Link className="text-sm underline" to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
