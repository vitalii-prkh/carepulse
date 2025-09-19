"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {DOCTORS} from "@/refs";
import {formApptCreateSchema} from "@/lib/validation";
import {createAppointment} from "@/lib/actions/appointment.actions";
import {Form} from "@/components/ui/form";
import {FormField, FormFieldType} from "@/components/FormField";
import {FieldsRow} from "@/components/FieldsRow";
import {FormButton} from "@/components/ButtonSubmit";

type FormAppointmentProps = {
  type: "create" | "schedule";
  userId: string;
  patientId: string;
};

export function FormAppointmentCreate(props: FormAppointmentProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formApptCreateSchema>>({
    defaultValues: {
      primaryPhysician: "",
      schedule: "",
      reason: "",
      note: "",
    },
    resolver: zodResolver(formApptCreateSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formApptCreateSchema>) => {
    setLoading(true);

    try {
      const appointmentData = {
        userId: props.userId,
        patient: props.patientId,
        primaryPhysician: values.primaryPhysician,
        schedule: values.schedule,
        reason: values.reason,
        note: values.note,
        status: "pending" as Status,
      };

      const appointment = await createAppointment(appointmentData);

      if (appointment) {
        form.reset();
        router.push(
          `/patients/${props.userId}/appointment/success?appointmentId=${appointment.$id}`,
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex-1 space-y-6"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>
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
          loading={loading}
          disabled={loading}
          className="shad-primary-btn w-full"
        >
          {props.type === "schedule"
            ? "Schedule Appointment"
            : "Create Appointment"}
        </FormButton>
      </form>
    </Form>
  );
}
