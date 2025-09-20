"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {formApptCancelSchema} from "@/lib/validation";
import {updateAppointment} from "@/lib/actions/appointment.actions";
import {Appointment} from "@/types/appwrite.types";
import {Form} from "@/components/ui/form";
import {FormField, FormFieldType} from "@/components/FormField";
import {FormButton} from "@/components/ButtonSubmit";

type FormAppointmentCancelProps = {
  appointmentId: string;
  data: Appointment;
  onSuccess: () => void;
};
type FormValues = z.infer<typeof formApptCancelSchema>;

export function FormAppointmentCancel(props: FormAppointmentCancelProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      cancellationReason: "",
    },
    resolver: zodResolver(formApptCancelSchema),
  });
  const handleSubmit = async (values: FormValues) => {
    try {
      const appointmentData = {
        appointmentId: props.appointmentId,
        appointment: {
          primaryPhysician: "",
          schedule: "",
          reason: "",
          note: "",
          cancellationReason: values.cancellationReason,
          status: "cancelled" as Status,
        },
      };

      const appointment = await updateAppointment(appointmentData);

      if (appointment) {
        props.onSuccess();
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex-1 space-y-6"
      >
        <FormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="cancellationReason"
          label="Reason for cancellation"
          placeholder="Enter reason for cancellation"
        />
        <FormButton
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          className="shad-danger-btn w-full"
        >
          Cancel Appointment
        </FormButton>
      </form>
    </Form>
  );
}
