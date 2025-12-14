import styles from "./RollerSection.module.css"

type Props = {
	children: React.ReactNode;
	className?: string;
	title?: string;
};

export function RollerSection({ children, className = "", title }: Props) {
	return (
		<section className={`${styles.showcase_section} ${className}`}>
			<p className={styles.title}>{title}</p>
			{children}
		</section>
	);
}
