import { motion, Variants } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowDownRight, ArrowUpRight, DollarSign, Activity, ListChecks } from 'lucide-react';
import { TransferForm } from '../components/TransferForm';
import { AnimatedCounter } from '../components/animated/AnimatedCounter';

export function Dashboard() {
    const { user, balance, transactions } = useAppStore();

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
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Painel de Controle</h2>
                <p className="text-sm text-muted-foreground">Bem-vindo de volta, <span className='font-medium'>{user?.name}</span>! Acompanhe as suas finanças em tempo real.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Card: Saldo Atual (Design Premium) */}
                <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Saldo Atual
                        </CardTitle>
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground/60 leading-none">Total disponível para movimentação</p>
                        <div className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mt-4 leading-tight">
                            <AnimatedCounter value={balance} />
                        </div>
                        <p className="text-xs text-muted-foreground/50 mt-1">Sua conta Onda Finance</p>
                    </CardContent>
                </Card>

                {/* Componente de Transferência */}
                <div className="h-full">
                    <TransferForm />
                </div>
            </div>

            {/* Card: Últimas Transações (Cascading Animation Pro) */}
            <Card className="border-border shadow-sm overflow-hidden bg-card">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-card pb-4">
                    <div className="space-y-1">
                        <CardTitle className="text-lg text-foreground flex items-center gap-2">
                            <Activity className="w-5 h-5 text-muted-foreground" />
                            Últimas Transações
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className='p-1.5'>
                    {transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground gap-3">
                            <ListChecks className="w-10 h-10 bg-muted text-muted-foreground/60 p-2.5 rounded-full" />
                            <div className='space-y-1'>
                                <p className='font-medium text-foreground'>Nenhuma transação cadastrada</p>
                                <p className="text-sm">Faça sua primeira transferência para que seu histórico apareça aqui.</p>
                            </div>
                        </div>
                    ) : (
                        // Stagger Children Animation
                        <motion.div
                            className="space-y-1"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            {transactions.map((tx) => (
                                <motion.div
                                    key={tx.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.005 }}
                                    className="flex items-center justify-between p-3.5 rounded-xl border border-transparent hover:border-border hover:bg-accent/40 transition-all duration-150 ease-in-out cursor-default"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-full ${tx.type === 'transfer_in' ? 'bg-emerald-100/80 text-emerald-700' : 'bg-red-100/80 text-red-700'
                                            }`}>
                                            {tx.type === 'transfer_in' ? (
                                                <ArrowDownRight className="w-4 h-4" />
                                            ) : (
                                                <ArrowUpRight className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground leading-none">
                                                {tx.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                                                {formatDate(tx.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`font-semibold ${tx.type === 'transfer_in' ? 'text-emerald-600' : 'text-foreground'
                                        } tabular-nums`}>
                                        {/* tabular-nums para alinhamento perfeito dos números */}
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