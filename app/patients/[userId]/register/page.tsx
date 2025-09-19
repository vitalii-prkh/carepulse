import Image from "next/image";
import {FormRegister} from "@/components/forms/FormRegister";
import {getUser} from "@/lib/actions/patient.actions";

async function PageRegistration(props: {params: Promise<{userId: string}>}) {
  const params = await props.params;
  const user = await getUser(params.userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <FormRegister user={user} />
          <p className="copyright py-12">
            ©{new Date().getFullYear()} CarePulse
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
        priority
      />
    </div>
  );
}

export default PageRegistration;
