"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import DriverSelector from "../driverSelector";
import BarChart from "@/app/race-results/barChart";
import LineChart from "@/app/race-results/lineChart";

type Result = {
    grandPrix: string;
    date: string;
    car: string;
    position: string;
    points: string;
};

type Racer = {
    racerId: string;
    racerName: string;
    result: Result[];
};

type AllResult = {
    position: string;
    winnerFirstName: string;
    winnerLastName: string;
    winnerShortName: string;
    nationality: string;
    car: string;
    points: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Page({
    params
}: {
    params: { year: string; id: string };
}) {
    const filePath = `/race-data/${params.year}/racers.json`;
    const router = useRouter();

    const { data, error, isLoading } = useSWR(filePath, fetcher);

    if (error)
        return (
            <div
                style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "2.5rem",
                    fontWeight: "bold"
                }}
            >
                <p>Sorry! An error has occurred</p>
            </div>
        );
    if (isLoading)
        return (
            <div
                style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "italic"
                }}
            >
                <p>Loading...</p>
            </div>
        );
    const selectorData: Racer[] = data["racers"];
    const allResult: AllResult[] = data["allRacersResult"];
    const racer: Racer | undefined = selectorData.find((racer) =>
        racer.racerId.includes(params.id)
    );
    let racerResult;
    let racerName;
    if (racer) {
        racerResult = racer.result;
        racerName =
            `${racer.racerName.split(",")[1]} ${racer.racerName.split(",")[0]}`;
    }
    const isShowAll = params.id == "all";
    const handleChangeResult = (id: string) => {
        router.push(`${id}`);
    };
    return (
        <div className="m-4">
            <DriverSelector
                drivers={selectorData}
                year={params.year}
                selected={params.id}
                handleChangeResult={handleChangeResult}
            ></DriverSelector>
            {isShowAll ? (
                <BarChart
                    chartData={allResult}
                    year={params.year}
                    type="racers"
                ></BarChart>
            ) : (
                <LineChart
                    chartData={racerResult}
                    year={params.year}
                    type="racers"
                    racerName={racerName}
                ></LineChart>
            )}
        </div>
    );
}
