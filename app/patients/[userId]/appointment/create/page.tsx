import Image from "next/image";
import {getPatient} from "@/lib/actions/patient.actions";
import {FormAppointment} from "@/components/forms/FormAppointment";

async function PageAppointmentCreate(props: {
  params: Promise<{userId: string}>;
}) {
  const params = await props.params;
  const patient = await getPatient(params.userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <FormAppointment
            type="create"
            userId={params.userId}
            patientId={patient.$id}
          />
          <p className="copyright py-12">
            ©{new Date().getFullYear()} CarePulse
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        priority
      />
    </div>
  );
}

export default PageAppointmentCreate;
