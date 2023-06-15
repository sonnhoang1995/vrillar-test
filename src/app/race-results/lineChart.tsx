import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

type RacerResult = {
    grandPrix: string;
    date: string;
    car: string;
    position: string;
    points: string;
};

type TeamResult = {
    grandPrix: string;
    date: string;
    points: string;
};

export default function LineChart(props: any) {
    let labels;
    let data;
    let tooltip;
    let title;
    if (props.type == "racers") {
        title = `${props.year} Driver Standings: ${props.racerName}`;
        const result: RacerResult[] = props.chartData;
        labels = result.map((racer: RacerResult) => racer.grandPrix);
        data = result.map((racer: RacerResult, i: number) => {
            return {
                x: i,
                y: racer.points,
                position: racer.position,
                date: racer.date,
                car: racer.car
            };
        });
        tooltip = {
            callbacks: {
                label: (context: any) => {
                    const position = context.raw.position;
                    const date = context.raw.date;
                    const car = context.raw.car;
                    const points = context.raw.y;
                    return [
                        `Position: ${position}`,
                        `Points: ${points}`,
                        `Date: ${date}`,
                        `Car: ${car}`
                    ];
                }
            }
        };
    } else {
        title = `${props.year} Constructor Standings: ${props.teamName}`;
        const result: TeamResult[] = props.chartData;
        labels = result.map((team: TeamResult) => team.grandPrix);
        data = result.map((team: TeamResult, i: number) => {
            return {
                x: i,
                y: team.points,
                date: team.date
            };
        });
        tooltip = {
            callbacks: {
                label: (context: any) => {
                    const date = context.raw.date;
                    const points = context.raw.y;
                    return [`Points: ${points}`, `Date: ${date}`];
                }
            }
        };
    }
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: "#3E5F8A",
                borderColor: "#3E5F8A",
                borderWidth: 2
            }
        ]
    };
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center", color: "black" }}>{title}</h2>
            <Line
                data={chartData}
                options={{
                    indexAxis: "x",
                    plugins: {
                        title: {
                            display: false
                        },
                        legend: {
                            display: false
                        },
                        tooltip
                    }
                }}
            />
        </div>
    );
}
