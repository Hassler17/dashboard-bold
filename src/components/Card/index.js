import style from "./Card.module.scss"
import Image from "next/image";
import iconInfo from "../../../public/assets/icons/info-icon.svg";
import Tooltip from "@/utils/Tooltip";

export default function Card({ data, filters }) {

  const counterAmount = () => {
    let valor = data.reduce((acc, obj) => acc + (obj['amount'] || 0), 0);
    return valor
  }

  const formatPesosColombianos = () => {
    const total = counterAmount()
    let str = Math.floor(total).toString();
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return str;
  }


  return (
    <div className={style.card}>
      <div className={style.card_header}>
        <h2 className={style.card_title}>Total de ventas {filters.time == "day" ? "de hoy" : filters.time == "week" ? "de esta semana" : filters.time == "month" ? "de Junio" : ""} </h2>
        <Tooltip text={"Información"} element={<Image className={style.icono} src={iconInfo} width={24} height={24} alt="Logo ayuda" />} />
          
      </div>
      <div className={style.card_body}>
        <span className={style.card_amount}>$ {formatPesosColombianos()}</span>
        <p className={style.card_subtitle}>Junio, 2024</p>
      </div>
    </div>
  );
}