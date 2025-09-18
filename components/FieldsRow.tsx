import React from "react";

export function FieldsRow(props: React.PropsWithChildren) {
  return (
    <div className="flex flex-col gap-6 xl:flex-row">{props.children}</div>
  );
}
