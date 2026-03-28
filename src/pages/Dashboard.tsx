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
            className="flex flex-col h-full space-y-6 md:space-y-8 antialiased"
        >
            <div className="flex-none">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Painel de Controle</h2>
                <p className="text-base text-muted-foreground mt-1">
                    Bem-vindo de volta, <span className='font-semibold text-foreground'>{displayName}</span>. Acompanhe as suas finanças em tempo real.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 flex-none">

                {/* 👉 Card de Saldo: 100% Centralizado e em Bloco Coeso 👈 */}
                <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-300 h-full bg-card flex flex-col items-center justify-center p-6 md:p-8">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Saldo Disponível</h3>
                        </div>

                        <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-none">
                            <AnimatedCounter value={balance} />
                        </div>

                        <p className="text-sm font-medium text-muted-foreground mt-3">
                            Conta Corrente Principal
                        </p>
                    </div>
                </Card>

                {/* Componente de Transferência */}
                <div className="h-full">
                    <TransferForm />
                </div>
            </div>

            {/* Card de Transações */}
            <Card className="border-border shadow-sm overflow-hidden bg-card flex flex-col">
                <CardHeader className="flex-none border-b border-border/50 bg-card pb-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Últimas Transações
                        </CardTitle>
                    </div>
                </CardHeader>

                {/* 👉 O SCROLL BONITO E DE LEVE 👈 
            Adicionado max-h-[380px] para garantir que não empurra a página e um scrollbar ultra-fino (w-1.5) e arredondado. */}
                <CardContent className="p-2 md:p-4 max-h-[380px] overflow-y-auto 
          [&::-webkit-scrollbar]:w-1.5 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 
          hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 
          [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">

                    {transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                            <div className="bg-muted p-4 rounded-full">
                                <ListChecks className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div className='space-y-1'>
                                <p className='text-lg font-semibold text-foreground'>Nenhuma transação cadastrada</p>
                                <p className="text-sm text-muted-foreground">Faça a sua primeira transferência para movimentar o seu histórico.</p>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            className="space-y-2 pr-2" // pr-2 dá um pequeno espaço para a barra de scroll não colar no conteúdo
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            {transactions.map((tx) => (
                                <motion.div
                                    key={tx.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.005, backgroundColor: "var(--color-accent)", opacity: 0.9 }}
                                    className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:border-border transition-all duration-200 ease-out"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-3 rounded-full shadow-sm ${tx.type === 'transfer_in' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {tx.type === 'transfer_in' ? (
                                                <ArrowDownRight className="w-5 h-5" />
                                            ) : (
                                                <ArrowUpRight className="w-5 h-5" />
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-base font-semibold text-foreground leading-none">
                                                {tx.description}
                                            </p>
                                            <p className="text-sm font-medium text-muted-foreground tabular-nums">
                                                {formatDate(tx.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`text-lg font-bold tracking-tight ${tx.type === 'transfer_in' ? 'text-emerald-600' : 'text-foreground'
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