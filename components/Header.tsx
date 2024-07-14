"use client";

import { logoutCurrentDoctor } from '@/lib/actions/auth.actions';
import { logout } from '@/redux/slices/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Button } from './ui/button';

const Header = ({ title }: { title: string }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const logoutUser = async () => {
        try {
            await logoutCurrentDoctor();
            dispatch(logout())
            router.push('/signin');
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <header className="w-full flex items-center justify-between p-3 sticky top-0 border-b border-b-dark-500 bg-dark-300">
            <Link href="/doctor" className="cursor-pointer">
                <Image
                    src="/assets/icons/logo-full.svg"
                    height={32}
                    width={162}
                    alt="logo"
                    className="h-8 w-fit"
                />
            </Link>

            <p className="text-16-semibold">{title}</p>

            <div className="flex items-center gap-1">
                <Button variant="ghost" className="">
                    <Link href="/doctor/profile">Profile</Link>
                </Button>
                <Button onClick={logoutUser} variant="ghost" className="">
                    Logout
                </Button>
            </div>
        </header>
    )
}

export default Header