"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {GENDERS, DOCTORS, IDENTIFICATIONS} from "@/refs";
import {formPatientSchema} from "@/lib/validation";
import {registerPatient} from "@/lib/actions/patient.actions";
import {Form} from "@/components/ui/form";
import {FormField, FormFieldType} from "@/components/FormField";
import {FormButton} from "@/components/ButtonSubmit";
import {FormLegend} from "@/components/FormLegend";
import {FieldsRow} from "@/components/FieldsRow";

export function FormRegister(props: {user: User}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formPatientSchema>>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      gender: "other" as Gender,
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "Birth Certificate",
      identificationNumber: "",
      identificationDocument: [],
      treatmentConsent: false,
      disclosureConsent: false,
      privacyConsent: false,
    },
    resolver: zodResolver(formPatientSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formPatientSchema>) => {
    setLoading(true);

    let formData;

    if (
      Array.isArray(values.identificationDocument) &&
      values.identificationDocument.length > 0
    ) {
      const [file] = values.identificationDocument;
      const blobFile = new Blob([file], {type: file.type});

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", file.name);
    }

    try {
      const patientData = {
        ...values,
        userId: props.user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      const patient = await registerPatient(patientData);

      if (patient) {
        router.push(`/patients/${props.user.$id}/appointment/create`);
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
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <FormLegend>Personal Information</FormLegend>
        <FormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <FieldsRow>
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
          />
        </FieldsRow>
        <FieldsRow>
          <FormField
            control={form.control}
            fieldType={FormFieldType.DATE}
            name="birthDate"
            label="Date of Birth"
            placeholder="example@mail.com"
          />
          <FormField
            control={form.control}
            fieldType={FormFieldType.RADIO}
            name="gender"
            label="Gender"
            options={GENDERS}
          />
        </FieldsRow>
        <FieldsRow>
          <FormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="14th Street, New York"
          />
          <FormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </FieldsRow>
        <FieldsRow>
          <FormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Guardian's name"
          />
          <FormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="emergencyContactNumber"
            label="Emergency contact phone"
            placeholder="+380934567890"
          />
        </FieldsRow>
        <FormLegend>Medical Information</FormLegend>
        <FormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Primary physician"
          placeholder="Select a physician"
          options={DOCTORS}
        />
        <FieldsRow>
          <FormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="Blue Cross Blue Shield"
          />
          <FormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ABC123456789"
          />
        </FieldsRow>
        <FieldsRow>
          <FormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Penicillin, Pollen"
          />
          <FormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current medication (if any)"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg"
          />
        </FieldsRow>
        <FieldsRow>
          <FormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family medical history"
            placeholder="Mother had brain cancer, Father had heart disease"
          />
          <FormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past medical history"
            placeholder="Appendectomy, Tonsillectomy"
          />
        </FieldsRow>
        <FormLegend>Identification and Verification</FormLegend>
        <FormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification type"
          placeholder="Select an identification type"
          options={IDENTIFICATIONS}
        />
        <FormField
          control={form.control}
          fieldType={FormFieldType.FILE}
          name="identificationDocument"
          label="Identification document"
          placeholder="Scanned copy of identification document"
        />
        <FormLegend>Consent and Privacy</FormLegend>
        <FormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="I consent to treatment"
        />
        <FormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />
        <FormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="I consent to privacy policy"
        />
        <FormButton
          loading={loading}
          disabled={loading}
        >
          Get Started
        </FormButton>
      </form>
    </Form>
  );
}
