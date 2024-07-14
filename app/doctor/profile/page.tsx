import DoctorForm from '@/components/forms/DoctorForm'
import { getCurrentDoctor } from '@/lib/actions/auth.actions'
import { getDoctor } from '@/lib/actions/patient.actions'
import { account } from '@/lib/appwrite.config'
import React from 'react'

const DoctorProfile = async () => {
    const session = await getCurrentDoctor()
    console.log("session", session);

    const doctor = await getDoctor("doctorId");

    return (
        <div className="flex h-screen max-h-screen w-full">
            <section className="remove-scrollbar container my-auto h-full overflow-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <DoctorForm doctor={doctor} />
                </div>
            </section>
        </div>
    )
}

export default DoctorProfile