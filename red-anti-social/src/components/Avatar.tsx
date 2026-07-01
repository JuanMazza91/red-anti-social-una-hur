import type { User } from "../types/Index";

type Props = {
  user: User;
  size?: number;
};

export default function Avatar({ user, size = 40 }: Props) {
  return (
    <img
      src={`/avatars/${user.avatar}`}
      alt={user.nickname}
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #1A1A1A",
      }}
    />
  );
}