"use client"
import { BriefcaseMedical, Contact, NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()

    const isActive = (path: string) => pathname.includes(path);

    return (
        <div className="">
            <div className="flex">
                <div className="w-1/5 border-r border-dark-500 md:block">
                    <div className="flex h-screen flex-col gap-2">
                        <div className="flex h-14 w-full items-center justify-between border-b border-dark-500 px-4 lg:h-[60px] lg:px-6">
                            <Link
                                href="/"
                                className="flex items-center text-lg font-semibold"
                            >
                                <Image
                                    src="/assets/icons/logo-full.svg"
                                    height={32}
                                    width={142}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start gap-3 text-lg font-medium lg:px-4">
                                <Link
                                    href="/admin/doctors"
                                    className={twJoin(" hover:bg-dark-500 flex items-center gap-3 rounded-lg px-3 py-2 transition-all", isActive("/admin/doctors") ? "bg-dark-500" : "")}
                                >
                                    <BriefcaseMedical className="size-4" />
                                    Doctors
                                </Link>
                                <Link
                                    href="/admin/patients"
                                    className={twJoin(" hover:bg-dark-500 flex items-center gap-3 rounded-lg px-3 py-2 transition-all", isActive("/admin/patients") ? "bg-dark-500" : "")}
                                >
                                    <Contact className="size-4" />
                                    Patients
                                </Link>
                                <Link
                                    href="/admin/appointments"
                                    className={twJoin(" hover:bg-dark-500 flex items-center gap-3 rounded-lg px-3 py-2 transition-all", isActive("/admin/appointments") ? "bg-dark-500" : "")}
                                >
                                    <NotebookPen className="size-4" />
                                    Appointments
                                </Link>
                            </nav>
                        </div>
                        <Button className="mb-3 w-[70%] self-center shad-primary-btn">
                            Logout
                        </Button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
