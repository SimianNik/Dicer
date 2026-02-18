import { useState } from "react";
import styles from './Die.module.css'
import { commonShapeMap } from "../../common/types";
import anims from '../Common/Anims.module.css'

type Props = {
	sides?: number | undefined;
	onClick?: () => void;
}

export const DisplayDie = ({ sides, onClick }: Props) => {
	const [isSelected, setIsSelected] = useState(false)

	const shape = commonShapeMap[sides || 0] || 'dx'

	const handleDieClick = () => {
		onClick?.()
		if (isSelected) return
		setIsSelected(true)
		setTimeout(() => setIsSelected(false), 200)
	}

	return (
		<>
			<div className={`${styles.wrapper} ${styles[shape]}`}>
				<div
					className={`
					${styles['die-figure']} 
					${styles[shape]} 
					${anims.anim_02e}
					${anims.hover_up} 
					${isSelected && styles['click-grow']}
					${styles.small}
					`}

					onClick={handleDieClick}
				>
					<span className={styles.caption}>d{sides || "n"}</span>
				</div>
			</div>
		</>

	)

}