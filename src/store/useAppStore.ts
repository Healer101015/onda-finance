import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipagens
export type Transaction = {
    id: string;
    type: 'transfer_in' | 'transfer_out';
    amount: number;
    date: string;
    description: string;
};

type User = {
    name: string;
    email: string;
};

type AppState = {
    user: User | null;
    balance: number;
    transactions: Transaction[];
    login: (user: User) => void;
    logout: () => void;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
};

// Criação da Store com Persistência
export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            user: null,
            balance: 0,
            transactions: [],

            // Simula o login e injeta um saldo inicial fictício para testes
            login: (user) => set({ user, balance: 5000 }),

            // Limpa tudo ao sair
            logout: () => set({ user: null, balance: 0, transactions: [] }),

            // Adiciona transação e atualiza o saldo dinamicamente
            addTransaction: (tx) =>
                set((state) => {
                    const newTx: Transaction = {
                        ...tx,
                        id: crypto.randomUUID(),
                        date: new Date().toISOString(),
                    };

                    const newBalance =
                        tx.type === 'transfer_out'
                            ? state.balance - tx.amount
                            : state.balance + tx.amount;

                    return {
                        balance: newBalance,
                        transactions: [newTx, ...state.transactions],
                    };
                }),
        }),
        {
            name: 'onda-finance-storage', // Nome da chave no localStorage
        }
    )
);