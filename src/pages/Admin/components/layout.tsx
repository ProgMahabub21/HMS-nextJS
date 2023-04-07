import React, { useState } from 'react';
import Link from 'next/link';

interface NavigationProps {
    toggleMenu: () => void;
    isMenuOpen: boolean;
}

const Navigation = ({ toggleMenu, isMenuOpen }: NavigationProps) => {
    return (
        <nav className="bg-gray-800 w-full h-16">
            <div className="container mx-auto h-full flex items-center justify-between">
                <Link href="/">
                    <p className="text-white font-bold text-lg">Next.js App</p>
                </Link>
                <button
                    className="text-white md:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-lg p-2"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? (
                        <svg viewBox="0 0 20 20" fill="none" className="h-6 w-6">
                            <path
                                d="M3 3h14M3 10h14M3 17h14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 20 20" fill="none" className="h-6 w-6">
                            <path
                                d="M4 6h12M4 10h12M4 14h12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <Navigation toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className="px-4 md:px-0">{children}</div>
        </>
    );
};

export default Layout;
