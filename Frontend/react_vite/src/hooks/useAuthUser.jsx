
import { getUser } from '../lib/apiCalls'
import { useQuery } from '@tanstack/react-query'

export const useAuthUser = () => {
    console.log( "Api --->");
    
    const authData = useQuery({
    queryKey  : ["auth"],
    queryFn : getUser,
    retry : false
  })
//   console.log({ authUser : authData} , "AUTHDATA from useAuthUser");
//   console.log(Object.entries(authData),"pROXY DATA");
  
 return {isLoading : authData.isLoading , authUser : authData?.data};
}

