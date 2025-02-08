import { useMutation, useQueryClient } from '@tanstack/react-query';

import {api} from "./service/api"

const useRemoveItemFromWishlist = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (gameId) => {
      const response = await api.delete(`/api/wishlist/remove/${gameId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']);
    },
  });

  return { mutate, isLoading, error };
};

export default useRemoveItemFromWishlist;