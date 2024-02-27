import { DailySolarData } from "./components/solarGraphPage/solarGraphPage";

// Interfaces
interface DCData {
    name: { u: string };
    Power: { v: number; u: string; d: number };
    Voltage: { v: number; u: string; d: number };
    Current: { v: number; u: string; d: number };
    YieldDay: { v: number; u: string; d: number };
    YieldTotal: { v: number; u: string; d: number };
    Irradiation?: { v: number; u: string; d: number };
}

interface ACData {
    Power: { v: number; u: string; d: number };
    Voltage: { v: number; u: string; d: number };
    Current: { v: number; u: string; d: number };
    PowerDC: { v: number; u: string; d: number };
    YieldDay: { v: number; u: string; d: number };
    YieldTotal: { v: number; u: string; d: number };
    Frequency: { v: number; u: string; d: number };
    PowerFactor: { v: number; u: string; d: number };
    ReactivePower: { v: number; u: string; d: number };
    Efficiency: { v: number; u: string; d: number };
}

interface Inverter {
    serial: string;
    name: string;
    order: number;
    data_age: number;
    poll_enabled: boolean;
    reachable: boolean;
    producing: boolean;
    limit_relative: number;
    limit_absolute: number;
    AC: { [key: number]: ACData };
    DC: { [key: number]: DCData };
    INV: { [key: number]: { Temperature: { v: number; u: string; d: number } } };
    events: number;
}

interface TotalData {
    Power: { v: number; u: string; d: number };
    YieldDay: { v: number; u: string; d: number };
    YieldTotal: { v: number; u: string; d: number };
}

interface HintsData {
    time_sync: boolean;
    radio_problem: boolean;
    default_password: boolean;
}

interface SolarData {
    inverters: Inverter[];
    total: TotalData;
    hints: HintsData;
}

async function loadAllData(): Promise<string> {
    const response = await fetch("alldata.txt"); //https://frozenassassine.de/openDTU/getlivedata');
    return response.text();
}

// Function to Load JSON Data
async function loadData(): Promise<SolarData> {
    const response = await fetch("livedata.json"); //https://frozenassassine.de/openDTU/getlivedata');

    const data = await response.json();
    return data as SolarData;
}

function getAllSolarItems(data: string): { items: DailySolarData[]; } {
    let items: DailySolarData[] = [];
    let lines: string[] = data.split("\n").filter(element => element.trim() !== '');

    for (let i = 0; i < lines.length; i++) {
        let separated = lines[i].split("|");
        if (separated.length !== 7)
            continue;
        
        var item = new DailySolarData(
            separated[0],
            parseFloat(separated[1]),
            parseFloat(separated[2]),
            parseFloat(separated[3]),
            separated[4],
            parseFloat(separated[5]),
            separated[6]
        );
        items.push(item);
    }
    return { items: items };
}

export {loadAllData, loadData, getAllSolarItems}

export type { SolarData, HintsData, TotalData, Inverter, ACData, DCData };
