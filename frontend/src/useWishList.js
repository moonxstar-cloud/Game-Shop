import { useQuery } from '@tanstack/react-query';
import {api} from "./service/api"
const useWishlist = () => {
    return useQuery({
      queryKey: ['wishlist'],
      queryFn: async () => {
        try {
          const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/api/wishlist`);
          return response.data;
        } catch (error) {
          if (error.response?.status === 401) {
            throw new Error('Please login to view your wishlist');
          }
          throw new Error(error.response?.data?.message || 'Failed to fetch wishlist');
        }
      },
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
export default useWishlist;