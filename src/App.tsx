import { useMemo, useRef, useState } from 'react'

type DieConfig = {
  id: number
  sides: number
  lastRoll: number | null
}

type CommonShape = 'd2' | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20'

const MIN_DICE = 1
const MAX_DICE = 20
const MIN_SIDES = 2
const DEFAULT_SIDES = 6

const createDice = (count: number, startId: number): DieConfig[] =>
  Array.from({ length: count }, (_, index) => ({
    id: startId + index,
    sides: DEFAULT_SIDES,
    lastRoll: null,
  }))

export default function App() {
  const [dice, setDice] = useState<DieConfig[]>(() => createDice(3, 1))
  const nextId = useRef(dice.length + 1)

  const dieCount = dice.length
  const commonShapeMap: Record<number, CommonShape> = {
    2: 'd2',
    4: 'd4',
    6: 'd6',
    8: 'd8',
    10: 'd10',
    12: 'd12',
    20: 'd20',
  }

  const setDieCount = (count: number) => {
    const safeCount = Math.max(MIN_DICE, Math.min(MAX_DICE, Math.floor(count)))

    setDice((prev) => {
      if (safeCount === prev.length) return prev
      if (safeCount > prev.length) {
        const needed = safeCount - prev.length
        const additions = createDice(needed, nextId.current)
        nextId.current += needed
        return [...prev, ...additions]
      }
      return prev.slice(0, safeCount)
    })
  }

  const updateSides = (id: number, sides: number) => {
    const safeSides = Math.max(MIN_SIDES, Math.floor(sides))
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, sides: safeSides } : die)),
    )
  }

  const rollAll = () => {
    setDice((prev) =>
      prev.map((die) => ({
        ...die,
        lastRoll: Math.floor(Math.random() * die.sides) + 1,
      })),
    )
  }

  const rangeLabel = useMemo(
    () => `Any result between 1 and each die's side count`,
    [],
  )

  const previewDice = useMemo(() => dice.slice(0, Math.min(6, dice.length)), [dice])

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Dice Builder</p>
        <h1>Craft your roll</h1>
        <p className="lede">
          Choose how many dice you need and set how many sides each die gets.
          Adjust the layout, then roll them all at once.
        </p>
      </header>

      <section className="panel">
        <div className="panel__top">
          <div>
            <p className="label">Number of dice</p>
            <h2 className="count-display">{dieCount}</h2>
          </div>
          <div className="count-inputs">
            <input
              type="range"
              min={MIN_DICE}
              max={MAX_DICE}
              value={dieCount}
              onChange={(event) => setDieCount(Number(event.target.value))}
            />
            <input
              type="number"
              min={MIN_DICE}
              max={MAX_DICE}
              value={dieCount}
              onChange={(event) => setDieCount(Number(event.target.value))}
            />
          </div>
          <div className="dice-preview-wrap">
            <p className="label">Selected dice</p>
            <div className="dice-preview-row">
              {previewDice.map((die) => {
                const shape = commonShapeMap[die.sides]
                if (!shape) {
                  return (
                    <span key={die.id} className="die-chip">
                      d{die.sides}
                    </span>
                  )
                }
                return (
                  <div key={die.id} className={`die-figure ${shape}`}>
                    <span className="die-figure__caption">d{die.sides}</span>
                  </div>
                )
              })}
              {
              // dice.length > previewDice.length && (
              //   <span className="die-chip">+{dice.length - previewDice.length} more</span>
              // )
              }
            </div>
          </div>
        </div>

        <div className="panel__actions">
          <div>
            <p className="label">Range</p>
            <p className="muted">{rangeLabel}</p>
          </div>
          <button className="primary" onClick={rollAll}>
            Roll all dice
          </button>
        </div>
      </section>

      <section className="dice-grid">
        {dice.map((die, index) => (
          <article key={die.id} className="die-card">
            <div className="die-card__header">
              <div>
                <p className="label">Die {index + 1}</p>
                <h3>{die.sides} sides</h3>
              </div>
              <span className="pill">#{die.id}</span>
            </div>

            <label className="input-group">
              <span className="label">Sides</span>
              <input
                type="number"
                min={MIN_SIDES}
                step={1}
                value={die.sides}
                onChange={(event) => updateSides(die.id, Number(event.target.value))}
              />
            </label>

            <div className="die-card__footer">
              <div>
                <p className="label">Last roll</p>
                <p className="lede">
                  {die.lastRoll ? die.lastRoll : '-'}
                  <span className="muted"> (1 to {die.sides})</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
