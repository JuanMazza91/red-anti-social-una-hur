export type User = {
  _id: string;
  email: string;
  nickname: string;
  password?: string;
  avatar?: string;
  seguidos?: User[];
  seguidores?: User[];
};

export type AuthContextType = {
  usuarioActual: User | null;
  login: (usuario: User) => void;
  logout: () => void;
  cargando: boolean;
};
