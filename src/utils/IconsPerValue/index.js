import bancolombiaIcon from "../../../public/assets/icons/bancolombia-icon.svg";
import cardIcon from "../../../public/assets/icons/card-icon.svg";
import nequiIcon from "../../../public/assets/icons/nequi-icon.svg";
import pseIcon from "../../../public/assets/icons/pse-icon.svg";
import visaIcon from "../../../public/assets/icons/visa-icon.svg";
import daviplataIcon from "../../../public/assets/icons/daviplata-icon.svg";
import styles from "./IconsPerValue.module.scss"
import Image from "next/image";
export default function IconsPerValue({value}) {

  const renderIcon = () => {
    if (value.paymentMethod === "BANCOLOMBIA") return bancolombiaIcon;
    if (value.paymentMethod === "NEQUI") return nequiIcon;
    if (value.paymentMethod === "DAVIPLATA") return daviplataIcon;
    if (value.paymentMethod === "PSE") return pseIcon;
    if (value.paymentMethod === "CARD" && value.franchise === "MASTERCARD") return cardIcon;
    if (value.paymentMethod === "CARD" && value.franchise === "VISA") return visaIcon;
  }

  return (
    <div className={styles.td_metodo}>
      <Image src={renderIcon()} width={30} height={30} alt="Logo ayuda" />
      <p>****{value.transactionReference}</p>
    </div>
  )
}