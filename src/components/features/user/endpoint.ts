import { USERS_URL } from "@/constants";
import type { User } from "@/types";

/** User Detail */
const getUser = async ({ id }: { id: string }): Promise<User> => {
  const response = await fetch(`${USERS_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user detail");
  }

  try {
    const data: User = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

export { getUser };
