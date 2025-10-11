import React from "react";
import clsx from "clsx";
import {Appointment} from "@/types/appwrite.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FormAppointmentSchedule} from "@/components/forms/FormAppointmentSchedule";
import {FormAppointmentCancel} from "@/components/forms/FormAppointmentCancel";

type ModalAppointmentProps = {
  type: "schedule" | "cancel";
  userId: string;
  appointmentId: string;
  data: Appointment;
};

export function ModalAppointment(props: ModalAppointmentProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={clsx("capitalize", {
            "text-green-500": props.type === "schedule",
          })}
        >
          {props.type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {props.type} Appointment
          </DialogTitle>
          <DialogDescription>
            Please fill in the following details to {props.type} an appointment
          </DialogDescription>
        </DialogHeader>
        {props.type === "schedule" && (
          <FormAppointmentSchedule
            userId={props.userId}
            appointmentId={props.appointmentId}
            data={props.data}
            onSuccess={() => setOpen(false)}
          />
        )}
        {props.type === "cancel" && (
          <FormAppointmentCancel
            userId={props.userId}
            appointmentId={props.appointmentId}
            data={props.data}
            onSuccess={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
