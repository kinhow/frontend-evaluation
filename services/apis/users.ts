import { UserResponse } from "types/user";
import request from "services/request";

export const fetchUser = async (query: string): Promise<UserResponse> => {
  const searchUrl = `https://fetest.mashx.click/api/users?query=${query}`;
  try {
    const response = await request(searchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response as UserResponse;
  } catch (error) {
    return Promise.reject(error);
  }
};
