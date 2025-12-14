import styles from "./Die.module.css"
import anims from "../Common/Anims.module.css"
import { commonShapeMap } from "../../common/types";

type Props = {
	sides:number,
	isRolling: boolean,
	lastRoll: number,
	onClick?: () => void;
	onRightClick?: () => void;
};



export const Die = ({ sides, isRolling, lastRoll, onClick, onRightClick }: Props) => {
	const shape = commonShapeMap[sides] || 'dx'
	const spinClass = Math.random() < 0.5 ? styles.spinR : styles.spinL;
	const bounceClass = Math.random() < 0.5 ? styles.bounce_right : styles.bounce_left;

	const handleClick = () => {
		onClick?.();
	};

	let handleRightClick = undefined

	if (onRightClick !== undefined) {
		handleRightClick = (e: React.MouseEvent) => {
			e.preventDefault();
			onRightClick?.();
		};
	}

	return (
		<div className={`${styles.wrapper} ${styles[shape]} ${isRolling && bounceClass}`}>
			<div
				className={`${styles['die-figure']} ${anims.anim_02e} ${anims.hover_up} ${styles[shape]} ${isRolling && spinClass}`}
				onClick={() => handleClick()}
				onContextMenu={handleRightClick}
			>
				<span className={styles.caption}>{!isRolling && lastRoll}</span>
			</div>
		</div>
	);
};

