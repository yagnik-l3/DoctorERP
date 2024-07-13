"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import {
    createAppointment,
    updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { getDoctors, getPatients } from "@/lib/actions/patient.actions";

export const AppointmentForm = ({
    type = "create",
    appointment,
    setOpen,
}: {
    type: "create" | "schedule" | "cancel" | "complete";
    appointment?: Appointment;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [doctors, setDoctors] = useState<DoctorDetail[]>([])
    const [patients, setPatients] = useState<DoctorDetail[]>([])

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            patient: appointment ? appointment?.patient.$id : "",
            primaryPhysician: appointment ? appointment?.primaryPhysician.doctorID : "",
            schedule: appointment
                ? new Date(appointment?.schedule!)
                : new Date(Date.now()),
            reason: appointment ? appointment.reason : "",
            note: appointment?.note || "",
            cancellationReason: appointment?.cancellationReason || "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof AppointmentFormValidation>
    ) => {
        setIsLoading(true);

        let status;
        switch (type) {
            case "schedule":
                status = "scheduled";
                break;
            case "cancel":
                status = "cancelled";
                break;
            case "complete":
                status = "completed";
                break;
            default:
                status = "pending";
        }

        try {
            if (type === "create") {
                const appointment = {
                    patient: values.patient,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    status: status as Status,
                    note: values.note,
                };

                const newAppointment = await createAppointment(appointment);

                if (newAppointment) {
                    form.reset();
                    router.push(
                        `/admin/appointments/${newAppointment.$id}/appointment/success?appointmentId=${newAppointment.$id}`
                    );
                }
            } else {
                const appointmentToUpdate = {
                    appointmentId: appointment?.$id!,
                    appointment: {
                        primaryPhysician: values.primaryPhysician,
                        schedule: new Date(values.schedule),
                        status: status as Status,
                        cancellationReason: values.cancellationReason,
                    },
                    type,
                };

                const updatedAppointment =
                    await updateAppointment(appointmentToUpdate);

                if (updatedAppointment) {
                    setOpen && setOpen(false);
                    form.reset();
                }
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    let buttonLabel;
    switch (type) {
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            buttonLabel = "Submit Apppointment";
    }

    const fetchDoctors = async () => {
        const doctors = await getDoctors();
        const patients = await getPatients();
        setDoctors(doctors);
        setPatients(patients)
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 space-y-6"
            >
                {type === "create" && (
                    <section className="mb-12 space-y-4">
                        <h1 className="header">New Appointment</h1>
                        <p className="text-dark-700">
                            Request a new appointment in 10 seconds.
                        </p>
                    </section>
                )}

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="patient"
                            label="Patient"
                            placeholder="Select a patient"
                        >
                            {patients.map((patient, i) => (
                                <SelectItem
                                    key={patient.name + i}
                                    value={patient.id}
                                >
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={patient.image}
                                            width={32}
                                            height={32}
                                            alt="patient"
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{patient.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {doctors.map((doctor, i) => (
                                <SelectItem
                                    key={doctor.name + i}
                                    value={doctor.id}
                                >
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            width={32}
                                            height={32}
                                            alt="doctor"
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy  -  h:mm aa"
                        />

                        <div
                            className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
                        >
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Appointment reason"
                                placeholder="Annual montly check-up"
                                disabled={type === "schedule"}
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Comments/notes"
                                placeholder="Prefer afternoon appointments, if possible"
                                disabled={type === "schedule"}
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Urgent meeting came up"
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
                >
                    {buttonLabel}
                </SubmitButton>
            </form>
            <footer className="w-full flex justify-center items-center">
                <p className="copyright mt-10 py-12 text-center">
                    © {new Date().getFullYear()} Laugh Logic Labs
                </p>
            </footer>
        </Form>
    );
};
