"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  GenderOptions,
  IdentificationTypes
} from "@/constants";
import { DoctorFormValidation } from "@/lib/validation";

import { updateDoctor } from "@/lib/actions/patient.actions";
import { Doctor } from "@/types/appwrite.types";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { AvatarUploader } from "../AvatarUploader";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";

const EditDoctorForm = ({ doctor }: { doctor: Doctor }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      profilePicture: doctor?.profilePictureURL
        ? [doctor?.profilePictureURL]
        : [],
      name: doctor?.name || "",
      email: doctor?.email || "",
      phone: doctor?.phone || "",
      birthDate: doctor?.birthDate ? new Date(doctor?.birthDate) : new Date(Date.now()),
      gender: (doctor?.gender as Gender) ?? (GenderOptions[0] as Gender),
      address: doctor?.address || "",
      languages: doctor?.languages || "",
      licenceNumber: doctor?.licenceNumber || "",
      specialization: doctor?.specialization || "",
      qualifications: doctor?.qualifications || "",
      experience: doctor?.experience?.toString() || "",
      affiliations: doctor?.affiliations || "",
      pastMedicalHistory: doctor?.pastMedicalHistory || "",
      identificationType:
        doctor?.identificationType ?? IdentificationTypes[0],
      identificationNumber: doctor?.identificationNumber || "",
      identificationDocument: doctor?.identificationDocumentURL
        ? [doctor?.identificationDocumentURL]
        : [],
    },
  });

  const onUpdate = async (values: z.infer<typeof DoctorFormValidation>) => {
    setIsLoading(true);
    try {
      // Store file info in form data as
      let DPformData;
      if (
        values.profilePicture &&
        values.profilePicture?.length > 0 && typeof values.profilePicture[0] !== "string"
      ) {
        const blobFile = new Blob([values.profilePicture[0]], {
          type: typeof values.profilePicture[0] === "object" ? values.profilePicture[0].type : "",
        });

        DPformData = new FormData();
        DPformData.append("blobFile", blobFile);
        DPformData.append("fileName", typeof values.profilePicture[0] === "object" ? values.profilePicture[0].name : "")
      }

      // Store file info in form data as
      let formData;
      if (
        values.identificationDocument &&
        values.identificationDocument?.length > 0 && typeof values.identificationDocument[0] !== "string"
      ) {
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: typeof values.identificationDocument[0] === "object" ? values.identificationDocument[0].type : "",
        });

        formData = new FormData();
        formData.append("blobFile", blobFile);
        formData.append("fileName", typeof values.identificationDocument[0] === "object" ? values.identificationDocument[0].name : "");
      }

      const doctorData = {
        profilePicture: values.profilePicture
          ? DPformData
          : undefined,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        languages: values.languages,
        licenceNumber: values.licenceNumber,
        specialization: values.specialization,
        qualifications: values.qualifications,
        experience: values.experience,
        affiliations: values.affiliations,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData : undefined,
      }

      const newDoctor = await updateDoctor(doctor?.$id!, doctorData);

      if (newDoctor) {
        // router.push(`/doctors/${user.$id}/new-appointment`);
        router.push(`/admin/doctors`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const btnName = doctor ? "Update" : "Create";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onUpdate)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Doctor's Profile 🖥️</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          <section className="w-full">
            <div className="w-52 rounded-full self-center">
              <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="profilePicture"
                label="Profile Picture"
                renderSkeleton={(field) => (
                  <FormControl>
                    <AvatarUploader files={field.value} onChange={field.onChange} />
                  </FormControl>
                )}
              />
            </div>
          </section>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="languages"
              label="Languages"
              placeholder="Hindi, English, etc.."
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Professional Information</h2>
          </div>

          {/* LICENCE & SPECIALIZATION */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="licenceNumber"
              label="Medical Licence Number"
              placeholder="ABC123456"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="specialization"
              label="Specialization"
              placeholder="Cardiologist"
            />
          </div>

          {/* QUALIFICATIONS & EXPERIENCE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="qualifications"
              label="Qualifications"
              placeholder="Degrees, Certifications"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="experience"
              label="Years of Experience"
              placeholder="2"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="affiliations"
              label="Professional Affiliations"
              placeholder="Memberships in medical societies, boards"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <SubmitButton isLoading={isLoading}>Update Doctor</SubmitButton>
      </form>
      <footer className="w-full flex justify-center items-center">
        <p className="copyright mt-10 py-12 text-center">© {new Date().getFullYear()} Laugh Logic Labs</p>
      </footer>
    </Form>
  );
};

export default EditDoctorForm;
