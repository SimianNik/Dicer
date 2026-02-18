import { AppEvents } from "./AppEvents";

type HistoryTray = {
	time: number
	trayName: string,
	totalRoll: number,
	historyDice: {
		id: string,
		sides: number,
		roll: number
	}[]
}

export class RollHistory {
	private static records: HistoryTray[] = RollHistory.getStoredRecords()

	static record(trayName: string, totalRoll: number, trayRecord: { id: string, sides: number, roll: number }[]) {
		RollHistory.records.push({
			time: Date.now(),
			trayName,
			totalRoll,
			historyDice: trayRecord.map(t => { return { id: t.id, sides: t.sides, roll: t.roll } })
		})

		RollHistory.saveRecords(RollHistory.records);

		// const stored = RollHistory.getStoredRecords();

		// stored.push(RollHistory.records[RollHistory.records.length - 1]);

		// RollHistory.saveRecords(stored);

		AppEvents.emit("Roll-history-modded", this)

	}

	static getStoredRecords(): HistoryTray[] {
		try {
			const raw = localStorage.getItem("dicer_roll_history");
			if (!raw) return [];

			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed)) return [];

			const out: HistoryTray[] = [];

			for (const item of parsed) {
				if (!item || typeof item !== "object") continue;
				const { time, trayName, totalRoll, historyDice } = item as any;

				if (typeof time !== "number" || !Number.isFinite(time)) continue;
				if (typeof trayName !== "string") continue;
				if (typeof totalRoll !== "number" || !Number.isFinite(totalRoll)) continue;
				if (!Array.isArray(historyDice)) continue;

				const hd: { id: string; sides: number; roll: number }[] = [];
				let valid = true;
				for (const d of historyDice) {
					if (!d || typeof d !== "object") { valid = false; break; }
					const { id, sides, roll } = d as any;
					if (typeof id !== "string") { valid = false; break; }
					if (typeof sides !== "number" || !Number.isFinite(sides)) { valid = false; break; }
					if (typeof roll !== "number" || !Number.isFinite(roll)) { valid = false; break; }
					hd.push({ id, sides, roll });
				}
				if (!valid) continue;

				out.push({ time, trayName, totalRoll, historyDice: hd });
			}

			return out;
		} catch {
			return [];
		}
	}

	static saveRecords(records: HistoryTray[]) {
		try {
			localStorage.setItem("dicer_roll_history", JSON.stringify(records));
		} catch (e) {
			console.log("Failed to save roll history", e);
		}
	}

	static formatRecords() {
		return RollHistory.records
			.slice()
			.sort((a, b) => b.time - a.time)
			.map(record => ({
				date: new Date(record.time).toLocaleString(),
				trayName: record.trayName,
				totalRoll: record.totalRoll,
				dicesSummary: record.historyDice.map(d => `d${d.sides}: ${d.roll}`).join(", ")
			}))
	}

	static clearHistory() {
		RollHistory.records = [];
		RollHistory.saveRecords(RollHistory.records);
		AppEvents.emit("Roll-history-modded", this)
	}
}