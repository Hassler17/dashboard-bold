import React, { useState } from "react";
import style from "./Filters.module.scss"
import Image from "next/image";
import iconFilter from "../../../public/assets/icons/filter-icon.svg";
import Button from "@/utils/Button";
import PopUpFilter from "../PopUpFilter";

export default function Filters({filters, handleSetFilter}) {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);


	return (
		<div className={style.container}>
			<div className={style.filter_bar}>
				<div className={filters.time == "day" ? style.option_selected : style.option_none}>
					<span onClick={() => handleSetFilter("day")}>Hoy</span>
				</div>
				<div className={filters.time == "week" ? style.option_selected : style.option_none}>
					<span onClick={() => handleSetFilter("week")}>Esta Semana</span>
				</div>
				<div className={filters.time == "month" ? style.option_selected : style.option_none}>
					<span onClick={() => handleSetFilter("month")}>Junio</span>
				</div>

			</div>
			<div className={style.body_button}>
				<Button
					title="Filtrar"
					icon={iconFilter}
					click={() => handleOpen()}
				/>
				{
					isOpen &&
					<PopUpFilter filters={filters} handleOpen={handleOpen} handleClose={handleClose} handleSetFilter={handleSetFilter}/>

				}
			</div>

		</div>
	);
}