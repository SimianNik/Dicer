export class EventEmitter {
	private listeners: { [key: string]: ((...args: any[]) => void)[] } = {};

	on(event: string, fn: (...args: any[]) => void) {
		if (!this.listeners[event]) this.listeners[event] = [];
		this.listeners[event].push(fn);

		return () => this.off(event, fn);
	}

	off(event: string, fn: (...args: any[]) => void) {
		if (!this.listeners[event]) return;
		this.listeners[event] = this.listeners[event].filter(l => l !== fn);
	}

	emit(event: string, ...args: any[]) {
		if (!this.listeners[event]) return;
		this.listeners[event].forEach(fn => fn(...args));
	}
}
