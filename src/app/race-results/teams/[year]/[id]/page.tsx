"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import BarChart from "@/app/race-results/barChart";
import LineChart from "@/app/race-results/lineChart";
import TeamSelector from "../teamSelector";

type Result = {
    grandPrix: string;
    date: string;
    points: string;
};

type Team = {
    teamId: string;
    teamName: string;
    result: Result[];
};

type AllResult = {
    position: string;
    team: string;
    points: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Page({
    params
}: {
    params: { year: string; id: string };
}) {
    const filePath = `/race-data/${params.year}/teams.json`;
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
    const selectorData: Team[] = data["teams"];
    const allResult: AllResult[] = data["allTeamsResult"];
    const team: Team | undefined = selectorData.find((team) =>
        team.teamId==params.id
    );
    let teamResult;
    let teamName;
    if (team) {
        teamResult = team.result;
        teamName = team.teamName;
    }
    const isShowAll = params.id == "all";
    const handleChangeResult = (id: string) => {
        router.push(`${id}`);
    };
    return (
        <div className="m-4">
            <TeamSelector
                teams={selectorData}
                year={params.year}
                selected={params.id}
                handleChangeResult={handleChangeResult}
            ></TeamSelector>
            {isShowAll ? (
                <BarChart
                    chartData={allResult}
                    year={params.year}
                    type="teams"
                ></BarChart>
            ) : (
                <LineChart
                    chartData={teamResult}
                    year={params.year}
                    type="teams"
                    teamName={teamName}
                ></LineChart>
            )}
        </div>
    );
}
