import { motion, Variants } from 'framer-motion';
import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
    BarChart2,
    Wallet,
    PieChart,
    Mail,
    Lock,
    Loader2,
    Eye,
    EyeOff,
    ArrowRight,
} from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Digite um e-mail válido.').min(1, 'Campo obrigatório.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const formItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: 'easeOut' },
    },
};

export function Login() {
    const navigate = useNavigate();
    const { login } = useAppStore();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        login({ name: 'João Henrique', email: data.email });
        navigate('/');
    };

    return (
        <div className="relative min-h-screen flex bg-[#050505] text-white antialiased selection:bg-[#22e56f]/20 selection:text-white overflow-hidden">

            {/* ============================================================== */}
            {/* 1. PALCO GLOBAL DE FUNDO           */}
            {/* ============================================================== */}
            <div className="absolute inset-0 z-0 flex pointer-events-none">

                {/* Texturas e Gradientes Base (Esquerda) */}
                <div className="hidden md:block flex-1 border-r border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(34,229,111,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,229,111,0.03),transparent_24%),linear-gradient(135deg,#050505_0%,#080808_40%,#0b0f0c_100%)] relative">
                    <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />
                </div>

                {/* Texturas e Gradientes Base (Direita) */}
                <div className="flex-1 bg-gradient-to-b from-[#070707] via-[#090909] to-[#050505] relative">
                    <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
                </div>

                {/* ORQUESTRA DE LUZES  */}
                <div className="absolute inset-0 overflow-visible">

                    {/* Bola 1: Nasce na esquerda e cruza a linha para a direita */}
                    <motion.div
                        animate={{
                            x: [0, 600, 200, 800, 0],
                            y: [0, 150, -100, 200, 0],
                            scale: [1, 1.3, 0.9, 1.2, 1],
                        }}
                        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#22e56f]/8 blur-[120px] mix-blend-screen"
                    />

                    {/* Bola 2: Nasce na direita e cruza a linha invadindo a esquerda */}
                    <motion.div
                        animate={{
                            x: [0, -700, -300, -800, 0],
                            y: [0, -200, 150, -50, 0],
                            scale: [1, 0.8, 1.4, 0.9, 1],
                        }}
                        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,229,111,0.08),transparent_60%)] blur-[100px] mix-blend-screen"
                    />

                    {/* Bola 3: Central, viaja entre os dois mundos bem suave */}
                    <motion.div
                        animate={{
                            x: [0, 400, -400, 200, 0],
                            y: [0, 300, -200, 100, 0],
                            scale: [1, 1.2, 0.8, 1.1, 1]
                        }}
                        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[30%] left-[30%] h-[700px] w-[700px] rounded-full bg-[#22e56f]/5 blur-[150px] mix-blend-screen"
                    />
                </div>
            </div>

            {/* ============================================================== */}
            {/* 2. CONTEÚDO DA ESQUERDA     */}
            {/* ============================================================== */}
            <div className="relative z-10 hidden md:flex flex-1 flex-col justify-center items-center px-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-2xl text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-3 py-2 text-sm text-black shadow-lg">
                        <span className="rounded-full bg-[#22e56f] px-2 py-0.5 text-xs font-semibold text-black">
                            New
                        </span>
                        <span>Contas virtuais globais em breve</span>
                        <ArrowRight className="h-4 w-4" />
                    </div>

                    <div className="mb-8 flex items-center justify-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
                            <svg
                                className="h-10 w-10 text-[#22e56f]"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 50C10 30 30 10 50 10V90C30 90 10 70 10 50Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                                <path d="M50 10C70 10 90 30 90 50C90 70 70 90 50 90V10Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                                <path d="M50 35V65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                            Onda<span className="font-light text-white/75">Finance</span>
                        </h1>
                    </div>

                    <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white lg:text-5xl">
                        Entre e movimente seu financeiro global com rapidez.
                    </h2>

                    <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/68 lg:text-lg">
                        Converta, pague e acompanhe operações internacionais em uma experiência
                        segura, moderna e intuitiva.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                            <BarChart2 className="h-4 w-4 text-[#22e56f]" />
                            <span className="text-sm font-medium text-white/85">Analytics</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                            <Wallet className="h-4 w-4 text-[#22e56f]" />
                            <span className="text-sm font-medium text-white/85">Controle</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                            <PieChart className="h-4 w-4 text-[#22e56f]" />
                            <span className="text-sm font-medium text-white/85">Insights</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ============================================================== */}
            {/* 3. CONTEÚDO DA DIREITA      */}
            {/* ============================================================== */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10 md:px-12">

                {/* Moldura suave atrás do card - Levemente animada para pulso local */}
                <motion.div
                    animate={{ scale: [1, 1.03, 0.98, 1], opacity: [1, 0.6, 0.9, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute h-[520px] w-[520px] rounded-full bg-white/[0.02] blur-[40px] pointer-events-none"
                />
                <div className="absolute h-[420px] w-[420px] rounded-[48px] border border-white/5 bg-white/[0.015] pointer-events-none" />

                {/* CARD DO FORMULÁRIO */}
                <div className="relative w-full max-w-[430px] rounded-[32px] border border-white/10 bg-[#0d0d0d]/95 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            Entrar na plataforma
                        </h2>
                        <p className="mt-2 text-sm text-white/45">
                            Acesse sua conta para continuar
                        </p>
                    </div>

                    {/* sociais */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <Button variant="outline" type="button" className="h-11 rounded-2xl border-white/10 bg-white text-black hover:bg-white/90">
                            <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" type="button" className="h-11 rounded-2xl border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]">
                            <svg className="mr-2 h-4 w-4 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </Button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase font-medium">
                            <span className="rounded-full border border-white/10 bg-[#101010] px-3 text-white/35">ou</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
                            <motion.div variants={formItemVariants} className="group mb-4 space-y-1.5">
                                <div className="relative">
                                    <Mail className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-white/30 group-focus-within:text-[#22e56f]'}`} />
                                    <Input id="email" type="email" placeholder="E-mail" {...register('email')} className={`h-12 rounded-2xl border pl-10 text-white placeholder:text-white/28 ${errors.email ? 'border-red-500/50 bg-red-500/5 focus-visible:ring-red-500/20' : 'border-white/10 bg-white/[0.03] focus-visible:border-[#22e56f] focus-visible:ring-[#22e56f]/20 hover:border-white/15'}`} />
                                </div>
                                {errors.email && <p className="mt-1 pl-1 text-xs font-medium text-red-400">{errors.email.message}</p>}
                            </motion.div>

                            <motion.div variants={formItemVariants} className="group space-y-1.5">
                                <div className="relative">
                                    <Lock className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-white/30 group-focus-within:text-[#22e56f]'}`} />
                                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Senha" {...register('password')} className={`h-12 rounded-2xl border pl-10 pr-10 text-white placeholder:text-white/28 ${errors.password ? 'border-red-500/50 bg-red-500/5 focus-visible:ring-red-500/20' : 'border-white/10 bg-white/[0.03] focus-visible:border-[#22e56f] focus-visible:ring-[#22e56f]/20 hover:border-white/15'}`} />
                                    <button type="button" onClick={() => setShowPassword((prev: boolean) => !prev)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-[#22e56f]">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 pl-1 text-xs font-medium text-red-400">{errors.password.message}</p>}
                            </motion.div>

                            <motion.div variants={formItemVariants} className="mt-4 mb-6 flex items-center justify-between gap-3">
                                <label htmlFor="remember" className="flex cursor-pointer items-center gap-2 text-sm text-white/55 transition-colors hover:text-white/75">
                                    <input type="checkbox" id="remember" defaultChecked className="h-4 w-4 cursor-pointer rounded border-white/20 bg-black accent-[#22e56f]" />
                                    <span>Lembrar de mim</span>
                                </label>
                                <button type="button" className="text-sm font-medium text-[#22e56f] transition-colors hover:text-[#53ef8b]">Esqueceu a senha?</button>
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-full bg-[#22e56f] text-base font-semibold text-black hover:bg-[#1ddb67] transition-all">
                                    {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Entrar na Onda'}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </form>

                    <div className="mt-8 px-4 text-center">
                        <p className="text-sm text-white/45">
                            João brito - Desenvolvedor Frontend | Projeto de Demonstração para Onda Finance{' '}
                            <a href="https://github.com/Healer101015/onda-finance" target="_blank" rel="noopener noreferrer" className="font-medium text-[#22e56f] underline decoration-[#22e56f]/30 underline-offset-4 transition-colors hover:text-[#53ef8b]">
                                GitHub
                            </a>
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-6 text-center w-full">
                    <p className="text-xs font-light tracking-wide text-white/25">
                        Este é um teste para Onda Finance.
                    </p>
                </div>
            </div>
        </div>
    );
}