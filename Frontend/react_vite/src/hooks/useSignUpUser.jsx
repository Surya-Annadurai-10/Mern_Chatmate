import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpUser } from "../lib/apiCalls";

export const useSignUpUser = () => {
  // console.log(api , "Api");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });

  return { mutate, isPending, error };
};
