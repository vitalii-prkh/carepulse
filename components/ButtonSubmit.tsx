import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

type FormButtonProps = Omit<React.ComponentProps<typeof Button>, "type"> & {
  loading: boolean;
};

export function FormButton(props: FormButtonProps) {
  const {loading, children, ...rest} = props;

  return (
    <Button
      {...rest}
      type="submit"
      className={rest.className ?? "shad-primary-btn w-full"}
    >
      {loading && (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="spinner"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading ...
        </div>
      )}
      {!loading && children}
    </Button>
  );
}
