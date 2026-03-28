import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Send } from 'lucide-react';

export function TransferForm() {
    const { balance, addTransaction } = useAppStore();

    // Zod configurado de forma simples e robusta, compatível com as versões mais recentes
    // Agora sim, limpo e apenas com as propriedades que a sua versão do Zod aceita
    const transferSchema = z.object({
        description: z.string().min(3, 'A descrição deve ter pelo menos 3 caracteres.'),
        amount: z.number({ message: 'Digite um valor válido.' })
            .positive('O valor deve ser maior que zero.')
            .max(balance, 'Saldo insuficiente para esta transferência.'),
    });

    type TransferFormInputs = z.infer<typeof transferSchema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TransferFormInputs>({
        resolver: zodResolver(transferSchema),
    });

    const onSubmit = async (data: TransferFormInputs) => {
        // Delay simulado de rede para manter a UX realista
        await new Promise((resolve) => setTimeout(resolve, 800));

        addTransaction({
            type: 'transfer_out',
            amount: data.amount,
            description: data.description,
        });

        // Limpa o formulário após a transferência ser concluída
        reset();
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

                        {/* Campo: Descrição */}
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
                            {errors.description && (
                                <p className="text-xs text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Campo: Valor */}
                        <div className="space-y-2">
                            <Label htmlFor="amount" className={errors.amount ? "text-red-500" : ""}>
                                Valor (R$)
                            </Label>
                            {/* O valueAsNumber converte automaticamente o input para número */}
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register('amount', { valueAsNumber: true })}
                                className={errors.amount ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.amount && (
                                <p className="text-xs text-red-500">{errors.amount.message}</p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4 transition-all duration-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processando...' : 'Transferir Agora'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}