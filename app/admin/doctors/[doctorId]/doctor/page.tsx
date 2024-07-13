import DoctorForm from "@/components/forms/DoctorForm";
import { getDoctor } from "@/lib/actions/patient.actions";

const NewDoctor = async ({ params: { doctorId } }: SearchParamProps) => {
    let doctor
    if(doctorId == "new") {
        doctor = undefined;
    } else {
        doctor = await getDoctor(doctorId);        
    }

    return (
        <div className="flex h-screen max-h-screen w-full">
            <section className="remove-scrollbar container my-auto h-full overflow-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <DoctorForm doctor={doctor} />
                </div>
            </section>
        </div>
    );
};

export default NewDoctor;
