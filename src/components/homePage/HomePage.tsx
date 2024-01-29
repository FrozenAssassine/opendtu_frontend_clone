import DisplayTextItem from "../displayTextItem/DisplayTextItem";
import GeneralDisplay from "../generalDisplay/GeneralDisplay";
import SolarCellDisplay from "../solarCellDisplay/SolarCellDisplay";
import SolarSummaryDisplay from "../solarSummaryDisplay/SolarSummaryDisplay";
import styles from "./HomePage.module.scss";



export default function HomePage() {
    return (
        <div>
            <div className={styles.headline}>OpenDTU</div>
            <div className={styles.header}>
                <div className={styles.headitems}>
                    <DisplayTextItem content="1223,58" headline="Gesamtertrag Insgesamt" unit="kWh" />
                    <DisplayTextItem content="6430" headline="Gesamtertrag Heute" unit="Wh" />
                    <DisplayTextItem content="6420" headline="Gesamtleistung" unit="W" />
                </div>
            </div>
            <div className={styles.solarCells}>
                <GeneralDisplay lastUpdated="5sec" temperature="10"/>
                <SolarSummaryDisplay daily="10" ampere="20" dc_power="16" frequency="50" overall="2100" volt="230" watt="40" />
                <SolarCellDisplay ampere="10" daily="200" volt="24" overall="2000" watt="240" />
                <SolarCellDisplay ampere="10" daily="200" volt="24" overall="2000" watt="240" />
                <SolarCellDisplay ampere="10" daily="200" volt="24" overall="2000" watt="240" />
            </div>
        </div>
    );
}
