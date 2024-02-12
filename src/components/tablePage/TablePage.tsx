import { useEffect, useState } from "react";
import { SolarData, loadAllData } from "../../dataParser";
import { DailySolarData } from "../solarGraphPage/solarGraphPage";
import styles from "./TablePage.module.scss";

export default function TablePage() {
    const [solarData, setSolarData] = useState<DailySolarData[]>([]);

    const fetchData = async () => {
        await loadAllData().then((data) => {
            let items: DailySolarData[] = [];

            let lines: string[] = data.split("\n");

            for (let i = 0; i < lines.length; i++) {
                let separated = lines[i].split("|");
                if(lines[i].length == 0 || separated.length == 0)
                    continue;
                
                items.push(
                    new DailySolarData(
                        separated[0],
                        parseFloat(separated[1]),
                        parseFloat(separated[2]),
                        parseFloat(separated[3]),
                        separated[4],
                        parseFloat(separated[5]),
                        separated[6]
                    )
                );
            }
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
