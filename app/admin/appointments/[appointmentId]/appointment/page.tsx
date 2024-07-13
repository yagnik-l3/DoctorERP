import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
    const patient = await getPatient(userId);

    return (
        <div className="flex h-screen max-h-screen w-full">
            <section className="remove-scrollbar container my-auto h-full overflow-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <AppointmentForm
                        type="create"
                    />
                </div>
            </section>
        </div>
    );
};

export default Appointment;
