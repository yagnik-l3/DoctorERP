import { DoctorFormValidation, PatientFormValidation } from "@/lib/validation";
import { Doctor, Patient } from "@/types/appwrite.types";
import { z } from "zod";

export const GenderOptions = ["Male", "Female", "Other"];

export const IdentificationTypes = [
    "Birth Certificate",
    "Voter ID Card",
    "Aadhar Card",
];

export const PatientFormDefaultValues = {
    name: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: GenderOptions[0] as Gender,
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
    identificationType: IdentificationTypes[0],
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
};

export const DoctorFormDefaultValues = {
    profilePicture: [],
    name: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: GenderOptions[0] as Gender,
    address: "",
    languages: "",
    licenceNumber: "",
    specialization: "",
    qualifications: "",
    experience: "",
    affiliations: "",
    pastMedicalHistory: "",
    identificationType: IdentificationTypes[0],
    identificationNumber: "",
    identificationDocument: [],
    authEmail: "",
    authPassword: "",
};

export const setDoctorDefaultValue = (
    DoctorFormDefaultValues: z.infer<typeof DoctorFormValidation>,
    doctor: Doctor | undefined
) => {
    if (doctor) {
        return {
            profilePicture: doctor.profilePictureURL
                ? [doctor.profilePictureURL]
                : [],
            name: doctor.name,
            email: doctor.email,
            phone: doctor.phone,
            birthDate: new Date(doctor.birthDate),
            gender: (doctor.gender as Gender) ?? (GenderOptions[0] as Gender),
            address: doctor.address,
            languages: doctor.languages,
            licenceNumber: doctor.licenceNumber,
            specialization: doctor.specialization,
            qualifications: doctor.qualifications,
            experience: doctor.experience.toString(),
            affiliations: doctor.affiliations,
            pastMedicalHistory: doctor.pastMedicalHistory,
            identificationType:
                doctor.identificationType ?? IdentificationTypes[0],
            identificationNumber: doctor.identificationNumber,
            identificationDocument: doctor.identificationDocumentURL
                ? [doctor.identificationDocumentURL]
                : [],
            authEmail: doctor.authEmail,
            authPassword: doctor.authPassword,
        };
    } else {
        return DoctorFormDefaultValues;
    }
};

export const setPatientDefaultValue = (
    PatientFormDefaultValues: z.infer<typeof PatientFormValidation>,
    patient: Patient | undefined
) => {
    if (patient) {
        return {
            name: patient.name,
            email: patient.email,
            phone: patient.phone,
            birthDate: new Date(patient.birthDate),
            gender: (patient.gender as Gender) ?? (GenderOptions[0] as Gender),
            address: patient.address,
            occupation: patient.occupation,
            emergencyContactName: patient.emergencyContactName,
            emergencyContactNumber: patient.emergencyContactNumber,
            primaryPhysician: patient.primaryPhysician.$id,
            insuranceProvider: patient.insuranceProvider,
            insurancePolicyNumber: patient.insurancePolicyNumber,
            pastMedicalHistory: patient.pastMedicalHistory,
            familyMedicalHistory: patient.familyMedicalHistory,
            identificationType:
                patient.identificationType ?? IdentificationTypes[0],
            identificationNumber: patient.identificationNumber ?? "",
            identificationDocument: patient.identificationDocumentURL
                ? [patient.identificationDocumentURL]
                : [],
            allergies: patient.allergies,
            currentMedication: patient.currentMedication,
            treatmentConsent: patient.treatmentConsent,
            disclosureConsent: patient.disclosureConsent,
            privacyConsent: patient.privacyConsent,
        };
    } else {
        return PatientFormDefaultValues;
    }
};

export const Doctors = [
    {
        image: "/assets/images/dr-green.png",
        name: "John Green",
    },
    {
        image: "/assets/images/dr-cameron.png",
        name: "Leila Cameron",
    },
    {
        image: "/assets/images/dr-livingston.png",
        name: "David Livingston",
    },
    {
        image: "/assets/images/dr-peter.png",
        name: "Evan Peter",
    },
    {
        image: "/assets/images/dr-powell.png",
        name: "Jane Powell",
    },
    {
        image: "/assets/images/dr-remirez.png",
        name: "Alex Ramirez",
    },
    {
        image: "/assets/images/dr-lee.png",
        name: "Jasmine Lee",
    },
    {
        image: "/assets/images/dr-cruz.png",
        name: "Alyana Cruz",
    },
    {
        image: "/assets/images/dr-sharma.png",
        name: "Hardik Sharma",
    },
];

export const StatusIcon = {
    scheduled: "/assets/icons/check.svg",
    pending: "/assets/icons/pending.svg",
    cancelled: "/assets/icons/cancelled.svg",
};

export const DEFAULT_IMG = "/assets/images/dr-remirez.png";
