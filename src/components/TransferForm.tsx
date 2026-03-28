import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion, Variants } from 'framer-motion';
import { api } from '../services/api';
import { useAppStore } from '../store/useAppStore';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Send, DollarSign, Loader2 } from 'lucide-react';

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
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 16, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.35 },
        },
    };

    return (
        <div className="h-full border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] bg-[#0d0d0d]/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-8 rounded-[24px]">

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02]">
                        <Send className="w-5 h-5 text-[#22e56f]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Nova Transferência
                    </h3>
                </div>
                <p className="text-sm text-white/50">
                    Envie dinheiro de forma rápida e segura.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between flex-1">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-5"
                >
                    {/* Descrição */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <Label className={`text-sm font-medium ${errors.description ? 'text-red-400' : 'text-white/70'}`}>
                            Descrição
                        </Label>
                        <Input
                            placeholder="Ex: Pix Padaria"
                            {...register('description')}
                            className={`h-12 rounded-2xl border text-white placeholder:text-white/30 transition-colors
                            ${errors.description
                                    ? 'border-red-500/50 bg-red-500/5 focus-visible:ring-red-500/20'
                                    : 'border-white/10 bg-white/[0.03] focus-visible:border-[#22e56f] focus-visible:ring-[#22e56f]/20 hover:border-white/15'
                                }`}
                        />
                        {errors.description && (
                            <p className="text-xs font-medium text-red-400 pl-1">
                                {errors.description.message}
                            </p>
                        )}
                    </motion.div>

                    {/* Valor */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <Label className={`text-sm font-medium ${errors.amount ? 'text-red-400' : 'text-white/70'}`}>
                            Valor (R$)
                        </Label>
                        <div className="relative">
                            <DollarSign className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.amount ? 'text-red-400' : 'text-white/40'}`} />
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register('amount', { valueAsNumber: true })}
                                className={`h-12 pl-11 rounded-2xl border text-white placeholder:text-white/30 transition-colors
                                ${errors.amount
                                        ? 'border-red-500/50 bg-red-500/5 focus-visible:ring-red-500/20'
                                        : 'border-white/10 bg-white/[0.03] focus-visible:border-[#22e56f] focus-visible:ring-[#22e56f]/20 hover:border-white/15'
                                    }`}
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-xs font-medium text-red-400 pl-1">
                                {errors.amount.message}
                            </p>
                        )}
                    </motion.div>
                </motion.div>

                {/* Botão */}
                <div className="mt-8">
                    <Button
                        type="submit"
                        disabled={transferMutation.isPending}
                        className="w-full h-12 rounded-full bg-[#22e56f] text-base font-semibold text-black hover:bg-[#1ddb67] transition-all"
                    >
                        {transferMutation.isPending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            'Transferir'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}