import XPBadge from "@/components/XPBadge";

type Props = {
  xp: number;
  level: number;
};

export default function XPDisplay({ xp, level }: Props) {
  return <XPBadge energy={xp} level={level} />;
}
