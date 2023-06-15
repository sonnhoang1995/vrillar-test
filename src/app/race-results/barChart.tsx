import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

type AllRacerResult = {
    position: string;
    winnerFirstName: string;
    winnerLastName: string;
    winnerShortName: string;
    nationality: string;
    car: string;
    points: string;
};

type AllTeamResult = {
    position: string;
    team: string;
    points: string;
};

export default function BarChart(props: any) {
    let labels;
    let data;
    let tooltip;
    let title;
    if (props.type == "racers") {
        title = `${props.year} Driver Standings`;
        const result: AllRacerResult[] = props.chartData;

        labels = result.map(
            (racer: AllRacerResult) =>
                `${racer.winnerFirstName} ${racer.winnerLastName}`
        );
        data = result.map((racer: AllRacerResult, i: number) => {
            return {
                y: i,
                x: racer.points,
                position: racer.position,
                nationality: racer.nationality,
                car: racer.car
            };
        });
        tooltip = {
            callbacks: {
                label: (context: any) => {
                    const position = context.raw.position;
                    const nationality = context.raw.nationality;
                    const car = context.raw.car;
                    const points = context.raw.x;
                    return [
                        `Position: ${position}`,
                        `Points: ${points}`,
                        `Nationality: ${nationality}`,
                        `Car: ${car}`
                    ];
                }
            }
        };
    } else {
        title = `${props.year} Constructor Standings`;
        const result: AllTeamResult[] = props.chartData;
        if (result.length == 0)
            return (
                <h2 style={{ textAlign: "center", color: "black" }}>
                    The Constructors Championship was not awarded until 1958
                </h2>
            );

        labels = result.map((team: AllTeamResult) => team.team);
        data = result.map((team: AllTeamResult, i: number) => {
            return {
                y: i,
                x: team.points,
                position: team.position,
                points: team.points
            };
        });
        tooltip = {
            callbacks: {
                label: (context: any) => {
                    const position = context.raw.position;
                    const points = context.raw.points;

                    return [`Position: ${position}`, `Points: ${points}`];
                }
            }
        };
    }
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: [
                    "#174711",
                    "#F2B3CB",
                    "#BD4466",
                    "#5E8070",
                    "#2C0AA5",
                    "#8A7CA1",
                    "#C5EF16",
                    "#98505A",
                    "#06C3AF",
                    "#F74BDB",
                    "#DAB095",
                    "#8B1C73"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    };
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center", color: "black" }}>{title}</h2>
            <Bar
                data={chartData}
                options={{
                    indexAxis: "y",
                    datasets: {
                        bar: {
                            barPercentage: 0.8,
                            categoryPercentage: 0.8
                        }
                    },
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
