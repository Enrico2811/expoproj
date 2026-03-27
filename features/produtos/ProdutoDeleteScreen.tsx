import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useDeleteProduto } from "@/features/produtos/hooks/useDeleteProduto";
import { useProduto } from "@/features/produtos/hooks/useProduto";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, Pressable, StyleSheet } from "react-native";

export default function Delete({ id }: { id: string | string[] }) {
  const router = useRouter();
  const produtoId = Array.isArray(id) ? id[0] : id;
  const { data: produto, isLoading } = useProduto(produtoId);
  const deleteMutation = useDeleteProduto();

  const handleExcluir = () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente excluir o produto ${produto?.nome || ""}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteMutation.mutate(produtoId),
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Deseja realmente excluir o produto abaixo?</ThemedText>
      
      <ThemedView style={styles.detalhes}>
        <ThemedText>ID: {produtoId}</ThemedText>
        <ThemedText>Nome: {produto?.nome}</ThemedText>
        <ThemedText>Preço: R$ {produto?.preco}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.botoes}>
        <Pressable 
          onPress={() => router.back()} 
          style={[styles.botao, styles.botaoVoltar]}
        >
          <ThemedText style={styles.textoBotao}>Cancelar</ThemedText>
        </Pressable>

        <Pressable 
          onPress={handleExcluir} 
          style={[styles.botao, styles.botaoExcluir]}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText style={styles.textoBotao}>Excluir</ThemedText>
          )}
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  detalhes: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    width: "100%",
  },
  botoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  botao: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },
  botaoVoltar: {
    backgroundColor: "#999",
  },
  botaoExcluir: {
    backgroundColor: "#FF3B30",
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
  },
});
