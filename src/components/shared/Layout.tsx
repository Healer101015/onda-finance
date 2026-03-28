import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { LogOut, LayoutGrid, DollarSign } from 'lucide-react';

export function Layout() {
    const navigate = useNavigate();
    const { logout } = useAppStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        // Fundo escuro padrão e cor do texto branca
        <div className="md:h-screen md:overflow-hidden min-h-screen bg-[#050505] text-white flex flex-col antialiased selection:bg-[#22e56f]/20 selection:text-white">

            {/* Navbar com glassmorphism escuro e borda sutil */}
            <nav className="w-full bg-[#070707]/80 backdrop-blur-md border-b border-white/10 p-4 sticky top-0 z-50 flex-none">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-full bg-[#22e56f]/10 border border-[#22e56f]/20">
                            <DollarSign className="w-6 h-6 text-[#22e56f]" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white">
                            Onda<span className='font-light text-white/75'>Finance</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link
                            to="/"
                            className="text-sm font-medium h-9 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <LayoutGrid className="w-4 h-4 text-[#22e56f]" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium h-9 px-4 py-2 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Sair</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 flex flex-col md:min-h-0 relative">
                {/* Glow verde sutil no fundo para combinar com o login */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#22e56f]/5 rounded-full blur-[120px] pointer-events-none" />

                <Outlet />
            </main>
        </div>
    );
}