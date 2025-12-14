// hooks/usePools.ts
import { useEffect, useState } from "react";
import { poolsManager } from "../../App/PoolManager";

export function usePools() {
    const [pools, setPools] = useState(poolsManager.pools);

    useEffect(() => {
        const unsub = poolsManager.on("updated", (list) => {
            setPools([...list]);
        });
        return () => unsub();
    }, []);

    return {
        pools,
        createPool: (name: string) => poolsManager.createPool(name),
        removePool: (id: string) => poolsManager.removePool(id)
    };
}
