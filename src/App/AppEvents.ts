import { EventEmitter } from "./EventEmitter";

export class AppEvents {
    private static emitter = new EventEmitter();

    static on(event: string, fn: (...args: any[]) => void) {
        this.emitter.on(event, fn);
    }

    static off(event: string, fn: (...args: any[]) => void) {
        this.emitter.off(event, fn);
    }

    static emit(event: string, payload?: any) {
        this.emitter.emit(event, payload);
    }
}
