/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
    email: string;
    password: string;
    name: string;
    phone: string;
}
declare interface User extends CreateUserParams {
    $id: string;
}

declare interface RegisterUserParams {
    email: string | undefined;
    name: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string | undefined;
    insurancePolicyNumber: string | undefined;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
}

declare interface UpdateUserParams {
    email: string | undefined;
    name: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string | undefined;
    insurancePolicyNumber: string | undefined;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument?: FormData;
    treatmentConsent: boolean;
    disclosureConsent: boolean;
    privacyConsent: boolean;
}

declare interface RegisterDoctorParams {
    profilePicture: FormData | undefined;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    languages: string | undefined;
    licenceNumber: string;
    specialization: string;
    qualifications: string;
    experience: string;
    affiliations: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    authEmail: string;
    authPassword: string;
}

declare interface UpdateDoctorParams {
    profilePicture?: FormData;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    languages: string | undefined;
    licenceNumber: string;
    specialization: string;
    qualifications: string;
    experience: string;
    affiliations: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument?: FormData;
    authPassword: string;
}

declare type CreateAppointmentParams = {
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
};

declare type UpdateAppointmentParams = {
    appointmentId: string;
    appointment: Appointment;
    type: string;
};

declare type DoctorDetail = {
    id: string;
    name: string;
    image: string;
};

declare type PatientListDetail = {
    id: string;
    name: string;
    image?: string;
    phone: string;
    gender: string;
};
