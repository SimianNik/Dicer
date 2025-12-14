import { DisplayDie } from '../Dice/DisplayDie'
import styles from './CustomDisplayDie.module.css'

export const CustomDisplayDie = () => {
	return (
		<div className={`${styles.wrapper} `}>
			<DisplayDie/>
			<p className='custom_die_sub'>Custom Die</p>
		</div>
	)
}