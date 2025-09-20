import Image from "next/image";
import clsx from "clsx";
import {ICON_STATUS} from "@/refs";

export type BadgeStatusProps = {
  status: "scheduled" | "pending" | "cancelled";
};

export function BadgeStatus(props: BadgeStatusProps) {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": props.status === "scheduled",
        "bg-blue-600": props.status === "pending",
        "bg-red-600": props.status === "cancelled",
      })}
    >
      <Image
        src={ICON_STATUS[props.status]}
        alt={props.status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": props.status === "scheduled",
          "text-blue-500": props.status === "pending",
          "text-red-500": props.status === "cancelled",
        })}
      >
        {props.status}
      </p>
    </div>
  );
}
