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

	return (
		<div className="app-shell">
			<header className="hero">
				<p className="eyebrow">Dice Roller</p>
				<h1 className="appSubtitle">Craft your roll</h1>
			</header>
			{pools.map(p => {
				return (
					<RollerSection key={p.id} title={p.name}>
						<Table key={p.id} pool={p}/>
					</RollerSection>
				);
			})}
			<RollerSection>
				<h5 className={`cursor_default ${animStyles.anim_02e} ${animStyles.hover_up}`} style={{marginBottom:"4px", marginTop:"0px", textAlign:"center"}}>Add Pool <Icon icon="rivet-icons:plus-circle-solid" width="16" height="16" /></h5>
			</RollerSection>

		</div>
	)
}