'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const links = [
        { href: '/home', label: 'HOME', icon: '/home.png' },
        { href: '/timeline', label: 'TIMELINE', icon: '/time.png' },
        { href: '/stats', label: 'STATS', icon: '/status.png' },
    ];

    return (
        <nav className="bg-white border-b border-gray-100 px-6 py-1 flex items-center justify-between sticky top-0 z-50">

           
            <div className="flex items-center">
                <Link href="/" className="text-xl font-extrabold">
                    <Image src="/logo.png" alt="Logo" width={141} height={31} />
                </Link>
            </div>

           
            <ul className="flex items-center gap-6 bg-gray-50 p-2 ">

                {links.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium uppercase transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#1e3d33] text-white shadow-md scale-105 font-extrabold'
                                        : 'text-gray-600 hover:text-bg-[#1e3d33] hover:bg-green-50'
                                }`}
                            >
                                <Image src={link.icon} alt={link.label} width={15} height={15} />
                                {link.label}
                            </Link>
                        </li>
                    );
                })}

            </ul>

        </nav>
    );
};

export default Navbar;