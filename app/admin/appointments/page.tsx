import Link from "next/link";

import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AppointmentsPage = async () => {
    const appointments = await getRecentAppointmentList();

    return (
        <div className="mx-auto flex h-screen w-full flex-col">
            <div className="flex h-14 w-full items-center justify-between border-b border-dark-500 px-4 lg:h-[60px] lg:px-6">
                <p className="flex items-center gap-2 text-lg font-semibold">
                    Appointments
                </p>
                <Link
                    href="/admin/appointments/new/appointment"
                    className="text-sm py-2 px-5 shad-primary-btn rounded-lg"
                >
                    NEW
                </Link>
            </div>
            <main className="p-5">
                <DataTable columns={columns} data={appointments?.documents} />
            </main>
            <footer className="w-full flex justify-center items-center">
                <p className="copyright mt-10 py-12 text-center">
                    © {new Date().getFullYear()} Laugh Logic Labs
                </p>
            </footer>
        </div>
    );
};

export default AppointmentsPage;
