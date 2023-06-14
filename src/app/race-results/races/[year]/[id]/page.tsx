"use client";

import useSWR from "swr";
import RaceSelector from "../raceSelector";
import { useRouter } from "next/navigation";
import styles from "../../races.module.css";

type Result = {
    position: string;
    number: string;
    racerFirstName: string;
    racerLastName: string;
    racerShortName: string;
    car: string;
    laps: string;
    time: string;
    points: string;
};

type Race = {
    raceId: string;
    grandPrix: string;
    result: Result[];
};

type AllResult = {
    car: string;
    date: string;
    grandPrix: string;
    laps: string;
    time: string;
    winnerFirstName: string;
    winnerLastName: string;
    winnerShortName: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Page({
    params
}: {
    params: { year: string; id: string };
}) {
    const filePath = `/race-data/${params.year}/races.json`;
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
    const selectorData: Race[] = data["races"];
    const allResult: AllResult[] = data["allRaceResult"];
    const result: Result[] | undefined = selectorData.find(
        (race) => race.raceId == params.id
    )?.result;
    const isShowAll = params.id == "all";
    const handleChangeResult = (id: string) => {
        router.push(`${id}`);
    };
    return (
        <div className="m-4">
            <RaceSelector
                races={selectorData}
                year={params.year}
                selected={params.id}
                handleChangeResult={handleChangeResult}
            ></RaceSelector>
            {isShowAll ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles["ar-grand-prix"]}>
                                Grand Prix
                            </th>
                            <th className={styles["ar-date"]}>Date</th>
                            <th className={styles["ar-winner"]}>Winner</th>
                            <th className={styles["ar-car"]}>Car</th>
                            <th className={styles["ar-laps"]}>Laps</th>
                            <th className={styles["ar-time"]}>Time</th>
                        </tr>
                    </thead>
                    <tbody className={styles["ar-body"]}>
                        {allResult.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td className={styles["ar-grand-prix"]}>
                                        {val.grandPrix}
                                    </td>
                                    <td className={styles["ar-date"]}>
                                        {val.date}
                                    </td>
                                    <td className={styles["ar-winner"]}>
                                        <p>
                                            <span
                                                className={
                                                    styles[
                                                        "ar-winner-first-name"
                                                    ]
                                                }
                                            >
                                                {val.winnerFirstName}
                                            </span>{" "}
                                            <span
                                                className={
                                                    styles[
                                                        "ar-winner-last-name"
                                                    ]
                                                }
                                            >
                                                {val.winnerLastName}
                                            </span>
                                            <span
                                                className={
                                                    styles[
                                                        "ar-winner-short-name"
                                                    ]
                                                }
                                            >
                                                {val.winnerShortName}
                                            </span>
                                        </p>
                                    </td>
                                    <td className={styles["ar-car"]}>
                                        {val.car}
                                    </td>
                                    <td className={styles["ar-laps"]}>
                                        {val.laps}
                                    </td>
                                    <td className={styles["ar-time"]}>
                                        {val.time}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles["r-position"]}>POS</th>
                            <th className={styles["r-number"]}>NO</th>
                            <th className={styles["r-driver"]}>DRIVER</th>
                            <th className={styles["r-car"]}>CAR</th>
                            <th className={styles["r-laps"]}>LAPS</th>
                            <th className={styles["r-time"]}>TIME/RETIRED</th>
                            <th className={styles["r-points"]}>PTS</th>
                        </tr>
                    </thead>
                    <tbody className={styles["r-body"]}>
                        {result &&
                            result.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td className={styles["r-position"]}>
                                            {val.position}
                                        </td>
                                        <td className={styles["r-number"]}>
                                            {val.number}
                                        </td>
                                        <td className={styles["r-driver"]}>
                                            <p>
                                                <span
                                                    className={
                                                        styles[
                                                            "r-driver-first-name"
                                                        ]
                                                    }
                                                >
                                                    {val.racerFirstName}
                                                </span>{" "}
                                                <span
                                                    className={
                                                        styles[
                                                            "r-driver-last-name"
                                                        ]
                                                    }
                                                >
                                                    {val.racerLastName}
                                                </span>
                                                <span
                                                    className={
                                                        styles[
                                                            "r-driver-short-name"
                                                        ]
                                                    }
                                                >
                                                    {val.racerShortName}
                                                </span>
                                            </p>
                                        </td>
                                        <td className={styles["r-car"]}>
                                            {val.car}
                                        </td>
                                        <td className={styles["r-laps"]}>
                                            {val.laps}
                                        </td>
                                        <td className={styles["r-time"]}>
                                            {val.time}
                                        </td>
                                        <td className={styles["r-points"]}>
                                            {val.points}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            )}
        </div>
    );
}
