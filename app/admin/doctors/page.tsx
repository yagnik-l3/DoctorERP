import { BriefcaseMedical, Home, NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  // const router = useRouter();
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex h-screen w-full flex-col">
      <div className="flex h-14 w-full items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
        <p className="flex items-center gap-2 text-lg font-semibold">
          Services
        </p>
        <Button className="">Add Service</Button>
      </div>
      <main className="flex h-full">
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
