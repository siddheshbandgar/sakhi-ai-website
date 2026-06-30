// A clean white tile showing the app's real logo (from /public/logos).
const logoFor = (name: string) => `/logos/${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

export default function AppChip({
  name,
  size = "md",
}: {
  name: string;
  tint?: string;
  size?: "sm" | "md";
  vivid?: boolean;
}) {
  const dim = size === "sm" ? "h-8 w-8 rounded-lg" : "h-11 w-11 rounded-xl";
  return (
    <span
      className={`grid shrink-0 place-items-center border border-line bg-white ${dim}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoFor(name)} alt="" className="h-[64%] w-[64%] object-contain" loading="lazy" />
    </span>
  );
}
