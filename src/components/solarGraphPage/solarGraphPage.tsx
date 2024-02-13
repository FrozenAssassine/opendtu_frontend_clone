import { useEffect, useState } from "react";
import styles from "./SolarGraphPage.module.scss";
import { Line, Bar, Scatter, Radar, Pie } from "react-chartjs-2";
import { SolarData, loadAllData, getSolarItems } from "../../dataParser";
import { Chart, registerables } from "chart.js";
import React from "react";

class DailySolarData {
    constructor(
        public Date: string,
        public YieldTotal: number,
        public YieldDay: number,
        public HighestWatt: number,
        public TimeHighestWatt: string,
        public Temperature: number,
        public TimeHighestTemp: string
    ) {}
}

interface Props {
    data: DailySolarData[];
}

export default function SolarGraphPage() {
    const [dates, setDates] = useState<string[]>([]);
    const [yieldTotal, setYieldTotal] = useState<number[]>([]);
    const [yieldDay, setYieldDay] = useState<number[]>([]);
    const [temperature, setTemperature] = useState<number[]>([]);
    const [highestWatt, setHighestWatt] = useState<number[]>([]);
    const [solarData, setSolarData] = useState<DailySolarData[]>([]);
    const [showEntryCount, setShowEntryCount] = useState(31);
    const [itemsCount, setItemsCount] = useState(0);

    const fetchData = async () => {
        await loadAllData().then((data: string) => {
            let res = getSolarItems(showEntryCount, data);
            const items = res.items;

            setItemsCount(res.rawCount);
            setSolarData(items);

            setDates(items.map((entry) => entry.Date));
            setYieldTotal(items.map((entry) => entry.YieldTotal));
            setYieldDay(items.map((entry) => entry.YieldDay));
            setTemperature(items.map((entry) => entry.Temperature));
            setHighestWatt(items.map((entry) => entry.HighestWatt));
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const lineChartData = {
        labels: dates,
        datasets: [
            {
                label: "Yield Total",
                data: yieldTotal,
                fill: false,
                borderColor: "rgb(255, 0, 100)",
                backgroundColor: "rgb(255, 0, 100)",
                pointRadius: 6,
            },
        ],
    };

    const barChartData = {
        labels: dates,
        datasets: [
            {
                label: "Tagesertrag (Wh)",
                data: yieldDay,
                backgroundColor: "rgb(255, 99, 132)",
            },            {
                label: "Peak (Wh)",
                data: highestWatt,
                backgroundColor: "rgb(0,100,255)",
                borderColor: "rgb(0,100,255)",
                hidden: true,
            },
        ],
    };

    const scatterPlotData = {
        labels: dates,
        datasets: [
            {
                label: "Temperatur vs Tagesertrag",
                data: solarData.map((entry) => ({ x: entry.Temperature, y: entry.YieldDay })),
                backgroundColor: "rgb(255, 255, 0)", 
                borderColor: 'rgb(255, 255, 0)', 
                pointRadius: 6,

            },
        ],
    };

    const lineYieldDayData = {
        labels: dates,
        datasets: [
            {
                label: "Ertrag Peak",
                data: highestWatt,
                backgroundColor: "rgb(255,100,0)",
                borderColor: "rgb(255,100,0)",
            },            {
                label: "Temperatur Peak",
                data: temperature,
                backgroundColor: "rgb(0,255,100)",
                borderColor: "rgb(0,255,100)",
                hidden: true,
            },
        ],
    };

    const temperatureData = {
        labels: dates,
        datasets: [
            {
                label: "Temperatur Peak",
                data: temperature,
                backgroundColor: "rgb(0,255,100)",
                borderColor: "rgb(0,255,100)",
            },
        ],
    };

    Chart.register(...registerables);

    const showEntryCountInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const newValue: number = parseInt((event.target as HTMLInputElement).value);
            setShowEntryCount(newValue > 0 ? (newValue < itemsCount ? newValue : 31) : 31);
            fetchData();
        }
    };
    const showEntryCountInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: number = parseInt(event.target.value);
        setShowEntryCount(newValue > 0 ? (newValue < itemsCount ? newValue : 31) : 31);
    };

    return (
        <div className={styles.solargraphpage}>
            <div className={styles.selectEntryCoundWrapper}>
                Zeige
                <input
                    onChange={showEntryCountInputChanged}
                    value={showEntryCount}
                    onKeyDown={showEntryCountInput}
                    type="number"
                    className={styles.numberInput}
                />
                Einträge
            </div>
            <div className={styles.chartswrapper}>
                <div className={styles.charts}>
                    <div className={styles.chartwrapper}>
                        <h2>Gesamtertrag (KWh)</h2>
                        <Line className={styles.chartStyle} data={lineChartData} />
                    </div>
                    <div className={styles.chartwrapper}>
                        <h2>Tagesertrag (Wh)</h2>
                        <Bar className={styles.chartStyle} data={barChartData} />
                    </div>
                    <div className={styles.chartwrapper}>
                        <h2>Ertrag Peak (Wh)</h2>
                        <Bar className={styles.chartStyle} data={lineYieldDayData} />
                    </div>
                    <div className={styles.chartwrapper}>
                        <h2>Temperatur Peak (Wh)</h2>
                        <Bar className={styles.chartStyle} data={temperatureData} />
                    </div>
                    <div className={styles.chartwrapper}>
                        <h2>Temperatur vs Tagesertrag (°C vs Wh)</h2>
                        <Scatter className={styles.chartStyle} data={scatterPlotData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DailySolarData };
