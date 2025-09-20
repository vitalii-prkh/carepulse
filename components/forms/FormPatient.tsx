"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {formPatientSchema} from "@/lib/validation";
import {createUser} from "@/lib/actions/patient.actions";
import {Form} from "@/components/ui/form";
import {FormField, FormFieldType} from "@/components/FormField";
import {FormButton} from "@/components/ButtonSubmit";

const formSchema = formPatientSchema.pick({
  name: true,
  email: true,
  phone: true,
});
type FormValues = z.infer<typeof formSchema>;

export function FormPatient() {
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(formSchema),
  });
  const handleSubmit = async (values: FormValues) => {
    try {
      const user = await createUser(values);

      if (user) {
        router.push(`/patients/${user.$id}/registration`);
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
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <FormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <FormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="example@mail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <FormField
          control={form.control}
          fieldType={FormFieldType.PHONE}
          name="phone"
          label="Phone"
          placeholder="+380934567890"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <FormButton
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Get Started
        </FormButton>
      </form>
    </Form>
  );
}
