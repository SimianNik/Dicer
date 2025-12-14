import { Die } from "../Dice/Die";
import type { DicePool } from "../../App/DicePool";
import styles from './DiceTray.module.css'

type Props = {
	pool: DicePool
}

export function DiceTray({ pool }: Props) {
	return (
		<>

			<div className={styles.tray}>
				{pool.dice.map(d => (
					<Die
						key={d.id}
						sides={d.sides}
						isRolling={d.isRolling}
						lastRoll={d.lastRoll}
						onClick={() => d.roll()}
						onRightClick={()=>pool.removeDie(d.id)}
					/>
				))}

			</div>
		</>
	);
}
