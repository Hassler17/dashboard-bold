import React from "react";
import style from "./Button.module.scss"
import Image from "next/image";
export default function Button(props) {
  const { title, icon, styles, click } = props
  
  return (
    <button className={style.button_container + " " + styles} onClick={click}>{title} <Image src={icon.src} width={40} height={40} alt="img icons button" /></button>
  );
}