import { z } from "zod";

const schema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(1, "password required"),
  username: z.string().optional(),
});

export default async function FetchSignup(params: SignupRequest): Promise<UserResponse> {
  const result = schema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = "http://localhost:8000/users/signup"
  const payload: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }

  try {
    const resp = await fetch(url, payload);
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}

