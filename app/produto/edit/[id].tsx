import ProdutoEditScreen from "@/features/produtos/ProdutoEditScreen";
import { useLocalSearchParams } from "expo-router";

export default function Edit() {
  const { id }: { id: string } = useLocalSearchParams();
  return <ProdutoEditScreen id={id} />;
}
