import { AppEvents } from "./AppEvents";

type HistoryTray = {
	time: number
	trayName: string,
	totalRoll: number,
	historyDice : {
		id: string,
		sides : number,
		roll : number 
	}[]
}

export class RollHistory {
	private static records: HistoryTray[] = [] //TODO: get from storage

	static record(trayName: string, totalRoll: number, trayRecord:{id:string,sides:number,roll:number}[]) {
		RollHistory.records.push({
			time: Date.now(),
			trayName,
			totalRoll,
			historyDice: trayRecord.map(t=>{return {id:t.id,sides:t.sides,roll:t.roll}})
		})

		AppEvents.emit("Roll-history-added",this)
	}

	static formatRecords() {
		return RollHistory.records.map(record => ({
			date: new Date(record.time).toLocaleString(),
			trayName: record.trayName,
			totalRoll:record.totalRoll,
			dicesSummary: record.historyDice.map(d => `d${d.sides}: ${d.roll}`).join(", ")
		}));
	}

}