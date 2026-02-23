import { EventEmitter } from "./EventEmitter";
import { Die } from "./Die";
import { RollHistory } from "./RollHistory";

export class DicePool extends EventEmitter {
    id: string;
    name: string;
    dice: Die[] = [];

    constructor(name: string) {
        super();
        this.name = name;
        this.id = crypto.randomUUID();
    }

    addDie(sides: number) {
        if (!Number.isInteger(sides) || sides <= 0) {
            throw new Error("Sides must be a positive integer");
        }
        
        const die = new Die(sides);

        die.on("rollStart", () => this.emit("updated", this));
        die.on("rollEnd", () => {
            this.emit("updated", this)
            if (this.dice.every(d => !d.isRolling)) {
                this.addHistoryRecord();
            }
        });

        this.dice.push(die);
        this.emit("updated", this);

        return die;
    }

    removeDie(id: string) {
        this.dice = this.dice.filter(d => d.id !== id);
        this.emit("updated", this);
    }

    removeAllDice() {
        this.dice = []
        this.emit("updated",this)
    }

    rollAll() {
        this.dice.forEach(d => d.roll());
    }

    addHistoryRecord() {
        if (this.dice.length > 0) {
            RollHistory.record(this.name,this.total,this.dice.map(d=>{
                return {id:d.id,roll:d.lastRoll,sides:d.sides}
            }))
        }
    }

    getTotal() {
        return this.dice.reduce((sum, d) => sum + d.lastRoll, 0);
    }

    get total() {
        return this.dice.reduce((sum, d) => sum + d.lastRoll, 0);
    }

    getqDice() {
        return this.dice.length
    }

    get qDice() {
        return this.getqDice()
    }
}
