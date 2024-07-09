import {
  BriefcaseMedical,
  Home,
  LineChart,
  NotebookPen,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex">
        <div className="hidden w-1/5 border-r md:block">
          <div className="flex h-screen flex-col gap-2">
            <div className="flex h-14 w-full items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image
                  src="/assets/icons/logo-full.svg"
                  height={32}
                  width={162}
                  alt="logo"
                  className="h-8 w-fit"
                />
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start gap-3 p-6 text-lg font-medium lg:px-4">
                <Link
                  href="/admin/doctors"
                  className=" flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                >
                  <BriefcaseMedical className="size-4" />
                  Doctors
                </Link>
                <Link
                  href="/admin/appointments"
                  className=" flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                >
                  <NotebookPen className="size-4" />
                  Appointments
                </Link>
              </nav>
            </div>
            <Button className="mb-3 w-[70%] self-center">Logout</Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
