import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowDownRight, ArrowUpRight, DollarSign, Activity } from 'lucide-react';
import { TransferForm } from '../components/TransferForm'; // <-- Adicione esta importação

export function Dashboard() {
    // ... (mantenha as funções formatCurrency e formatDate iguais)

    return (
        <div className="space-y-6 animate-in fade-in duration-500 ease-in-out">
            {/* ... (mantenha o cabeçalho igual) */}

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

                {/* Componente de Transferência que acabamos de criar */}
                <div className="h-full">
                    <TransferForm />
                </div>
            </div>

            {/* ... (mantenha a Lista de Transações igual) */}
        </div>
    );
}