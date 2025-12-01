
import React from 'react';
import { Star } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* UERJ Logo */}
                    <img src="/logo-uerj.png" alt="UERJ" className="h-12 w-auto mr-3" />
                    <Star className="w-6 h-6 text-purple-400 fill-current" />
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Astro UERJ
                    </span>
                </div>
                <div className="text-xs text-slate-400 hidden md:block">
                    Instalações em Ambiente de Computação
                </div>
            </div>
        </header>
    );
};

export default Header;
