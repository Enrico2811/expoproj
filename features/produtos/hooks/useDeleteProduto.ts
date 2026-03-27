import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

export function useDeleteProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/produtos/${id}`);
    },
    onSuccess: () => {
      // Invalida o cache para que a lista seja atualizada
      queryClient.invalidateQueries({ queryKey: ["produtos"] });

      Alert.alert("Sucesso", "Produto excluído com sucesso!");
      router.back(); // Volta para a lista ou tela anterior
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Erro ao excluir produto";
      Alert.alert("Erro", message);
    },
  });
}
