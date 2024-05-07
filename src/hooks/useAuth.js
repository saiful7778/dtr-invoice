import authConfig from "@/lib/config/auth.config";
import { getServerSession } from "next-auth";

export default function useAuth() {
  return getServerSession(authConfig);
}
