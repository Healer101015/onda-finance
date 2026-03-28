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
        // pagina refinada para celular. 
        // No computadof (md:) a tela tranca com efeito no app.
        <div className="md:h-screen md:overflow-hidden min-h-screen bg-muted/30 flex flex-col antialiased">
            <nav className="w-full bg-background/80 backdrop-blur-md border-b border-border p-4 sticky top-0 z-50 flex-none">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-7 h-7 bg-primary text-primary-foreground p-1.5 rounded-full" />
                        <h1 className="text-xl font-semibold tracking-tight text-foreground">
                            Onda<span className='font-light'>Finance</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Link
                            to="/"
                            className="text-sm font-medium h-9 px-4 py-2 rounded-md bg-accent text-accent-foreground flex items-center gap-2"
                        >
                            <LayoutGrid className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm h-9 px-4 py-2 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50 transition-all flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Sair</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* O main adapta-se: ocupa o resto da tela no PC e cresce no telemóvel */}
            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 flex flex-col md:min-h-0">
                <Outlet />
            </main>
        </div>
    );
}