import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';

// Schema de validação com Zod
const loginSchema = z.object({
    email: z.string().email('Insira um e-mail válido.'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function Login() {
    const navigate = useNavigate();
    const { user, login } = useAppStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    // Se o usuário já estiver logado, joga direto pro Dashboard
    if (user) {
        return <Navigate to="/" replace />;
    }

    const onSubmit = async (data: LoginFormInputs) => {
        // Simula um delay de API de 1 segundo para vermos a animação do botão
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Extrai o nome do email (ex: healer@onda.com -> healer)
        const nameMock = data.email.split('@')[0];

        // Chama a action do Zustand
        login({ name: nameMock, email: data.email });

        // Redireciona para o Dashboard
        navigate('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                        Onda Finance
                    </CardTitle>
                    <CardDescription>
                        Insira suas credenciais mockadas para acessar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
                                E-mail
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="healer@exemplo.com"
                                {...register('email')}
                                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className={errors.password ? "text-red-500" : ""}>
                                Senha
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••"
                                {...register('password')}
                                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full transition-all duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Autenticando...' : 'Entrar na Conta'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}