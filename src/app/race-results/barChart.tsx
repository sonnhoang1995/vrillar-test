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

export default function BarChart(props: any) {
    const result: AllRacerResult[] = props.chartData;
    const labels = result.map(
        (racer: AllRacerResult) =>
            `${racer.winnerFirstName} ${racer.winnerLastName}`
    );
    const data = result.map((racer: AllRacerResult, i: number) => {
        return {
            y: i,
            x: racer.points,
            position: racer.position,
            nationality: racer.nationality,
            car: racer.car,
        };
    });
    const tooltip = {
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
            <h2 style={{ textAlign: "center", color: "black" }}>
                {props.year} Driver Standings
            </h2>
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
