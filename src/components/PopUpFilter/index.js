import React, { useEffect, useState } from 'react';
import styles from './Popup.module.scss';
import Image from 'next/image';
import closeIcon from '../../../public/assets/icons/close-icon.svg';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorage';


export default function PopUpFilter(props) {

  const { handleClose, handleSetFilter, filters } = props;
  const [checkboxes, setCheckboxes] = useState({
    dataphone: false,
    link: false,
    all: false
  })

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
    saveToLocalStorage('checks', {
      ...checkboxes,
      [name]: checked,
    })
  };

  useEffect(() => {
    const persistChecks = loadFromLocalStorage("checks")
    if (persistChecks) {
      setCheckboxes(persistChecks)
    }
  }, [])

  const determinateFilter = (event) => {
    event.preventDefault();
    if (checkboxes.all) return handleSetFilter("all");
    if (checkboxes.dataphone && checkboxes.link) return handleSetFilter("all");
    if (checkboxes.dataphone && filters.time == "day") return handleSetFilter("day-terminal");
    if (checkboxes.dataphone && filters.time == "week") return handleSetFilter("week-terminal");
    if (checkboxes.dataphone && filters.time == "month") return handleSetFilter("month-terminal");
    if (checkboxes.link && filters.time == "day") return handleSetFilter("day-link");
    if (checkboxes.link && filters.time == "week") return handleSetFilter("week-link");
    if (checkboxes.link && filters.time == "month") return handleSetFilter("month-link");
    if (checkboxes.dataphone) return handleSetFilter("TERMINAL");
    if (checkboxes.link) return handleSetFilter("PAYMENT_LINK");
  }

  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popup_content}>
          <div className={styles.header_popUp}>
            <span className={styles.popup_title} >Filtrar</span>
            <Image src={closeIcon} width={23} onClick={handleClose} height={23} alt="img icons close" />
          </div>
          <form className={styles.form_container} onSubmit={determinateFilter}>
            <label>
              <input type="checkbox" name="dataphone" checked={checkboxes.dataphone} onChange={handleCheckboxChange} />
              Cobro con datáfono
            </label>
            <label>
              <input type="checkbox" name="link" checked={checkboxes.link} onChange={handleCheckboxChange} />
              Cobro con link de pago
            </label>
            <label>
              <input type="checkbox" name="all" hecked={checkboxes.all} onChange={handleCheckboxChange} />
              Ver todos
            </label>
            <button type="submit">Aplicar</button>
          </form>
        </div>
      </div>
    </>
  );
};

