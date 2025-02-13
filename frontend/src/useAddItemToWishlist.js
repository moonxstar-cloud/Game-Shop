import { useMutation, useQueryClient } from '@tanstack/react-query';
import {api} from "./service/api"

const useAddItemToWishlist = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (game) => {
      // Transform the game object to match backend expectations
      const wishlistItem = {
        gameId: game.id.toString(), // Convert to string since your schema expects string
        gameName: game.name,
        gameImage: game.background_image
      };

      const response = await api.post(`${process.env.REACT_APP_BACKEND_URL}/api/wishlist/add`, wishlistItem);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch wishlist query after successful mutation
      queryClient.invalidateQueries(['wishlist']);
      
    },
    onError: (error) => {
        toast.error('Error adding game to wishlist!');
        console.error('Error adding item to wishlist:', error);
        if (error.response?.status === 401) {
          // Handle unauthorized error - maybe redirect to login
          console.log('User not authenticated');
        }
        throw error;
    }
  });

  return { mutate, isLoading, error };
};

export default useAddItemToWishlist;