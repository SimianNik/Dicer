import { EventEmitter } from "./EventEmitter";
import { DicePool } from "./DicePool";

export class PoolsManager extends EventEmitter {
    pools: DicePool[] = [];

    constructor() {
        super()
        //this.createPool("Dice")
    }

    createPool(name: string) {
        const pool = new DicePool(name);
        this.pools.push(pool);
        this.emit("updated", this.pools);
        return pool;
    }

    removePool(id: string) {
        this.pools = this.pools.filter(p => p.id !== id);
        this.emit("updated", this.pools);
    }

    getPool(id: string) {
        return this.pools.find(p => p.id === id);
    }

    load() {
        //TODO: Load from Source... Start with localstorage (Create abstraction layer). StorageAdapter interface, to that a LocalStorageAdapter that implements it and we pas it to this so it can fetch from ther o later from whereever
        this.createPool("A harcoded created pool that's suposed to be loaded :P")
    }
}

export const poolsManager = new PoolsManager();
