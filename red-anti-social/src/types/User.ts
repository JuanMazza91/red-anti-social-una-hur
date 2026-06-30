export type User = {
  _id: string;
  email: string;
  nickname: string;
  password: string;
  seguidos: User[];
  seguidores: User[];
};
