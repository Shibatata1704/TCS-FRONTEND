import { useContext } from "react";
import { AvisoContext } from "../contexts/AvisoContext";

export default function useAviso() {
  return useContext(AvisoContext);
}