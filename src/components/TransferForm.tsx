import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion, Variants } from 'framer-motion';
import { api } from '../services/api';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Send, DollarSign } from 'lucide-react';

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

    const transferMutation = useMutation({
        mutationFn: async (data: TransferFormInputs) => {
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
        <Card className="h-full flex flex-col border-border shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Send className="w-5 h-5 text-muted-foreground" />
                    Nova Transferência
                </CardTitle>
                <CardDescription>Envie dinheiro para outra conta de forma imediata.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col h-full justify-between">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="space-y-4"
                    >
                        {/* Campo: Descrição */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                            <Label htmlFor="description" className={errors.description ? "text-destructive" : ""}>
                                Descrição
                            </Label>
                            <Input
                                id="description"
                                placeholder="Ex: Pix Padaria"
                                {...register('description')}
                                className={errors.description ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
                        </motion.div>

                        {/* Campo: Valor */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                            <Label htmlFor="amount" className={errors.amount ? "text-destructive" : ""}>Valor (R$)</Label>
                            <div className="relative">
                                <DollarSign className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register('amount', { valueAsNumber: true })}
                                    className={`pl-9 ${errors.amount ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
                        </motion.div>
                    </motion.div>

                    <Button
                        type="submit"
                        className="w-full mt-4 h-10 gap-2"
                        disabled={transferMutation.isPending}
                    >
                        <Send className="w-4 h-4" />
                        {transferMutation.isPending ? 'Processando...' : 'Transferir Agora'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}