import React, { useState } from "react";
import moment from "moment";
import styles from "./Table.module.scss"
import Dropdown from "../Dropdown";
import Image from "next/image";
import iconSearch from "../../../public/assets/icons/search-icon.svg";
import paymentIcon from "../../../public/assets/icons/payment-icon1.svg";
import IconsPerValue from "@/utils/IconsPerValue";

export default function Table({ data, filters, filterdInput }) {

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    status: false,
    data: {}
  });

  const toggleDropdown = (info) => {
    setIsDropdownOpen({
      status: !isDropdownOpen.status,
      data: info
    });
  };

  const formatPesosColombianos = (value) =>  {
    let str = Math.floor(value).toString();
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return str;
  }
  
  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.title_container}>

          <h2 className={styles.title}>Tus ventas {filters.time == "day" ? "de hoy" : filters.time == "week" ? "de esta semana" : filters.time == "month" ? "de Junio" : ""} </h2>

          <div className={styles.input_search}>
            <Image className={styles.icono} src={iconSearch} width={18} height={18} alt="Logo ayuda" />
            <input onChange={filterdInput}  placeholder="Buscar" />
          </div>
        </div>
        <div className={styles.body_table}>
        <table>
          <thead>
            <tr>
              <th>Transacción</th>
              <th>Fecha y hora</th>
              <th>Método de pago</th>
              <th>ID transacción Bold</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody className={styles.body_table}>
            {data?.map((item, index) => (
              <tr key={index} onClick={() => toggleDropdown(item)}>
                <td>
                  <div className={styles.td_transaccion}>
                    <Image className={styles.icono} src={paymentIcon} width={18} height={18} alt="Logo ayuda" />
                    {item.status == "SUCCESSFUL" ? <p>Cobro exitoso</p> : <p>Cobro no realizado</p>}
                  </div>
                </td>
                <td><div>{moment(item.createdAt).format('DD-MM-YYYY, h:mm:ss')}</div></td>
                <td>
                    <IconsPerValue value={item} />
                </td>

                <td>{item.id}</td>
                <td>
                  <div className={styles.td_monto}>
                    ${formatPesosColombianos(item.amount)}
                    {item.deduction && (
                      <>
                       <span>Deducción Bold</span>
                       <p>-$ {formatPesosColombianos(item.deduction)}</p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        </div>
      </div>
      <Dropdown isDropdownOpen={isDropdownOpen.status} toggleDropdown={toggleDropdown} data={isDropdownOpen.data} />
    </>

  );
}