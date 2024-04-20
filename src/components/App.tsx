import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import HomePage from "./homePage/HomePage";
import SolarGraphPage, { DailySolarData } from "./solarGraphPage/solarGraphPage";
import TablePage from "./tablePage/TablePage";
import { SolarData, getAllSolarItems, loadAllData, loadData } from "../dataParser";

type Props = {
    activeIndex: number;
};

const items = [
    { name: "OpenDTU", index: 0 },
    { name: "Verlauf", index: 1 },
    { name: "Tabelle", index: 2 },
];

export default function App({ activeIndex }: Props) {
    const [solarData, setSolarData] = useState<DailySolarData[]>([]);
    const [liveData, setLiveData] = useState<SolarData | null>(null);

    const fetchData = async () => {
        await loadAllData().then((data: string) => {
            let res = getAllSolarItems(data);
            const items = res.items;
            setSolarData(items);
        });

        await loadData().then((data) => {
            setLiveData(data);
        });
    };


    useEffect(() => {
          fetchData();
          const intervalId = setInterval(fetchData, 10000);
          
          return () => {
            clearInterval(intervalId);
          };
      }, []);
    
    return (
        <div className={styles.app}>
            <div className={styles.navigationBar}>
                <div className={styles.navigationHeadline}>{items[activeIndex].name}</div>
                <div className={styles.navBarButtons}>
                    <a href={"/live"} className={styles.navigationBarButton}>
                        OpenDTU
                    </a>
                    <a href="/history" className={styles.navigationBarButton}>
                        Verlauf
                    </a>
                    <a href="/table" className={styles.navigationBarButton}>
                        Tabelle
                    </a>
                </div>
            </div>
            <div className={styles.pageDisplay}>
                {activeIndex == 0 && <HomePage solarData={liveData} todayData={solarData[solarData.length - 1]}/>}
                {activeIndex == 1 && <SolarGraphPage allItems={solarData} />}
                {activeIndex == 2 && <TablePage solarData={solarData} />}
            </div>
        </div>
    );
}
