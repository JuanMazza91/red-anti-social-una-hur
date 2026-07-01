import type { User } from "../types/Index";

type Props = {
  user?: User | null;
  size?: number;
};

export default function Avatar({ user, size = 40 }: Props) {
  const fallback = "/avatars/mono1.jpeg";

  const src = user?.avatar
    ? `/avatars/${user.avatar}`
    : fallback;

  return (
    <img
      src={src}
      alt={user?.nickname || "usuario"}
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #1A1A1A",
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = fallback;
      }}
    />
  );
}