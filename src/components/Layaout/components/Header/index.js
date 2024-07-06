import style from "./Header.module.scss"
import Image from "next/image";
import logo from "../../../../../public/assets/icons/logo.svg";
import logoAyuda from "../../../../../public/assets/icons/help-icon.svg";
import Tooltip from "@/utils/Tooltip";

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Image src={logo} width={130} height={60} alt="Logo empresa"/>
      </div>
      <nav className={style.menu}>
        <a href="#" className={style.menu__opcion}>Mi negocio</a>
        <a href="#" className={style.menu__opcion}>Ayuda <Tooltip text={"Ayuda"} element={<Image className={style.icono} src={logoAyuda} width={24} height={24} alt="Logo ayuda" />} /></a>
      </nav>
    </header>

  );
}