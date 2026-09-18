import { useContext } from "react";
import { GlobalErrorContext } from "../context/global-error/GlobalErrorContext.js";

export function useGlobalError() {
    return useContext(GlobalErrorContext);
}