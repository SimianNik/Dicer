import { RollerSection } from "./Components/RollerSection/RollerSecion"
import { usePools } from "./Components/Hooks/usePools";
import { useEffect, useRef } from "react";
import { Table } from "./Components/DicePool/Table";
import { Icon } from "@iconify/react";
import animStyles from "./Components/Common/Anims.module.css"

export default function App() {
	const { pools, createPool, removePool } = usePools();
	const init = useRef(false);

	useEffect(() => {
		if (pools.length < 1 && !init.current) {
			createPool("Dice Tray");
			init.current = true;
		}
	}, []);

	const addPool = () => {
		createPool("Dice Tray")
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

		</div>
	)
}