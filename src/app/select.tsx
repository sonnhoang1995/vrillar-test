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
        router.push(`/race-results/${content}/${selectedYear}/all`);
    };

    const changeContent = (selectedContent: string) => {
        setContent(selectedContent);
        router.push(`/race-results/${selectedContent}/${year}/all`);
    };

    return (
        <div className="row m-4">
            <div className="col-12 col-md-6">
                <select
                    className="form-select form-select-lg mb-3"
                    onChange={(e) => changeYear(e.target.value)}
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderColor: "lightgray"
                    }}
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
            <div className="col-12 col-md-6">
                <select
                    className="form-select form-select-lg mb-3"
                    onChange={(e) => changeContent(e.target.value)}
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderColor: "lightgray"
                    }}
                >
                    <option value="races">Races</option>
                    <option value="drivers">Drivers</option>
                    <option value="teams">Teams</option>
                </select>
            </div>
        </div>
    );
}
