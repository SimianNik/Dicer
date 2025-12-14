import { DisplayDie } from "../Dice/DisplayDie";
import styles from "./DiceShowcase.module.css";

type Props = {
	className?: string,
	onDieClick?: (sides:number) => void
};

export const DiceShowcase = ({ className, onDieClick }: Props) => {
	const diceTypes = [2, 4, 5, 6, 8, 10, 12, 20];

	return (
		<div className={`${styles.showcase} ${className}`}>
			{diceTypes.map(sides => (
				<DisplayDie
					key={sides}
					sides={sides}
					onClick={()=>onDieClick?.(sides)}
				/>
			))}
		</div>
	)
}
