import Link from "next/link";
import Image from "next/image";
import {getRecentAppointmentsList} from "@/lib/actions/appointment.actions";
import {DataTable} from "@/components/table/DataTable";
import {columns} from "@/components/table/columns";
import {CardStat} from "@/components/CardStat";

async function PageAdmin() {
  const data = await getRecentAppointmentsList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link
          href="/"
          className="cursor-pointer"
        >
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={32}
            height={162}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <CardStat
            type="appointments"
            count={data.scheduled}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <CardStat
            type="pending"
            count={data.pending}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <CardStat
            type="cancelled"
            count={data.cancelled}
            label="Calncelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable
          columns={columns}
          data={data.rows}
        />
      </main>
    </div>
  );
}

export default PageAdmin;
