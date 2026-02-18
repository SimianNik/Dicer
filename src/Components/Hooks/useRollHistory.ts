import { useEffect, useState } from "react";
import { RollHistory } from "../../App/RollHistory";
import { AppEvents } from "../../App/AppEvents";

export function useRollHistory() {
	const [history, setHistory] = useState(() => RollHistory.formatRecords());

	useEffect(() => {
		const onHistoryModed = () => {
			setHistory(RollHistory.formatRecords())
		}
		AppEvents.on("Roll-history-modded", onHistoryModed)

		return () => AppEvents.off("Roll-history-modded", onHistoryModed)
	}, [])

	return {
		history
	}
}