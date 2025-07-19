import { z } from "zod";
import { base_url } from "./constants";

const schema = z.object({
  user_id: z.string().uuid("user id required"),
});

export async function FetchUserById(params: UserRequest): Promise<UserResponse> {
  const result = schema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/users/${params.user_id}`

  try {
    const resp = await fetch(url, {
      credentials: "include",
    });
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}
