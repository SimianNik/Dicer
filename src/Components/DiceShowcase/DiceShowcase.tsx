import { useEffect, useRef, useState } from "react";
import { DisplayDie } from "../Dice/DisplayDie";
import styles from "./DiceShowcase.module.css";
import { Button } from "../UI/Button/Button";

type Props = {
	className?: string,
	onDieClick?: (sides: number) => void
};

export const DiceShowcase = ({ className, onDieClick }: Props) => {
	const [customSides, setCustomSides] = useState(1)
	const [isDnOpened, setIsDnOpened] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const diceTypes = [2, 4, 5, 6, 8, 10, 12, 20, 0];

	const handleOnDieClick = (sides: number) => {
		if (!(diceTypes.includes(sides) && sides > 0)) {
			setIsDnOpened(!isDnOpened)
			return
		}

		onDieClick?.(sides)
	}

	useEffect(() => {
		if (isDnOpened) {
			inputRef.current?.focus()
		} else {
			setCustomSides(0) // reset to default value when closed
		}
	}, [isDnOpened])

	const handleConfirmSides = () => {
		if (customSides > 0) {
			onDieClick?.(customSides)
			setIsDnOpened(false)
		}
	}

	return (
		<>
			<div className={`${styles.showcase} ${className}`}>
				{diceTypes.map(sides => (
					<DisplayDie
						key={sides}
						sides={sides}
						onClick={() => handleOnDieClick(sides)}
					/>
				))}
			</div>
			{
				<div className={`${styles.custom_sides_holder} ${isDnOpened ? styles.open : styles.close}`}>
					Sides:
					<input
						ref={inputRef}
						type="number"
						min="1"
						value={customSides < 1 ? "" : customSides}
						onChange={e => setCustomSides(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)}
						name="custom_input_ammount"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault()
								handleConfirmSides()
							}
						}}
					/>
					<Button variant="primary" size="sm" className={styles.btn} onClick={() => customSides > 0 && handleConfirmSides()}>Create</Button>
					<Button variant="danger" size="sm" className={styles.btn} onClick={() => setIsDnOpened(false)}>Cancel</Button>
				</div>
			}

		</>
	)
}
