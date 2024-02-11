import styles from "./solarGraphPage.module.scss";
import { Line, Bar, Scatter, Radar, Pie } from "react-chartjs-2";

interface SolarData {
    Date: string;
    YieldTotal: number;
    YieldDay: number;
    HighestWatt: number;
    TimeHighestWatt: string;
    Temperature: number;
    TimeHighestTemp: string;
}

interface Props {
    data: SolarData[];
}

export default function solarGraphPage({data}: Props) {
    interface SolarData {
        Date: string;
        YieldTotal: number;
        YieldDay: number;
        HighestWatt: number;
        TimeHighestWatt: string;
        Temperature: number;
        TimeHighestTemp: string;
    }

    interface Props {
        data: SolarData[];
    }

        const dates: string[] = data.map((entry) => entry.Date);
        const yieldTotal: number[] = data.map((entry) => entry.YieldTotal);
        const yieldDay: number[] = data.map((entry) => entry.YieldDay);
        const temperature: number[] = data.map((entry) => entry.Temperature);
        const highestWatt: number[] = data.map((entry) => entry.HighestWatt);

        const lineChartData = {
            labels: dates,
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
                    data: data.map((entry) => ({ x: entry.Temperature, y: entry.YieldTotal })),
                    backgroundColor: "rgb(54, 162, 235)",
                },
            ],
        };

        const radarChartData = {
            labels: ["Yield Day", "Temperature", "Highest Watt"],
            datasets: [
                {
                    label: "Solar Data",
                    data: [
                        yieldDay[yieldDay.length - 1],
                        temperature[temperature.length - 1],
                        highestWatt[highestWatt.length - 1],
                    ],
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    borderColor: "rgba(255, 206, 86, 1)",
                    borderWidth: 1,
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
            <div>
                <h2>Line Chart: Yield Total Over Time</h2>
                <Line data={lineChartData} />
                <h2>Bar Chart: Yield Day for Each Date</h2>
                <Bar data={barChartData} />
                <h2>Scatter Plot: Temperature vs Yield Total</h2>
                <Scatter data={scatterPlotData} />
                <h2>Radar Chart: Latest Solar Data</h2>
                <Radar data={radarChartData} />
                <h2>Pie Chart: Distribution of Yield Day</h2>
                <Pie data={pieChartData} />{" "}
            </div>
        );
    };
