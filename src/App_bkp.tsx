import { useEffect, useRef, useState } from 'react'
import { Die } from './Components/Dice/Die'
import { DisplayDie } from './Components/Dice/DisplayDie'
import { secureRandomInt } from './common/helpers'
import { CustomDisplayDie } from './Components/CustomDie/CustomDisplayDie'

type DieConfig = {
	id: number
	sides: number
	lastRoll: number
	isRolling: boolean
}

export default function App_bkp() {
	const [dice, setDice] = useState<DieConfig[]>([])
	const nextId = useRef(dice.length)
	const [showCustomInput, setShowCustomInput] = useState(false);
	const [customSides, setCustomSides] = useState("");
	const [goAnimatePopup, setGoAnimatePopup] = useState(false)
	const customInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Prevent triggering when typing in inputs
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
				return;
			}

			// SPACEBAR = roll all dice
			if (e.code === "Space") {
				e.preventDefault();  // prevents page scroll
				rollAll();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dice]);

	const openCustom = () => {
		setShowCustomInput(true);
		setTimeout(() => setGoAnimatePopup(true), 10); // allow DOM to mount first
		setTimeout(() => customInputRef.current?.focus())
	};

	const closeCustom = () => {
		setGoAnimatePopup(false);
		setTimeout(() => setShowCustomInput(false), 250); // wait for fade-out
	};

	const handleCustomInputKey = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			const value = Number(customSides);
			if (value >= 2) {
				addCustomDie(value);
				setCustomSides("");
			}
		}
	};

	const addDie = (sides: number) => {
		setDice((prevDice) => {
			nextId.current++
			return [...prevDice, { id: nextId.current, sides, lastRoll: 1, isRolling: false }]
		})
	}

	const deleteDice = (id?: number) => {
		if (id !== undefined) {
			setDice((prevDice) => {
				return prevDice.filter(p => p.id !== id)
			})
			return
		}

		setDice([])
	}

	const rollAll = () => {
		dice.forEach(d => { rollDie(d.id) })
	}

	function rollDie(id: number) {
		if (dice.find(d => d.id === id)?.isRolling) return
		setDice(prev =>
			prev.map(d =>
				d.id === id ? { ...d, isRolling: true } : d as DieConfig
			)
		);
	}

	function finishRoll(id: number) {
		setDice(prev =>
			prev.map(d =>
				d.id === id
					? { ...d, isRolling: false, lastRoll: secureRandomInt(d.sides) } as DieConfig
					: d
			)
		);
	}

	const addCustomDie = (sides: number) => {
		if (sides < 2) return; // optional validation
		addDie(sides);
	};

	return (
		<div className="app-shell">
			<header className="hero">
				<p className="eyebrow">Dice Roller</p>
				<h1>Craft your roll</h1>
			</header>

			<section className='panel mockups'>
				<p className="lede">
					Choose your dice.
				</p>
				<div className='dice-preview-row'>
					<DisplayDie sides={2} onClick={() => addDie(2)} />
					<DisplayDie sides={4} onClick={() => addDie(4)} />
					<DisplayDie sides={5} onClick={() => addDie(5)} />
					<DisplayDie sides={6} onClick={() => addDie(6)} />
					<DisplayDie sides={8} onClick={() => addDie(8)} />
					<DisplayDie sides={10} onClick={() => addDie(10)} />
					<DisplayDie sides={12} onClick={() => addDie(12)} />
					<DisplayDie sides={20} onClick={() => addDie(20)} />
					<DisplayDie onClick={() => {
						if (showCustomInput) {
							setCustomSides("");
							closeCustom()
							return
						}
						openCustom()
					}}
					/>
				</div>
			</section>

			<div className={`custom_die_poput_wrapper ${goAnimatePopup && 'open'}`}>
				{showCustomInput && (
					<div className={`custom-die-popup ${goAnimatePopup && 'open'}`}>
						<p>Number of sides:</p>
						<input
							type="number"
							min="2"
							value={customSides}
							name='custom_input_ammount'
							ref={customInputRef}
							onKeyDown={handleCustomInputKey}
							onChange={e => setCustomSides(e.target.value)}
						/>
						<button
							className='primary'
							onClick={() => {
								addCustomDie(Number(customSides));
								setCustomSides("");
							}}
						>
							Create
						</button>
						<button
							className='secondary'
							onClick={() => {
								setCustomSides("");
								closeCustom()
							}}
						>
							Cancel
						</button>
					</div>
				)}
			</div>


			<section className="panel">
				<div className="panel__top">
					<div className='roll_box_title'>
						<p className="lede">Dices to roll</p>
						<div className="roll_box_subtitle-row">
							<p className="subtitle">Click a die to roll individually<br />Right click a die to remove</p>
							<button className="secondary thin" onClick={() => deleteDice()}>Remove dice</button>
						</div>
					</div>
				</div>

				<div className="dice-preview-wrap">
					<div className="dice-roll-zone">
						{dice.map((die) => {
							return <Die
								sides={die.sides}
								key={die.id} isRolling={die.isRolling}
								onRollEnd={() => finishRoll(die.id)} roll={die.lastRoll || 1}
								onClick={() => rollDie(die.id)}
								onRightClick={() => deleteDice(die.id)}
							/>
						})}
					</div>
				</div>

				<div className='panel__actions m0'>
					<h5 className='results'>Minimum roll: {dice.length}</h5>
					<h5 className='results'>Maximum roll: {dice.reduce((sum, die) => sum + die.sides, 0)}</h5>
				</div>

				<div className="panel__actions bt">
					<button className="primary w100p mw75p" onClick={rollAll}>
						Roll Dice
					</button>
				</div>
				<div className="panel__total">
					<h1 className='results'>Roll: {dice.reduce((sum, die) => sum + die.lastRoll, 0)}</h1>
				</div>
			</section>

			<section className='panel'>
				<p className="lede">
					Roll history
				</p>
			</section>

		</div>
	)
}
