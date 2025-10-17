
import React, { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="text-xl font-bold tracking-tight">AttendChain</span>
    </div>
);


const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', page: Page.LANDING },
        { name: 'About', page: Page.LANDING }, // Placeholder
        { name: 'Contact', page: Page.LANDING }, // Placeholder
    ];

    const isLoggedIn = currentPage === Page.ADMIN_DASHBOARD || currentPage === Page.STUDENT_DASHBOARD;

    return (
        <header className="bg-white/5 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <button onClick={() => onNavigate(Page.LANDING)} className="cursor-pointer">
                        <Logo />
                    </button>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <button key={link.name} onClick={() => onNavigate(link.page)} className="text-gray-300 hover:text-white transition-colors duration-300">
                                {link.name}
                            </button>
                        ))}
                        {isLoggedIn && (
                             <button onClick={() => onNavigate(Page.LANDING)} className="bg-red-500/80 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                                Logout
                             </button>
                        )}
                    </nav>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-black/30">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {navLinks.map(link => (
                            <button key={link.name} onClick={() => { onNavigate(link.page); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">
                                {link.name}
                            </button>
                        ))}
                         {isLoggedIn && (
                             <button onClick={() => { onNavigate(Page.LANDING); setIsMenuOpen(false); }} className="block w-full text-left mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-red-500/80 hover:bg-red-500">
                                Logout
                             </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
