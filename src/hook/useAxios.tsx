import axios from "axios";
import { API_KEY, API_URL } from "./useEnv";

export const useAxios = () => axios.create({baseURL: API_URL, headers:{'X-Api-Key': API_KEY}})