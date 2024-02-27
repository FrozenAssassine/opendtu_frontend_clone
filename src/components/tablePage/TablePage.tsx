import { useEffect, useState } from "react";
import { SolarData, getSolarItems, loadAllData } from "../../dataParser";
import { DailySolarData } from "../solarGraphPage/solarGraphPage";
import styles from "./TablePage.module.scss";

export default function TablePage() {
    const [solarData, setSolarData] = useState<DailySolarData[]>([]);

    const fetchData = async () => {
        await loadAllData().then((data: string) => {
            let res = getSolarItems(-1, data);
            const items = res.items;

            setSolarData(items.reverse());
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                    {solarData.map((day, index) => (
                        <tr key={index}>
                            <td>{day.Date}</td>
                            <td>{day.YieldTotal} KWh</td>
                            <td>{day.YieldDay} W</td>
                            <td>{day.HighestWatt} Wh</td>
                            <td>{day.Temperature} °C</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
function setItemsCount(rawCount: number) {
    throw new Error("Function not implemented.");
}

