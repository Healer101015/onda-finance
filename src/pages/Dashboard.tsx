import { motion, Variants } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowDownRight, ArrowUpRight, DollarSign, Activity, ListChecks } from 'lucide-react';
import { TransferForm } from '../components/TransferForm';
import { AnimatedCounter } from '../components/animated/AnimatedCounter';

export function Dashboard() {
    const { user, balance, transactions } = useAppStore();

    const rawName = user?.email ? user.email.split('@')[0] : 'Usuário';
    const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(dateString));
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 120, damping: 14 },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-full space-y-6 md:space-y-8 antialiased relative z-10"
        >
            <div className="flex-none">
                <h2 className="text-3xl font-bold tracking-tight text-white">Painel de Controle</h2>
                <p className="text-base text-white/50 mt-1">
                    Bem-vindo de volta, <span className='font-semibold text-white'>{displayName}</span>. Acompanhe as suas finanças em tempo real.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 flex-none">

                {/* Card de Saldo adaptado pro Dark Mode */}
                <Card className="border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] bg-[#0d0d0d]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 md:p-8 rounded-[24px]">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="flex items-center gap-2 text-white/60 mb-1 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
                            <DollarSign className="w-4 h-4 text-[#22e56f]" />
                            <h3 className="text-xs font-semibold uppercase tracking-wider">Saldo Disponível</h3>
                        </div>

                        <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-none">
                            <AnimatedCounter value={balance} />
                        </div>

                        <p className="text-sm font-medium text-[#22e56f]/80 mt-3">
                            Conta Corrente Principal
                        </p>
                    </div>
                </Card>

                {/* Componente de Transferência */}
                <div className="h-full">
                    <TransferForm />
                </div>
            </div>

            {/* Card de Transações adaptado */}
            <Card className="border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden bg-[#0d0d0d]/95 backdrop-blur-xl flex flex-col rounded-[24px]">
                <CardHeader className="flex-none border-b border-white/5 bg-transparent pb-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#22e56f]" />
                            Últimas Transações
                        </CardTitle>
                    </div>
                </CardHeader>

                {/* SCROLL BONITO E LEVE - Adaptado para o fundo escuro */}
                <CardContent className="p-2 md:p-4 max-h-[380px] overflow-y-auto 
          [&::-webkit-scrollbar]:w-1.5 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-white/10 
          hover:[&::-webkit-scrollbar-thumb]:bg-white/20 
          [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">

                    {transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-full">
                                <ListChecks className="w-8 h-8 text-white/40" />
                            </div>
                            <div className='space-y-1'>
                                <p className='text-lg font-semibold text-white'>Nenhuma transação cadastrada</p>
                                <p className="text-sm text-white/40">Faça a sua primeira transferência para movimentar o seu histórico.</p>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            className="space-y-2 pr-2"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            {transactions.map((tx) => (
                                <motion.div
                                    key={tx.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.005, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                                    className="flex items-center justify-between p-4 rounded-[16px] border border-white/5 hover:border-white/10 transition-all duration-200 ease-out bg-white/[0.01]"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-3 rounded-full border ${tx.type === 'transfer_in'
                                            ? 'bg-[#22e56f]/10 text-[#22e56f] border-[#22e56f]/20'
                                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {tx.type === 'transfer_in' ? (
                                                <ArrowDownRight className="w-5 h-5" />
                                            ) : (
                                                <ArrowUpRight className="w-5 h-5" />
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-base font-semibold text-white leading-none">
                                                {tx.description}
                                            </p>
                                            <p className="text-sm font-medium text-white/40 tabular-nums">
                                                {formatDate(tx.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`text-lg font-bold tracking-tight ${tx.type === 'transfer_in' ? 'text-[#22e56f]' : 'text-white'
                                        } tabular-nums`}>
                                        {tx.type === 'transfer_in' ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}