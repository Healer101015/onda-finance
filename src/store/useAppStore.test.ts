import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './useAppStore';

describe('Fluxo de Transferência - Onda Finance', () => {
    // Limpa o estado da store antes de cada teste para garantir um ambiente zerado
    beforeEach(() => {
        useAppStore.setState({ user: null, balance: 0, transactions: [] });
    });

    it('deve realizar uma transferência com sucesso e atualizar o saldo e o histórico', () => {
        const store = useAppStore.getState();

        // 1. Simula o fluxo de Login (que injeta 5000 de saldo inicial)
        store.login({ name: 'Healer', email: 'healer@onda.com' });

        // Verifica se o login deu o saldo correto
        expect(useAppStore.getState().balance).toBe(5000);
        expect(useAppStore.getState().transactions.length).toBe(0);

        // 2. Simula o fluxo de envio do Formulário de Transferência
        useAppStore.getState().addTransaction({
            type: 'transfer_out',
            amount: 450.50,
            description: 'Controle Flydigi Direwolf',
        });

        // 3. Valida se o estado final está perfeitamente calculado
        const newState = useAppStore.getState();

        // O saldo deve ter diminuído corretamente (5000 - 450.50 = 4549.50)
        expect(newState.balance).toBe(4549.50);

        // O histórico deve conter 1 transação com os dados corretos
        expect(newState.transactions.length).toBe(1);
        expect(newState.transactions[0].amount).toBe(450.50);
        expect(newState.transactions[0].type).toBe('transfer_out');
        expect(newState.transactions[0].description).toBe('Controle Flydigi Direwolf');
    });
});