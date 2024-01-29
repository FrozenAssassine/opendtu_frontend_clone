import { SolarData } from "../../dataParser";
import styles from "./infoDisplay.module.scss";

export default function InfoDisplay(solarData: SolarData) {
    return (
        <div className={styles.wrapper}>
            <div>
                <div>Wechselrichter: {solarData.inverters[0].name}</div>
                <div>
                    Temperatur: {solarData.inverters[0].INV[0].Temperature.v.toFixed(2)}{" "}
                    {solarData.inverters[0].INV[0].Temperature.u}
                </div>
                <div>Letztes Update: {solarData.inverters[0].data_age} Sekunde</div>
            </div>
            <div className={styles.alignRight}>
                <div>Erreichbar: {solarData.inverters[0].reachable ? "True" : "False"}</div>
                <div>Limit: {solarData.inverters[0].limit_absolute}W</div>
            </div>
        </div>
    );
}
