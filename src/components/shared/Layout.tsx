import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

export function Layout() {
    const navigate = useNavigate();
    const { user, logout } = useAppStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col cursor-default">
            <nav className="w-full bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight cursor-text">
                        Onda Finance
                    </h1>
                    <div className="space-x-6 flex items-center">
                        <span className="text-sm text-slate-500 hidden sm:inline-block">
                            Olá, {user?.name || 'Utilizador'}
                        </span>
                        <Link
                            to="/"
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 ease-in-out cursor-pointer"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200 ease-in-out cursor-pointer"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8">
                <Outlet />
            </main>
        </div>
    );
}