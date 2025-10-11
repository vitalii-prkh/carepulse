"use client";

import React from "react";
import Image from "next/image";
import {ColumnDef} from "@tanstack/react-table";
import {DOCTORS} from "@/refs";
import {formatDateTime} from "@/lib/utils";
import {Appointment} from "@/types/appwrite.types";
import {BadgeStatus} from "@/components/BadgeStatus";
import {ModalAppointment} from "@/components/ModalAppointment";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell({row}) {
      return <p className="text-14-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell({row}) {
      return <p className="text-14-medium">{row.original.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell({row}) {
      return (
        <div className="min-w-[115px]">
          <BadgeStatus status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell({row}) {
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell({row}) {
      const doctor = DOCTORS.find(
        (doc) => doc.value === row.original.primaryPhysician,
      );

      return (
        <div className="flex items-center gap-3">
          {doctor && (
            <React.Fragment>
              <Image
                src={doctor.image}
                alt={doctor.label}
                width={100}
                height={100}
                className="size-8"
              />
              <p className="whitespace-nowrap">Dr. {doctor.label}</p>
            </React.Fragment>
          )}
          {!doctor && <p className="whitespace-nowrap">—</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header() {
      return <div className="pl-4">Actions</div>;
    },
    cell({row}) {
      return (
        <div className="flex gap-1">
          <ModalAppointment
            type="schedule"
            userId={row.original.userId}
            appointmentId={row.original.$id}
            data={row.original}
          />
          <ModalAppointment
            type="cancel"
            userId={row.original.userId}
            appointmentId={row.original.$id}
            data={row.original}
          />
        </div>
      );
    },
  },
];
