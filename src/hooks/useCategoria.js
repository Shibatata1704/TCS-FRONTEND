import { useContext } from "react";
import { CategoriaContext } from "../contexts/CategoriaContext";

export default function useCategoria() {
  return useContext(CategoriaContext);
}