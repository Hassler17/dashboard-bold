import React from 'react';
import styles from './Dropdown.module.scss';
import Image from 'next/image';
import linkIcon from "../../../public/assets/icons/link-icon.svg"
import checkIcon from "../../../public/assets/icons/check-icon.svg"
import failIcon from "../../../public/assets/icons/fail-icon.svg"
import closeIcon from "../../../public/assets/icons/close-icon.svg"
import moment from 'moment';
import IconsPerValue from '@/utils/IconsPerValue';
import Tooltip from '@/utils/Tooltip';

export default function Dropdown(props) {
  const { isDropdownOpen, toggleDropdown, data } = props

  const formatPesosColombianos = (value) => {
    let str = Math.floor(value).toString();
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return str;
  }

  return (
    <div className={isDropdownOpen ? styles.dropdownActive : styles.dropdown}>
      <div className={styles.container}>
        <div className={styles.manuDrop}>
          <div className={styles.icono_title} onClick={toggleDropdown}>
            <Image src={closeIcon} width={30} height={30} alt="Logo" />
          </div>
          <section className={styles.sub_header}>
            <Image className={styles.icono} src={data.status == "SUCCESSFUL" ? checkIcon : failIcon} width={40} height={40} alt="Logo check" />
            {data.status == "SUCCESSFUL" ? '¡Cobro exitoso!' : '¡Cobro no realizado!'}

            <span>${formatPesosColombianos(data.amount)}</span>
            <p>{moment(data.createdAt).format('DD-MM-YYYY, h:mm:ss')}</p>
          </section>
          <section className={styles.body_dropdown}>
            <box className={styles.first_detail}>
              <span>
                ID Transacción Bold
              </span>
              <p>
                {data.id}
              </p>
            </box>
            {data.deduction && (
              <box className={styles.second_detail}>
                <span>
                  Deducción Bold
                </span>
                <p>
                  -$ {formatPesosColombianos(data.deduction)}
                </p>
              </box>
            )}

            <div className={styles.line} />

            <box className={styles.third_detail}>
              <span>
                Metodo de pago
              </span>
                <IconsPerValue value={data} />
            </box>
            <box className={styles.fourth_detail}>
              <span>
                Tipo de pago
              </span>
              <p>

              <Tooltip text={"Link de pago"} element={<Image className={styles.icono} src={linkIcon} width={20} height={20} alt="Logo ayuda" />} />
                
                Link de pagos
              </p>
            </box>
          </section>
          {/* <li onClick={()=>toggleDropdown()}><a href="#">Submenú 1</a></li> */}

        </div>
      </div>
    </div>
  );
};