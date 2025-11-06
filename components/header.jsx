import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
    return(
        <div>
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/">
            <Image
                src="/logo.jpg"
                alt="Logo"
                width={200}
                height={60}
                className="h-15 w-30 object-contain"
            />
            </Link>
        </nav>
        </header>
        <div className="h-16" /> {/* Spacer */}
    </div>

)  
};
export default Header;