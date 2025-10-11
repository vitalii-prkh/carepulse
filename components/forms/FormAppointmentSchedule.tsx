"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {DOCTORS} from "@/refs";
import {formApptScheduleSchema} from "@/lib/validation";
import {updateAppointment} from "@/lib/actions/appointment.actions";
import {Appointment} from "@/types/appwrite.types";
import {Form} from "@/components/ui/form";
import {FormField, FormFieldType} from "@/components/FormField";
import {FieldsRow} from "@/components/FieldsRow";
import {FormButton} from "@/components/ButtonSubmit";

type FormAppointmentScheduleProps = {
  userId: string;
  appointmentId: string;
  data: Appointment;
  onSuccess: () => void;
};
type FormValues = z.infer<typeof formApptScheduleSchema>;

export function FormAppointmentSchedule(props: FormAppointmentScheduleProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      primaryPhysician: props.data.primaryPhysician || "",
      schedule: props.data.schedule || "",
      reason: props.data.reason || "",
      note: props.data.note || "",
    },
    resolver: zodResolver(formApptScheduleSchema),
  });
  const handleSubmit = async (values: FormValues) => {
    try {
      const appointmentData = {
        userId: props.userId,
        appointmentId: props.appointmentId,
        appointment: {
          primaryPhysician: values.primaryPhysician,
          schedule: values.schedule,
          reason: values.reason,
          note: values.note,
          cancellationReason: "",
          status: "scheduled" as Status,
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
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Doctor"
          placeholder="Select a doctor"
          options={DOCTORS}
        />
        <FormField
          control={form.control}
          fieldType={FormFieldType.DATE}
          name="schedule"
          label="Expected appointment date"
          showTimeSelect
          dateFormat="MM/dd/yyyy - h:m aa"
        />
        <FieldsRow>
          <FormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="reason"
            label="Reason for appointment"
            placeholder="Enter reason for appointment"
          />
          <FormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="note"
            label="Notes"
            placeholder="Enter notes"
          />
        </FieldsRow>
        <FormButton
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          className="shad-primary-btn w-full"
        >
          Schedule Appointment
        </FormButton>
      </form>
    </Form>
  );
}
