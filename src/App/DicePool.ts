import { EventEmitter } from "./EventEmitter";
import { Die } from "./Die";

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
        const die = new Die(sides);

        die.on("rollStart", () => this.emit("updated", this));
        die.on("rollEnd", () => this.emit("updated", this));

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
