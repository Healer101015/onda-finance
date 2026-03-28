import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowDownRight, ArrowUpRight, DollarSign, Activity } from 'lucide-react';
import { TransferForm } from '../components/TransferForm';

export function Dashboard() {
    // A linha que estava faltando para puxar os dados do Zustand:
    const { balance, transactions } = useAppStore();

    // As funções que formatam os valores e datas para a tela:
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(dateString));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 ease-in-out">
            {/* Cabeçalho da Página */}
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Visão Geral</h2>
                <p className="text-sm text-slate-500">Acompanhe seu saldo e movimentações recentes.</p>
            </div>

            {/* Grid Superior: Saldo e Transferência */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Card de Saldo */}
                <Card className="shadow-sm border-slate-200 h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Saldo Disponível
                        </CardTitle>
                        <DollarSign className="w-4 h-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-slate-900 cursor-text mt-4">
                            {formatCurrency(balance)}
                        </div>
                    </CardContent>
                </Card>

                {/* Componente de Transferência */}
                <div className="h-full">
                    <TransferForm />
                </div>
            </div>

            {/* Lista de Transações */}
            <Card className="shadow-sm border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-slate-500" />
                            Últimas Transações
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    {transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500 cursor-default">
                            <p>Nenhuma transação encontrada.</p>
                            <p className="text-sm">Seu histórico aparecerá aqui.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {transactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all duration-200 ease-in-out cursor-default"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-full ${tx.type === 'transfer_in' ? 'bg-emerald-100' : 'bg-red-100'
                                            }`}>
                                            {tx.type === 'transfer_in' ? (
                                                <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                                            ) : (
                                                <ArrowUpRight className="w-4 h-4 text-red-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 leading-none">
                                                {tx.description}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                {formatDate(tx.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`font-semibold ${tx.type === 'transfer_in' ? 'text-emerald-600' : 'text-slate-900'
                                        }`}>
                                        {tx.type === 'transfer_in' ? '+' : '-'} {formatCurrency(tx.amount)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}