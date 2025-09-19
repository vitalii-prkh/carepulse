import Link from "next/link";
import Image from "next/image";
import {DOCTORS} from "@/refs";
import {getAppointment} from "@/lib/actions/appointment.actions";
import {formatDateTime} from "@/lib/utils";
import {Button} from "@/components/ui/button";

type PageAppointmentSuccessProps = {
  params: Promise<{userId: string}>;
  searchParams: Promise<{appointmentId: string}>;
};

async function PageAppointmentSuccess(props: PageAppointmentSuccessProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const appointment = await getAppointment(searchParams.appointmentId);
  const doctor = DOCTORS.find(
    (doctor) => doctor.value === appointment.primaryPhysician,
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={180}
            width={300}
            alt="success"
            priority
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>
        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || ""}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.label || ""}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calndar"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button
          variant="outline"
          className="shad-primary-btn"
          asChild
        >
          <Link href={`/patients/${params.userId}/appointment/create`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright py-12">
          ©{new Date().getFullYear()} CarePulse
        </p>
      </div>
    </div>
  );
}

export default PageAppointmentSuccess;
