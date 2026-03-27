import api from "@/services/api"; // Importa a configuração global
import { Produto } from "@/types/produto";

export const getProdutos = async () => {
  const { data }: { data: Produto[] } = await api.get("/produtos");
  return data;
};

export const createPrododuto = async (productData: Produto) => {
  const { data }: { data: Produto } = await api.post("/produtos", productData);
  return data;
};
