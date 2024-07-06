'use client'

import React, { useEffect, useState, useRef } from "react";
import Layaout from "@/components/Layaout";
import Card from "@/components/Card";
import Filters from "@/components/Filters";
import Table from "@/components/Table";
import moment from "moment";
import style from "./Home.module.scss";
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorage';

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [realData, setRealData] = useState([]);
  const [lastFilter, setLasFilter] = useState([]);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    time: "",
    salesType: ""
  });
  const hasFetchedData = useRef(false);

  const persist = async (transfers) => {
    const filterPersist = await loadFromLocalStorage('filter');
    const lastFilterPersist =  await loadFromLocalStorage('lastFilter');

    if (filterPersist) {
      setFilters({
        time: filterPersist,
        salesType: ""
      });
      handleSetFilter(lastFilterPersist, transfers);
    }
  };

  const getData = async () => {
    const url = '/api/proxy';
    await fetch(url)
      .then((response) => response.json())
      .then((transfers) => {
        setData(transfers.data);
        setRealData(transfers.data);
          persist(transfers.data);
      });
  };

  useEffect(() => {
    if (!hasFetchedData.current) { 
      getData();
      hasFetchedData.current = true;
    }
  }, []);

  const filterdInput = (event) => {
    const { value } = event.target;
    const infoFilter = realData.filter(item => {
      return (
        item.id.toLowerCase().includes(value.toLowerCase()) ||
        item.status.toLowerCase().includes(value.toLowerCase()) ||
        item.paymentMethod.toLowerCase().includes(value.toLowerCase()) ||
        item.salesType.toLowerCase().includes(value.toLowerCase()) ||
        moment(item.createdAt).format('DD-MM-YYYY, h:mm:ss').includes(value.toLowerCase()) ||
        String(item.transactionReference).toLowerCase().includes(value.toLowerCase()) ||
        String(item.amount).toLowerCase().includes(value.toLowerCase()) ||
        (item.deduction && String(item.deduction).toLowerCase().includes(value.toLowerCase())) ||
        (item.franchise && item.franchise.toLowerCase().includes(value.toLowerCase()))
      );
    });

    setData(infoFilter);
  };

  const filterDates = (filterType, transfers) => {
    const now = moment();
    const info = transfers || realData
    switch (filterType) {
      case 'day':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.isSame(now, 'day');
        });

      case 'week':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.isSame(now, 'week');
        });

      case 'month':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.month() === 5;
        });

      case 'day-terminal':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.isSame(now, 'day') && item.salesType === "TERMINAL";
        });

      case 'day-link':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.isSame(now, 'day') && item.salesType === "PAYMENT_LINK";
        });

      case 'week-terminal':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.isSame(now, 'week') && item.salesType === "TERMINAL";
        });

      case 'week-link':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.isSame(now, 'week') && item.salesType === "PAYMENT_LINK";;
        });

      case 'month-terminal':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.month() === 5 && item.salesType === "TERMINAL";
        });

      case 'month-link':
        return info.filter(item => {
          const date = moment(item.createdAt, 'x');
          return date.month() === 5 && item.salesType === "PAYMENT_LINK";;
        });

      case 'PAYMENT_LINK':
        return info.filter(item => item.salesType === "PAYMENT_LINK");

      case 'TERMINAL':
        return info.filter(item => item.salesType === "TERMINAL");

      case 'all':
        return info;
      default:
        return data;
    }
  };

  const handleSetFilter = (value, transfers) => {
    saveToLocalStorage('lastFilter', value);
    if (['day', 'week', 'month', 'all'].includes(value)) {
      saveToLocalStorage('filter', value);

      setFilters({
        ...filters,
        time: value,
      });
    }

    const filterData = filterDates(value, transfers);
    setData(filterData);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Layaout>
      <section className={style.container_card_filters}>
        <Card data={data} filters={filters} />
        <Filters filters={filters} handleSetFilter={handleSetFilter} />
      </section>
      <section>
        <Table filterdInput={filterdInput} data={data} filters={filters} />
      </section>
    </Layaout>
  );
}
