// hooks/useDicePool.ts
import { useEffect, useState } from "react";
import { DicePool } from "../../App/DicePool";

export function useDicePool(pool: DicePool) {
    const [state, setState] = useState({ dice: pool.dice, roll: pool.total, qDice: pool.qDice});

    useEffect(() => {
        const unsub = pool.on("updated", () => {
            setState({ dice: [...pool.dice], roll: pool.total, qDice: pool.qDice});
        });

        return () => unsub();
    }, [pool]);

    return state;
}
