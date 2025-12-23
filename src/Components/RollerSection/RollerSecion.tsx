import { Icon } from "@iconify/react";
import styles from "./RollerSection.module.css"
import animStyles from "../Common/Anims.module.css"


type Props = {
	children: React.ReactNode;
	className?: string;
	title?: string;
	canBeClosed?: boolean,
	closeClicked?: () => void
};

export function RollerSection({ children, className = "", title, canBeClosed, closeClicked }: Props) {
	return (
		<section className={`${styles.showcase_section} ${className}`}>
			<div className={styles.titleHolder}>
				<p className={styles.title}>{title}</p>
				{canBeClosed && <Icon icon="mdi:close" className={`${animStyles.anim_02e} ${animStyles.hover_up}`} onClick={closeClicked}/>}
			</div>
			{children}
		</section>
	);
}