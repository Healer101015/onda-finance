import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query'; // Import novo
import { api } from '../services/api'; // Import novo
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Send } from 'lucide-react';

export function TransferForm() {
    const { balance, addTransaction } = useAppStore();

    const transferSchema = z.object({
        description: z.string().min(3, 'A descrição deve ter pelo menos 3 caracteres.'),
        amount: z.number({ message: 'Digite um valor válido.' })
            .positive('O valor deve ser maior que zero.')
            .max(balance, 'Saldo insuficiente para esta transferência.'),
    });

    type TransferFormInputs = z.infer<typeof transferSchema>;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TransferFormInputs>({
        resolver: zodResolver(transferSchema),
    });

    // O React Query assume o controle da requisição
    const transferMutation = useMutation({
        mutationFn: async (data: TransferFormInputs) => {
            // Dispara o Axios (que sofrerá o delay do interceptor)
            // O catch previne o erro de URL inválida quebrar a tela mockada
            await api.post('/transfer', data).catch(() => { });
            return data;
        },
        onSuccess: (data) => {
            addTransaction({
                type: 'transfer_out',
                amount: data.amount,
                description: data.description,
            });
            reset();
        },
    });

    const onSubmit = (data: TransferFormInputs) => {
        transferMutation.mutate(data);
    };

    return (
        <Card className="shadow-sm border-slate-200 h-full flex flex-col">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                    <Send className="w-5 h-5 text-slate-500" />
                    Nova Transferência
                </CardTitle>
                <CardDescription>Envie dinheiro para outra conta.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col h-full justify-between">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="description" className={errors.description ? "text-red-500" : ""}>
                                Descrição (Ex: Pix Padaria)
                            </Label>
                            <Input
                                id="description"
                                placeholder="Para quem é a transferência?"
                                {...register('description')}
                                className={errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className={errors.amount ? "text-red-500" : ""}>Valor (R$)</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register('amount', { valueAsNumber: true })}
                                className={errors.amount ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4 transition-all duration-200"
                        disabled={transferMutation.isPending} // Controlado pelo React Query agora
                    >
                        {transferMutation.isPending ? 'Processando...' : 'Transferir Agora'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}