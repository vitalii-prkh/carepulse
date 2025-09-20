import Image from "next/image";
import clsx from "clsx";

type CardStatProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export function CardStat(props: CardStatProps) {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": props.type === "appointments",
        "bg-pending": props.type === "pending",
        "bg-cancelled": props.type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={props.icon}
          alt={props.label}
          width={32}
          height={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{props.count}</h2>
      </div>
      <p className="text-14-regular">{props.label}</p>
    </div>
  );
}
