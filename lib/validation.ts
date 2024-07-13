import { z } from "zod";

export const SigninFormValidation = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export const UserFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().optional(),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    birthDate: z.coerce.date(),
    gender: z.enum(["Male", "Female", "Other"]),
    address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(500, "Address must be at most 500 characters"),
    occupation: z
        .string()
        .min(2, "Occupation must be at least 2 characters")
        .max(500, "Occupation must be at most 500 characters"),
    emergencyContactName: z
        .string()
        .min(2, "Contact name must be at least 2 characters")
        .max(50, "Contact name must be at most 50 characters"),
    emergencyContactNumber: z
        .string()
        .refine(
            (emergencyContactNumber) =>
                /^\+\d{10,15}$/.test(emergencyContactNumber),
            "Invalid phone number"
        ),
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    insuranceProvider: z.string().optional(),
    insurancePolicyNumber: z.string().optional(),
    allergies: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to treatment in order to proceed",
        }),
    disclosureConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to disclosure in order to proceed",
        }),
    privacyConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to privacy in order to proceed",
        }),
});

export const DoctorFormValidation = z.object({
    profilePicture: z.custom<File[] | string[]>().optional(),
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    birthDate: z.coerce.date(),
    gender: z.enum(["Male", "Female", "Other"]),
    address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(500, "Address must be at most 500 characters"),
    languages: z.string().optional(),
    licenceNumber: z.string().min(2, "Licence number is required"),
    specialization: z
        .string()
        .min(2, "Specialization must be at least 2 characters")
        .max(500, "Specialization must be at most 500 characters"),
    qualifications: z.string().min(2, "Qualifications is required"),
    experience: z.string().min(1, "Experience is required"),
    affiliations: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[] | string[]>().optional(),
    authEmail: z.string().email("Invalid email address"),
    authPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .refine(
            (password) =>
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(
                    password
                ),
            "Password should contain special character"
        ),
});

export const CreateAppointmentSchema = z.object({
    patient: z.string().min(2, "Select at least one patient"),
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    schedule: z.coerce.date(),
    reason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
    patient: z.string().min(2, "Select at least one patient"),
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
    patient: z.string().min(2, "Select at least one patient"),
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
    switch (type) {
        case "create":
            return CreateAppointmentSchema;
        case "cancel":
            return CancelAppointmentSchema;
        default:
            return ScheduleAppointmentSchema;
    }
}
