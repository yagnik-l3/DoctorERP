"use client";

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { logoutCurrentDoctor } from '@/lib/actions/auth.actions';

const Header = () => {
    const logout = async () => {
        await logoutCurrentDoctor()
    }

    return (
        <header className="w-full flex items-center justify-between p-3 sticky top-0 border-b border-b-dark-500">
            <Link href="/" className="cursor-pointer">
                <Image
                    src="/assets/icons/logo-full.svg"
                    height={32}
                    width={162}
                    alt="logo"
                    className="h-8 w-fit"
                />
            </Link>

            <p className="text-16-semibold">Doctor Dashboard</p>

            <div className="flex items-center gap-1">
                <Button variant="ghost" className="">
                    <Link href="/profile">Profile</Link>
                </Button>
                <Button onClick={logout} variant="ghost" className="">
                    Logout
                </Button>

            </div>
        </header>
    )
}

export default Header