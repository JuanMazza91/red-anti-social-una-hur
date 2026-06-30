import type { User } from "./User";

export type LoginData = {
  email: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};
