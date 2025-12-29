import { useEffect, useState } from "react";
import { RollHistory } from "../../App/RollHistory";
import { AppEvents } from "../../App/AppEvents";

export function useRollHistory() {
	const [history, setHistory] = useState(RollHistory.formatRecords());

	useEffect(() => {
		const onHistoryAdded = () => {
			setHistory(RollHistory.formatRecords)
		}
		AppEvents.on("Roll-history-added", onHistoryAdded)

		return () => AppEvents.off("Roll-history-added", onHistoryAdded)
	}, [])

	return {
		history
	}
}