import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext.js";


export const useAuth = () => useContext(AuthContext);