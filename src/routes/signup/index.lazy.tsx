import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '../../ui/Input';
import FetchSignup from '../../api/signup';

export const Route = createLazyFileRoute('/signup/')({
  component: Signup,
})

function Signup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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

  function handleUsernameOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setUsername(val);
  }

  const mutation = useMutation({
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
          <Input
            id='username'
            value={username}
            type='text'
            label='Username (optional)'
            onChange={handleUsernameOnChange}
            required={false}
          />
        </div>
        <div>
          <button type="submit" className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
