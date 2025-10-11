import Image from "next/image";
import Link from "next/link";
import {ModalPasskey} from "@/components/ModalPasskey";
import {FormPatient} from "@/components/forms/FormPatient";

async function PageHome(props: {searchParams: Promise<{admin: string}>}) {
  const searchParams = await props.searchParams;
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <ModalPasskey />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <FormPatient />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-end text-dark-600 xl:text-left">
              ©{new Date().getFullYear()} CarePulse
            </p>
            <Link
              href="/?admin=true"
              className="text-green-500"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
        priority
      />
    </div>
  );
}

export default PageHome;
