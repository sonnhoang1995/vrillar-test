"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function Select() {
    useEffect(() => {
        import("bootstrap");
    }, []);
    const [year, setYear] = useState("2023");
    const [content, setContent] = useState("races");
    const router = useRouter();
    const years: number[] = [];
    for (let i = 2023; i >= 1950; i--) {
        years.push(i);
    }
    const changeYear = (selectedYear: string) => {
        setYear(selectedYear);
        router.push(`/race-results/${content}/${selectedYear}`);
    };

    const changeContent = (selectedContent: string) => {
        setContent(selectedContent);
        router.push(`/race-results/${selectedContent}/${year}`);
    };

    const changeSubContent = (subContent: string) => {
        router.push(`race-results/${content}/${year}/${subContent}`);
    };

    return (
        <div className="row m-4">
            <div className="col-12 col-md-4">
                <select
                    className="form-select form-select-lg mb-3"
                    onChange={(e) => changeYear(e.target.value)}
                    style={{ width: "100%", textAlign: "center" }}
                >
                    {years.map((year) => {
                        return (
                            <option key={`${year}`} value={`${year}`}>
                                {year}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="col-12 col-md-4">
                <select
                    className="form-select form-select-lg mb-3"
                    onChange={(e) => changeContent(e.target.value)}
                    style={{ width: "100%", textAlign: "center" }}
                >
                    <option value="races">Races</option>
                    <option value="drivers">Drivers</option>
                    <option value="teams">Teams</option>
                </select>
            </div>
            <div className="col-12 col-md-4">
                <select
                    className="form-select form-select-lg mb-3"
                    onChange={(e) => changeSubContent(e.target.value)}
                    style={{ width: "100%", textAlign: "center" }}
                >
                    <option value="all">All</option>
                </select>
            </div>
        </div>
    );
}
