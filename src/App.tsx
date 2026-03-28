import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota pública */}
                <Route path="/login" element={<Login />} />

                {/* Rotas protegidas (envelopadas pelo Layout com a Navbar) */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>

                {/* Fallback para qualquer rota não encontrada */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;