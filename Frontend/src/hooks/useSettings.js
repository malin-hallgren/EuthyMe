import { useContext } from "react";
import { SettingsContext } from "../context/settings/SettingsContext.js";

export const useSettings = () => useContext(SettingsContext);