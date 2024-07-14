
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Link from "next/link";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="max-h-screen overflow-auto remove-scrollbar w-full flex flex-col space-y-14 p-5">
      <main className="admin-main max-w-7xl mx-auto">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <div className="flex items-center justify-between mb-9 space-y-1 w-full">
          <h2 className="sub-header">Doctor' Information</h2>
          <Button variant="ghost">
            <Link href="/admin/doctors" className="text-dark-700">View All</Link>
          </Button>
        </div>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Total Doctors"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <div className="flex items-center justify-between mb-9 space-y-1 w-full">
          <h2 className="sub-header">Patients' Information</h2>
          <Button variant="ghost">
            <Link href="/admin/patients" className="text-dark-700">View All</Link>
          </Button>
        </div>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Total patients"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <div className="flex items-center justify-between mb-9 space-y-1 w-full">
          <h2 className="sub-header">Appointments' Information</h2>
          <Button variant="ghost">
            <Link href="/admin/appointments" className="text-dark-700">View All</Link>
          </Button>
        </div>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

      </main>
    </div>
  );
};

export default AdminPage;
