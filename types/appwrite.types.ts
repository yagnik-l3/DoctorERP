import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
    identificationDocumentURL: string | undefined;
    identificationDocumentID: string | undefined;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: Doctor;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    treatmentConsent: boolean;
    disclosureConsent: boolean;
    privacyConsent: boolean;
}

export interface Doctor extends Models.Document {
    profilePictureURL: string | undefined;
    profilePictureID: string | undefined;
    doctorID: string;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    languages: string;
    licenceNumber: string;
    specialization: string;
    qualifications: string;
    experience: string;
    affiliations: string;
    allergies: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocumentID: string | undefined;
    identificationDocumentURL: string | undefined;
    authEmail: string;
    authPassword: string;
}

export interface Appointment extends Models.Document {
    patient: Patient;
    schedule: Date;
    status: Status;
    primaryPhysician: Doctor;
    reason: string;
    note: string;
    userId: string;
    cancellationReason: string | null;
}
