import PatientForm from "@/components/forms/PatientForm";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { patientId } }: SearchParamProps) => {
    const patient = await getPatient(patientId);

    return (
        <div className="flex h-screen max-h-screen w-full">
            <section className="remove-scrollbar container my-auto h-full overflow-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <PatientForm patient={patient} />
                </div>
            </section>
        </div>
    );
};

export default Appointment;
