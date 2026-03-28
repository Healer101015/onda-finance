import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { DollarSign, User, Lock, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Digite um e-mail válido.').min(1, 'Campo obrigatório.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function Login() {
    const navigate = useNavigate();
    const { login } = useAppStore();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        // Simula a latência da rede
        await new Promise((resolve) => setTimeout(resolve, 1000));

        login({ name: 'Healer', email: data.email });
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-muted/30 flex antialiased">
            {/* Coluna Esquerda: Split Screen Premium */}
            <div className="flex-1 bg-primary p-12 hidden md:flex flex-col justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                >
                    <DollarSign className="w-10 h-10 bg-primary-foreground text-primary p-2 rounded-2xl" />
                    <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">
                        Onda<span className='font-light'>Finance</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-5xl font-semibold tracking-tighter text-primary-foreground leading-tight">
                        Controle as suas finanças<br /> num <span className='font-light'>piscar de olhos.</span>
                    </h2>
                    <p className="text-primary-foreground/70 mt-4 text-lg max-w-lg font-light">
                        Um internet banking simples, moderno e totalmente focado no que importa: a sua saúde financeira.
                    </p>
                </motion.div>

                <p className="text-primary-foreground/50 text-xs">© 2026 Onda Finance Labs. Todos os direitos reservados.</p>
            </div>

            {/* Coluna Direita: Formulário de Login (Design Premium) */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="space-y-2 mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Acesse sua conta</h2>
                        <p className="text-sm text-muted-foreground">Bem-vindo de volta! Digite suas credenciais para continuar.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Campo: E-mail */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>E-mail</Label>
                            <div className="relative">
                                <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Seu e-mail cadastrado"
                                    {...register('email')}
                                    className={`pl-9 h-11 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                        </div>

                        {/* Campo: Senha */}
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>Senha</Label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    {...register('password')}
                                    className={`pl-9 h-11 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 text-base gap-2 mt-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processando...' : 'Entrar na Onda'}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
                        João brito - Desenvolvedor Frontend | Projeto de Demonstração para Onda Finance
                    </div>
                </motion.div>
            </div>
        </div>
    );
}