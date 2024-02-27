import { useState } from 'react';
import styles from './App.module.scss';
import HomePage from './homePage/HomePage';
import SolarGraphPage from './solarGraphPage/solarGraphPage';
import NavigationBar, { NavigationBarItem } from './navigationBar/NavigationBar';
import TablePage from './tablePage/TablePage';

type Props ={
    activeIndex : number
}

export default function App({activeIndex}: Props){

    const navigationItems = [
        new NavigationBarItem("OpenDTU", "Live", "/live", <HomePage/>),
        new NavigationBarItem("Verlauf", "Verlauf", "/history", <SolarGraphPage/>),
        new NavigationBarItem("Tabelle", "Tabelle", "/table", <TablePage/>)
    ]

    return (
        <div className={styles.app}>
            <NavigationBar items={navigationItems} activePage={navigationItems[activeIndex]}/>
        </div>
    );
}