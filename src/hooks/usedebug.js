import { DebugContext } from "@/context/DebugContext";
import { useContext } from "react";

export default function useDebug() {
  return useContext(DebugContext);
}
