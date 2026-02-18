import type { DicePool } from "../../App/DicePool";
import { DiceShowcase } from "../DiceShowcase/DiceShowcase";
import { DiceTray } from "../DiceTray/DiceTray";
import { useDicePool } from "../Hooks/useDicePool";
import { Button } from "../UI/Button/Button";
import styles from './Table.module.css'

type Props = {
	pool: DicePool
}

export function Table({ pool }: Props) {
	const { qDice } = useDicePool(pool);

	const handleDisplayDieClick = (sides: number) => {
		pool.addDie(sides)
	}

	const handleRemoveDice = () => {
		pool.removeAllDice()
	}

	return (
		<>
			<p className={`${styles.subtitle}`}>Choose your dice</p>
			<DiceShowcase onDieClick={handleDisplayDieClick} key={pool.id} />
			<div className={`${styles.subtittle_row}`}>
				<p className={`${styles.subtitle} ${styles.mt_20}`}>Click a die to roll individually. Right click a die to remove</p>
				<Button variant="danger" size="sm" className={styles.delete_button} onClick={() => handleRemoveDice()}>
					Remove dice
				</Button>
			</div>
			<DiceTray pool={pool} />
			<div className={`${styles.roll_sumary}`}>
				<h5 className={`${styles.mt_0} ${styles.mb_5}`}>Minimum roll: {qDice}</h5>
				<h5 className={`${styles.mt_0} ${styles.mb_5}`}>Maximum roll: {pool.dice.reduce((sum, die) => sum + die.sides, 0)}</h5>
			</div>
			<div className={`${styles.roll_row}`}>
				<Button variant="primary" size="md" className={styles.main_button} onClick={()=>pool.rollAll()}>
					Roll Dice
				</Button>

				<h5 className={`${styles.mt_0} ${styles.mb_5} ${styles.roll_result}`}>Roll: {pool.total}</h5>
			</div>
		</>
	);
}
