import styles from "./Dice.module.css"

type Props = {
	sides: number
}

type CommonShape = 'd2' | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20'

export const Dice = ({ sides}: Props) => {

	const commonShapeMap: Record<number, CommonShape> = {
		2: 'd2',
		4: 'd4',
		6: 'd6',
		8: 'd8',
		10: 'd10',
		12: 'd12',
		20: 'd20',
	}

	const sidesClassAppend : string = commonShapeMap[sides] || ''

	return (
		// <div key={die.id} className={`die-figure ${shape}`}>
		// 	<span className="die-figure__caption">d{die.sides}</span>
		// </div>
		<div className={`die-figure ${sidesClassAppend}`}>
			<span className="die-figure__caption">d{sides}</span>
		</div>
	);
}