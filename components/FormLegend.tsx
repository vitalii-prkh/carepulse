import React from "react";

export function FormLegend(props: React.PropsWithChildren) {
  return (
    <section className="space-y-6">
      <div className="mb-9 space-y-1">
        <h2 className="sub-header">{props.children}</h2>
      </div>
    </section>
  );
}
