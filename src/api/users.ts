import { z } from "zod";

const schema = z.object({
  userId: z.string().uuid("user id required"),
});

export async function fetchUserById(params: UserRequest): Promise<UserResponse> {
  const result = schema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `http://localhost:8000/users/${params.userId}`

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}
