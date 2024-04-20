import { useEffect, useState } from "react";
import { SolarData, getAllSolarItems, loadAllData } from "../../dataParser";
import { DailySolarData } from "../solarGraphPage/solarGraphPage";
import styles from "./TablePage.module.scss";

type Props = {
    solarData: DailySolarData[];
}

export default function TablePage(props: Props) {
    return (
        <div className={styles.tablePage}>
            <table>
                <thead>
                    <tr>
                        <th>Tag</th>
                        <th>KW (Insgesamt)</th>
                        <th>Watt (Täglich)</th>
                        <th>Watt (Peak)</th>
                        <th>Temperatur (Peak)</th>
                    </tr>
                </thead>
                <tbody>
                    {props.solarData.slice().reverse().map((day, index) => (
                        <tr key={index}>
                            <td>{day.Date}</td>
                            <td>{day.YieldTotal} KWh</td>
                            <td>{day.YieldDay} Wh</td>
                            <td>{day.HighestWatt} W</td>
                            <td>{day.Temperature} °C</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

