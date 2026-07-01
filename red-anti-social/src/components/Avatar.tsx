import type { User } from "../types/Index";

type Props = {
  user: User | string | undefined | null;
  size?: number;
};

export default function Avatar({ user, size = 40 }: Props) {
  let nombreImagen = "mono1.jpeg";
  let nicknameAlt = "avatar";

  if (user && typeof user === "object") {
    nombreImagen = user.avatar || "mono1.jpeg";
    nicknameAlt = user.nickname || "avatar";
  }

  return (
    <img
      src={`/avatars/${nombreImagen}`}
      alt={nicknameAlt}
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #1A1A1A",
        flexShrink: 0,
      }}
    />
  );
}
