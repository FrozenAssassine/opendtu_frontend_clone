import { DCData } from "../../dataParser";
import styles from "./SolarCellDisplay.module.scss";

export default function SolarCellDisplay(data: DCData) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.headline}>{data.name.u ?? ""}</div>
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
                        <td>{data.Power.v.toFixed(2)}</td>
                        <td>{data.Power.u}</td>
                    </tr>
                    <tr>
                        <td>Spannung</td>
                        <td>{data.Voltage.v.toFixed(2)}</td>
                        <td>{data.Voltage.u}</td>
                    </tr>
                    <tr>
                        <td>Strom</td>
                        <td>{data.Current.v.toFixed(2)}</td>
                        <td>{data.Current.u}</td>
                    </tr>
                    <tr>
                        <td>Tagesertrag</td>
                        <td>{data.YieldDay.v.toFixed(2)}</td>
                        <td>{data.YieldDay.u}</td>
                    </tr>
                    <tr>
                        <td>Gesamtertrag</td>
                        <td>{data.YieldTotal.v.toFixed(2)}</td>
                        <td>{data.YieldTotal.u}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
