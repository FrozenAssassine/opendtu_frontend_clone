import { SolarData } from "../../dataParser";
import styles from "./SolarSummaryDisplay.module.scss";

export default function SolarSummaryDisplay(solarData: SolarData) {
    let data = solarData.inverters[0].AC[0];

    return (
        <div className={styles.wrapper}>
            <div className={styles.headline}>Phase 1</div>
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
                        <td>{data.Power.v.toFixed(2) }</td>
                        <td>{data.Power.u ?? ""}</td>
                    </tr>
                    <tr>
                        <td>Spannung</td>
                        <td>{data.Voltage.v.toFixed(2) ?? ""}</td>
                        <td>{data.Voltage.u ?? ""}</td>
                    </tr>
                    <tr>
                        <td>Strom</td>
                        <td>{data.Current.v.toFixed(2) ?? ""}</td>
                        <td>{data.Current.u ?? ""}</td>
                    </tr>
                    <tr>
                        <td>DC-Leistung</td>
                        <td>{data.PowerDC?.v.toFixed(2)}</td>
                        <td>{data.PowerDC?.u}</td>
                    </tr>
                    <tr>
                        <td>Tagesertrag</td>
                        <td>{data.YieldDay.v.toFixed(2) ?? ""}</td>
                        <td>{data.YieldDay.u ?? ""}</td>
                    </tr>
                    <tr>
                        <td>Gesamtertrag</td>
                        <td>{data.YieldTotal.v.toFixed(2) ?? ""}</td>
                        <td>{data.YieldTotal.u ?? ""}</td>
                    </tr>
                    <tr>
                        <td>Frequenz</td>
                        <td>{data.Frequency.v.toFixed(2) ?? ""}</td>
                        <td>{data.Frequency.u ?? ""}</td>
                    </tr>
                    <tr>
                        <td>Leistungsfaktor</td>
                        <td>{data.PowerFactor.v.toFixed(2) ?? ""}</td>
                        <td>{data.PowerFactor.u ?? ""}</td>
                    </tr>
                    <tr>
                        <td>Blindleistung</td>
                        <td>{data.ReactivePower.v.toFixed(2) ?? ""}</td>
                        <td>{data.ReactivePower.u ?? ""}</td>
                    </tr>
                    <tr>
                        <td>Wirkungsgrad</td>
                        <td>{data.Efficiency.v.toFixed(2) ?? ""}</td>
                        <td>{data.Efficiency.u ?? ""}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
