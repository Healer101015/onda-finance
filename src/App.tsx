import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/shared/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { useAppStore } from './store/useAppStore'; // Importamos a store para verificar o utilizador

// Inicializa o cliente do React Query
const queryClient = new QueryClient();

// 🛡️ GUARDA 1: Impede aceder ao Dashboard sem estar logado
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = useAppStore((state) => state.user);

    // Se não existir utilizador, manda-o de volta para o Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

// 🛡️ GUARDA 2: Impede aceder ao Login se já estiver logado
function PublicRoute({ children }: { children: React.ReactNode }) {
    const user = useAppStore((state) => state.user);

    // Se já estiver logado e tentar ir para o Login, manda para o Dashboard
    if (user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* Rota Pública (Blindada) */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    {/* Rota Privada (Blindada) */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/" element={<Dashboard />} />
                    </Route>

                    {/* Qualquer rota que não exista atira para a raiz (que vai passar pelo guarda de cima) */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;