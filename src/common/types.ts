type CommonShape = 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'dx'
const commonShapeMap: Record<number, CommonShape> = {
	2: 'd2',
	4: 'd4',
	5: 'd5',
	6: 'd6',
	8: 'd8',
	10: 'd10',
	12: 'd12',
	20: 'd20',
}


export { commonShapeMap }
export type { CommonShape }
