import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '../../ui/Input';
import FetchSignup from '../../api/signup';

export const Route = createLazyFileRoute('/signup/')({
  component: Signup,
})

function Signup() {
  const navigate = useNavigate({
    from: "/signup",
  });
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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

  function handleUsernameOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
    setUsername(val);
  }

  const mutation = useMutation({
    // TODO:
    mutationFn: FetchSignup,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries();
      console.log(data);
      navigate({
        to: `${data.next}`,
      });
    },
    onError: (err) => {
      console.log(`error: failed to sign up: ${err}`);
    },
  });

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    // @ts-ignore
    mutation.mutate({
      email: email,
      password: password,
      username: username,
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
          <Input
            Id='username'
            Value={username}
            Type='text'
            Label='Username (optional)'
            OnChange={handleUsernameOnChange}
            Required={false}
          />
        </div>
        <div>
          <button type="submit" className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
