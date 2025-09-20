"use client";

import React from "react";
import Image from "next/image";
import {useRouter, usePathname} from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {decryptKey, encryptKey} from "@/lib/utils";

export function ModalPasskey() {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const encryptedKey =
    typeof window !== "undefined" ? localStorage.getItem("accessKey") : null;

  React.useEffect(() => {
    const accessKey = encryptedKey ? decryptKey(encryptedKey) : null;

    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [path, encryptedKey, router]);

  const handleClose = () => {
    setOpen(false);
    router.push("/");
  };
  const handlePasskey = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
    if (value === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(value);

      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={handleClose}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin panel, please enter your passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            value={value}
            onChange={setValue}
            maxLength={6}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot
                index={0}
                className="shad-otp-slot"
              />
              <InputOTPSlot
                index={1}
                className="shad-otp-slot"
              />
              <InputOTPSlot
                index={2}
                className="shad-otp-slot"
              />
              <InputOTPSlot
                index={3}
                className="shad-otp-slot"
              />
              <InputOTPSlot
                index={4}
                className="shad-otp-slot"
              />
              <InputOTPSlot
                index={5}
                className="shad-otp-slot"
              />
            </InputOTPGroup>
          </InputOTP>
          {Boolean(error) && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handlePasskey}
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
