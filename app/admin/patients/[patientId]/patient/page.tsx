import DoctorForm from "@/components/forms/DoctorForm";
import PatientForm from "@/components/forms/PatientForm";

const Appointment = async ({ params: { patientId } }: SearchParamProps) => {
    // const patient = await getPatient(patientId);

    return (
        <div className="flex h-screen max-h-screen w-full">
            <section className="remove-scrollbar container my-auto h-full overflow-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <PatientForm user={undefined} />
                </div>
            </section>
        </div>
    );
};

export default Appointment;
