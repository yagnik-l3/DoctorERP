"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { DEFAULT_IMG } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment, Doctor, Patient } from "@/types/appwrite.types";

import { deletePatient } from "@/lib/actions/patient.actions";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";
import { useRouter } from "next/router";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patient?.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const doctor = appointment.primaryPhysician
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.profilePictureURL! ?? DEFAULT_IMG}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];

export const patientsColumn: ColumnDef<Patient>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.name}</p>;
    },
  },
  {
    header: "Physician",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex items-center gap-3">
          <Image
            src={patient?.primaryPhysician?.profilePictureURL ?? DEFAULT_IMG}
            alt="doctor"
            width={100}
            height={100}
            className="size-8 rounded-full"
          />
          <p className="whitespace-nowrap">Dr. {patient?.primaryPhysician?.name}</p>
        </div>
      );
    },
  },
  {
    header: "Phone",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.phone}</p>;
    },
  },
  {
    header: "Gender",
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="">
          <p>
            {patient.gender}
          </p>
        </div>
      );
    },
  },

  {
    header: "Actions",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex gap-8 justify-center items-center">
          <Link href={`/admin/patients/${patient.$id}/patient`} className="hover:cursor-pointer">
            <Eye height={24} width={24} className="" />
          </Link>
          <div onClick={() => deletePatient(patient.$id)} className="hover:cursor-pointer">
            <Trash2 height={20} width={20} className="text-red-500" />
          </div>
        </div>
      );
    },
  },
];

export const doctorColumns: ColumnDef<Doctor>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = row.original;
      return <p className="text-14-medium ">{doctor?.name}</p>;
    },
  },
  {
    header: "Experience",
    cell: ({ row }) => {
      const doctor = row.original;
      return (
        <p className="text-14-medium ">{doctor?.experience}</p>
      );
    },
  },
  {
    header: "Specialization",
    cell: ({ row }) => {
      const doctor = row.original;
      return (
        <p className="text-14-medium ">{doctor?.specialization}</p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Actions",
    cell: ({ row }) => {
      const doctor = row.original;
      return (
        <Link href={`/admin/doctors/${doctor.doctorID}/doctor`} className="">
          <Eye height={24} width={24} />
        </Link>
      );
    },
  },
];

