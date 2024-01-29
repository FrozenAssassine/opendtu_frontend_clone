import styles from "./SolarCellDisplay.module.scss";

type solarData = {
    watt: string;
    volt: string;
    ampere: string;
    daily: string;
    overall: string;
};

export default function SolarCellDisplay(data: solarData) {
    return (
        <div className={styles.wrapper}>
            <table>
                <thead>
                    <tr>
                        <th>Eigenschaft</th>
                        <th>Wert</th>
                        <th>Einheit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Leistung</td>
                        <td>{data.watt}</td>
                        <td>W</td>
                    </tr>
                    <tr>
                        <td>Spannung</td>
                        <td>{data.volt}</td>
                        <td>V</td>
                    </tr>
                    <tr>
                        <td>Strom</td>
                        <td>{data.ampere}</td>
                        <td>A</td>
                    </tr>
                    <tr>
                        <td>Tagesertrag</td>
                        <td>{data.daily}</td>
                        <td>Wh</td>
                    </tr>
                    <tr>
                        <td>Gesamtertrag</td>
                        <td>{data.overall}</td>
                        <td>kWh</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
