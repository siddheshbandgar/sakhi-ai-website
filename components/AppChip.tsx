// A quiet monogram tile standing in for each app's mark.
// Subtle by default (premium, calm); brand-tinted when `vivid`.
export default function AppChip({
  name,
  tint,
  size = "md",
  vivid = false,
}: {
  name: string;
  tint: string;
  size?: "sm" | "md";
  vivid?: boolean;
}) {
  const dim = size === "sm" ? "h-8 w-8 text-[12px] rounded-lg" : "h-11 w-11 text-sm rounded-xl";
  return (
    <span
      className={`grid place-items-center font-semibold ${dim}`}
      style={
        vivid
          ? {
              background: `linear-gradient(150deg, ${tint}, color-mix(in srgb, ${tint} 70%, #000))`,
              color: "#fff",
            }
          : {
              background: `color-mix(in srgb, ${tint} 12%, #fff)`,
              color: `color-mix(in srgb, ${tint} 78%, #000)`,
              boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${tint} 22%, transparent)`,
            }
      }
      aria-hidden="true"
    >
      {name.slice(0, 1)}
    </span>
  );
}
