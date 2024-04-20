import { SolarData } from "../../dataParser";
import { DailySolarData } from "../solarGraphPage/solarGraphPage";
import styles from "./infoDisplay.module.scss";

type Props = {
    solarData: SolarData;
    todayData: DailySolarData;
}

export default function InfoDisplay({solarData, todayData}: Props) {
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
                <div>Watt Peak: {todayData.HighestWatt} Wh</div>
            </div>
        </div>
    );
}
