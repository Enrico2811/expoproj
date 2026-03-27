import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Produto } from "@/types/produto";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button, TextInput } from "react-native";
import * as yup from "yup";

// INSTALAR: npx expo install react-hook-form yup @hookform/resolvers

// 1. Definindo o esquema de validação
const schema = yup
  .object({
    nome: yup
      .string()
      .required("O nome é obrigatório")
      .matches(
        /^[A-Za-zÀ-ÿ\s]+$/,
        "O nome deve conter apenas letras e espaços",
      ),
    preco: yup
      .string()
      .transform((value) => value.replace(",", ".")) // Troca vírgula por ponto (formatos BR)
      .test(
        "is-number",
        "Preço inválido",
        (value) => !isNaN(parseFloat(value as string)),
      )
      .required("O preço é obrigatório"),
  })
  .required();

export default function ProdutoCreateScreen() {
  const {
    // Configurando o React Hook Form com o resolver do Yup
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Chamar função da API para inserir novo produto
  const onSubmit = (data: any) => {
    const produto: Produto = { id: "0", nome: data.nome, preco: data.preco };
  };

  return (
    <ThemedView>
      {/* 2. Campo Nome */}
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <TextInput onChangeText={onChange} value={value} placeholder="Nome" />
        )}
      />
      {errors.nome && (
        <ThemedText style={{ color: "red" }}>{errors.nome.message}</ThemedText>
      )}

      {/* 3. Campo Preço */}
      <Controller
        control={control}
        name="preco"
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value ? value.toString() : ""}
            placeholder="Preço"
            keyboardType="numeric"
          />
        )}
      />
      {errors.preco && (
        <ThemedText style={{ color: "red" }}>{errors.preco.message}</ThemedText>
      )}

      <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
    </ThemedView>
  );
}
