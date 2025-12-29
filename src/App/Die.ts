import { EventEmitter } from "./EventEmitter";
import { secureRandomInt } from "../common/helpers";
import { AppEvents } from "./AppEvents";

export class Die extends EventEmitter {
    id: string;
    sides: number;
    lastRoll: number = 1;
    isRolling: boolean = false;
    rollAnimDuration: number;

    constructor(sides: number) {
        super();
        this.sides = sides;
        this.id = crypto.randomUUID();
        this.rollAnimDuration = 800
    }

    roll() {
        if (this.isRolling) return;

        this.isRolling = true;
        this.emit("rollStart", this);

        setTimeout(() => {
            this.lastRoll = secureRandomInt(this.sides);
            this.isRolling = false;

            this.emit("rollEnd", this);
            AppEvents.emit("dieRolled")
        }, this.rollAnimDuration);
    }
}
