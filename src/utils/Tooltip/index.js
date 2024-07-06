import styles from "./Tooltip.module.scss"

export default function Tooltip({ text, element }) {


	return (
		<div className={styles.tooltip}> {element}
			<span className={styles.tooltiptext}>{text}</span>
		</div>
	)
}