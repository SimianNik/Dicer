import { RollerSection } from "./Components/RollerSection/RollerSecion"
import { usePools } from "./Components/Hooks/usePools";
import { useEffect, useRef, useState } from "react";
import { Table } from "./Components/DicePool/Table";
import { Icon } from "@iconify/react";
import animStyles from "./Components/Common/Anims.module.css"
import { useRollHistory } from "./Components/Hooks/useRollHistory";
import { RollHistory } from "./App/RollHistory";
import { Button } from "./Components/UI/Button/Button";

export default function App() {
	const { pools, createPool, removePool } = usePools();
	const [qPools, setQPools] = useState(2);
	const { history } = useRollHistory();
	const [historyOpen, setHistoryOpen] = useState(false);
	const init = useRef(false);

	useEffect(() => {
		if (pools.length < 1 && !init.current) {
			createPool("Dice Tray");
			init.current = true;
		}
	}, []);

	const addPool = () => {
		createPool(`Dice Tray${qPools > 1 ? ` ${qPools}` : ""}`)
		setQPools(qPools + 1)
	}

	const deletePool = (id: string) => {
		removePool(id)
	}

	return (
		<div className="app-shell">
			<header className="hero">
				<p className="eyebrow">Dice Roller</p>
				<h1 className="appSubtitle">Craft your roll</h1>
			</header>
			<div className="trayHolder">
				{pools.map(p => {
					return (
						<RollerSection key={p.id} title={p.name} canBeClosed={true} closeClicked={() => deletePool(p.id)} >
							<Table key={p.id} pool={p} />
						</RollerSection>
					);
				})}
			</div>
			<RollerSection>
				<h5 onClick={addPool} className={`cursor_default ${animStyles.anim_02e} ${animStyles.hover_up} addPool`}>Add Dice Tray <span className="addPoolIcon"><Icon icon="rivet-icons:plus-circle-solid" height="14" /></span></h5>
			</RollerSection>
			<hr className="mt_20p" />
			<RollerSection>
				<h5
					className={`cursor_default ${animStyles.anim_02e} ${animStyles.hover_up} addPool historyHeader ${historyOpen ? "open" : "closed"}`}
					onClick={() => setHistoryOpen(prev => !prev)}
					aria-expanded={historyOpen}
					role="button"
				>
					Roll History <span className="addPoolIcon historyToggleIcon"><Icon icon="si:expand-more-fill" height="14" /></span>
				</h5>
				
				<ul className={`historyContainer ${historyOpen ? "is-open" : "is-closed"}`}>
					{history.length > 0 ? (
						<>
							<li className="clearHistory">
								<Button
									type="button"
									size="sm"
									variant="danger"
									onClick={() => RollHistory.clearHistory()}
									aria-label="Clear roll history"
								>
									Clear History
								</Button>
							</li>
							{history.map((entry, idx) => (
								<li key={idx}>
									<h5 className="m4_px">{entry.date}: {entry.trayName}</h5>
									<h6 className="m4_px">{entry.dicesSummary}. Total Roll: {entry.totalRoll}</h6>
									<hr />
								</li>
							))}
						</>
					) : (
						<li>No rolls yet</li>
					)}
				</ul>
			</RollerSection>


		</div>
	)
}
