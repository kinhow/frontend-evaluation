import { UserResponse } from "types/user";
import { fetchUser } from "services/apis/users";
import useSWR from "swr";

interface useFetchUserProps {
  query: string;
}

const useFetchUser = ({ query }: useFetchUserProps) => {
  const { data } = useSWR<UserResponse>([query], fetchUser);
  const userData = data?.data;

  return { userData };
};

export default useFetchUser;
