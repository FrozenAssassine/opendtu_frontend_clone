import { useEffect, useState } from "react";
import { loadData, SolarData } from "../../dataParser";
import DisplayTextItem from "../displayTextItem/DisplayTextItem";
import SolarCellDisplay from "../solarCellDisplay/SolarCellDisplay";
import SolarSummaryDisplay from "../solarSummaryDisplay/SolarSummaryDisplay";
import styles from "./HomePage.module.scss";
import InfoDisplay from "../infoDisplay/InfoDisplay";
import { DailySolarData } from "../solarGraphPage/solarGraphPage";

type Props = {
  solarData: SolarData | null;
  todayData: DailySolarData;
}

export default function HomePage({solarData, todayData}: Props) {
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.headitems}>
                    <DisplayTextItem content={solarData?.total.YieldTotal} headline="Gesamtertrag Insgesamt"/>
                    <DisplayTextItem content={solarData?.total.YieldDay} headline="Gesamtertrag Heute"/>
                    <DisplayTextItem content={solarData?.total.Power} headline="Gesamtleistung"/>
                </div>
            </div>
            {solarData !== null && <InfoDisplay solarData={solarData} todayData={todayData}/>}

            <div className={styles.solarCells}>
                {solarData !== null && <SolarSummaryDisplay {...solarData}/>}
                                
                {solarData?.inverters[0].DC && Object.values(solarData?.inverters[0].DC).map((x, i) => 
                    [x.name.u !== "Leer" && <SolarCellDisplay key={i} {...x}/>]
                )}
            </div>
        </div>
    );
}
