import { motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
    value: number;
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function AnimatedCounter({ value }: Props) {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        const controls = animate(displayValue, value, {
            duration: 1,
            ease: "easeOut",
            onUpdate(latest) {
                setDisplayValue(latest);
            }
        });

        return () => controls.stop();
    }, [value]);

    return (
        <motion.span className="cursor-text tabular-nums">
            {formatCurrency(displayValue)}
        </motion.span>
    );
}