import EditDoctorForm from '@/components/forms/EditDoctorForm'
import Header from '@/components/Header'
import { getCurrentDoctor } from '@/lib/actions/auth.actions'
import { getDoctor } from '@/lib/actions/patient.actions'

const DoctorProfile = async () => {
    const session = await getCurrentDoctor()
    console.log("doctor session", session);

    const doctor = await getDoctor("doctorId");

    return (
        <div className="flex h-screen max-h-screen w-full">
            <section className="remove-scrollbar container my-auto h-full overflow-auto">
                <Header title='' />
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <EditDoctorForm doctor={doctor} />
                </div>
            </section>
        </div>
    )
}

export default DoctorProfile