"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
    BUCKET_ID,
    DATABASE_ID,
    DOCTOR_COLLECTION_ID,
    ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    databases,
    storage,
    users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { uploadFile } from "./appointment.actions";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
    try {
        // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            user.password,
            user.name
        );

        return parseStringify(newuser);
    } catch (error: any) {
        // // Check existing user
        // if (error && error?.code === 409) {
        //   const existingUser = await users.list([
        //     Query.equal("email", [user.email]),
        //   ]);

        //   return existingUser.users[0];
        // }
        console.error("An error occurred while creating a new user:", error);
    }
};

// GET USER
export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the user details:",
            error
        );
    }
};

// REGISTER PATIENT
export const registerPatient = async ({
    identificationDocument,
    ...patient
}: RegisterUserParams) => {
    try {
        // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
        let file;
        if (identificationDocument) {
            const inputFile =
                identificationDocument &&
                InputFile.fromBlob(
                    identificationDocument?.get("blobFile") as Blob,
                    identificationDocument?.get("fileName") as string
                );

            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }

        // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentID: file?.$id ? file.$id : null,
                identificationDocumentURL: file?.$id
                    ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                    : null,
                ...patient,
            }
        );

        return parseStringify(newPatient);
    } catch (error) {
        console.error("An error occurred while creating a new patient:", error);
    }
};

// Register Doctor
export const registerDoctor = async ({
    identificationDocument,
    profilePicture,
    ...doctor
}: RegisterDoctorParams) => {
    try {
        const user = await createUser({
            name: doctor.name,
            email: doctor.authEmail,
            password: doctor.authPassword,
            phone: doctor.phone,
        });

        let DPfile;
        if (identificationDocument) {
            DPfile = await uploadFile(identificationDocument);
        }

        let file;
        if (profilePicture) {
            file = await uploadFile(profilePicture);
        }

        // Create new doctor document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
        const newDoctor = await databases.createDocument(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!,
            ID.unique(),
            {
                ...doctor,
                profilePictureID: file?.$id ? file.$id : null,
                profilePictureURL: file?.$id
                    ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                    : null,
                identificationDocumentID: DPfile?.$id ? DPfile.$id : null,
                identificationDocumentURL: DPfile?.$id
                    ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${DPfile.$id}/view??project=${PROJECT_ID}`
                    : null,
                doctorID: user.$id,
                experience: parseInt(doctor.experience),
            }
        );

        return parseStringify(newDoctor);
    } catch (error) {
        console.error("An error occurred while creating a new patient:", error);
    }
};

export const getDoctors = async () => {
    try {
        const doctors = await databases.listDocuments(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!
        );

        const enrichedDoctors = doctors.documents.map((x: any) => ({
            id: x.$id,
            name: x.name,
            image: x.profilePictureURL ?? "/assets/images/dr-green.png",
        }));

        return parseStringify(enrichedDoctors);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the doctors details",
            error
        );
    }
};

export const getPatients = async () => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.orderDesc("$createdAt")]
        );

        const enrichedPatients = patients.documents.map((x: any) => ({
            id: x.$id,
            name: x.name,
            image: x.profilePictureURL ?? "/assets/images/dr-green.png",
        }));

        return parseStringify(enrichedPatients);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the patients details",
            error
        );
    }
};

export const getRecentPatientsList = async () => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.orderDesc("$createdAt")]
        );

        return parseStringify(patients);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the patients list",
            error
        );
    }
};

export const deletePatient = async (patientId: string) => {
    try {
        await databases.deleteDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            patientId
        );
    } catch (error) {
        console.error("An error occurred while deleting the patient:", error);
    }
};

// GET PATIENT
export const getPatient = async (patientId: string) => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal("$id", [patientId])]
        );

        return parseStringify(patients.documents[0]);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the patient details:",
            error
        );
    }
};

export const getDoctor = async (doctorId: string) => {
    try {
        const doctors = await databases.listDocuments(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!,
            [Query.equal("doctorID", [doctorId])]
        );

        return parseStringify(doctors.documents[0]);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the doctor details:",
            error
        );
    }
};

export const updateDoctor = async (
    doctorId: string,
    doctor: UpdateDoctorParams
) => {
    try {
        let updateDoctorData: any = {};

        // Upload files
        if (doctor.profilePicture) {
            const file = await uploadFile(doctor.profilePicture);
            updateDoctorData["profilePictureID"] = file.$id;
            updateDoctorData["profilePictureURL"] =
                `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`;
        }

        if (doctor.identificationDocument) {
            const file = await uploadFile(doctor.identificationDocument);
            updateDoctorData["identificationDocumentID"] = file.$id;
            updateDoctorData["identificationDocumentURL"] =
                `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`;
        }

        // Set updated data
        updateDoctorData["name"] = doctor.name;
        updateDoctorData["email"] = doctor.email;
        updateDoctorData["phone"] = doctor.phone;
        updateDoctorData["birthDate"] = new Date(doctor.birthDate);
        updateDoctorData["gender"] = doctor.gender;
        updateDoctorData["address"] = doctor.address;
        updateDoctorData["languages"] = doctor.languages;
        updateDoctorData["licenceNumber"] = doctor.licenceNumber;
        updateDoctorData["specialization"] = doctor.specialization;
        updateDoctorData["qualifications"] = doctor.qualifications;
        updateDoctorData["experience"] = parseInt(doctor.experience);
        updateDoctorData["affiliations"] = doctor.affiliations;
        updateDoctorData["pastMedicalHistory"] = doctor.pastMedicalHistory;
        updateDoctorData["identificationType"] = doctor.identificationType;
        updateDoctorData["identificationNumber"] = doctor.identificationNumber;
        updateDoctorData["authPassword"] = doctor.authPassword;

        console.log(updateDoctorData);

        const doctors = await databases.updateDocument(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!,
            doctorId,
            updateDoctorData
        );

        return parseStringify(doctors);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the doctor details:",
            error
        );
    }
};
