import { useEffect, useState } from "react";
import styles from "./SolarGraphPage.module.scss";
import { Line, Bar, Scatter, Radar, Pie } from "react-chartjs-2";
import { SolarData, loadAllData } from "../../dataParser";
import { Chart, registerables } from "chart.js";
import React from 'react';

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

    useEffect(() => {
        const fetchData = async () => {
            await loadAllData().then((data) => {
                let items: DailySolarData[] = [];

                let lines: string[] = data.split("\r\n");

                let start = lines.length - lines.length;
                for (let i = start; i < lines.length; i++) {
                    let separated = lines[i].split("|");
                    items.push(
                        new DailySolarData(
                            separated[0],
                            parseFloat(separated[1]),
                            parseFloat(separated[2]),
                            parseFloat(separated[3]),
                            separated[4],
                            parseFloat(separated[5]),
                            separated[5]
                        )
                    );
                }
                setSolarData(items);
                setDates(items.map((entry) => entry.Date));
                setYieldTotal(items.map((entry) => entry.YieldTotal));
                setYieldDay(items.map((entry) => entry.YieldDay));
                setTemperature(items.map((entry) => entry.Temperature));
                setHighestWatt(items.map((entry) => entry.HighestWatt));
            });
        };

        Chart.register(...registerables);

        fetchData();

        const intervalId = setInterval(fetchData, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const calculateAverage = (data: number[]) => {
        const sum = data.reduce((acc, cur) => acc + cur, 0);
        return sum / data.length;
    };

    const lineChartData = {
        labels: dates.map((date) => date.toString()), // Ensure all dates are strings
        datasets: [
            {
                label: "Yield Total",
                data: yieldTotal,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const barChartData = {
        labels: dates,
        datasets: [
            {
                label: "Yield Day",
                data: yieldDay,
                backgroundColor: "rgb(255, 99, 132)",
            },
        ],
    };

    const scatterPlotData = {
        labels: dates,
        datasets: [
            {
                label: "Temperature vs Yield Total",
                data: solarData.map((entry) => ({ x: entry.Temperature, y: entry.YieldTotal })),
                backgroundColor: "rgb(54, 162, 235)",
            },
        ],
    };

    const pieChartData = {
        labels: ["Low", "Medium", "High"],
        datasets: [
            {
                data: [
                    yieldDay.filter((val) => val < 1000).length,
                    yieldDay.filter((val) => val >= 1000 && val < 2000).length,
                    yieldDay.filter((val) => val >= 2000).length,
                ],
                backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            },
        ],
    };

    return (
        <div className={styles.solargraphpage}>
            <div className={styles.chartwrapper}>
                <h2>Line Chart: Yield Total Over Time</h2>
                <Line className={styles.chartStyle} data={lineChartData} />
            </div>
            <div className={styles.chartwrapper}>
                <h2>Bar Chart: Yield Day for Each Date</h2>
                <Bar className={styles.chartStyle} data={barChartData} />
            </div>
            <div className={styles.chartwrapper}>
                <h2>Scatter Plot: Temperature vs Yield Total</h2>
                <Scatter className={styles.chartStyle} data={scatterPlotData} />
            </div>
            <div className={styles.chartwrapper}>
                <h2>Pie Chart: Distribution of Yield Day</h2>
                <Pie className={styles.chartStyle} data={pieChartData} />
            </div>
        </div>
    );
}

export { DailySolarData };
