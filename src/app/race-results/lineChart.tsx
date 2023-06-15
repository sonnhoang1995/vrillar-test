import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

type Result = {
    grandPrix: string,
    date: string,
    car: string,
    position: string,
    points: string
};

export default function LineChart(props: any) {
    const result: Result[] = props.chartData;
    const labels = result.map(
        (racer: Result) =>
            racer.grandPrix
    );
    const data = result.map((racer: Result, i: number) => {
        return {
            x: i,
            y: racer.points,
            position: racer.position,
            date: racer.date,
            car: racer.car,
        };
    });
    const tooltip = {
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
            <h2 style={{ textAlign: "center", color: "black" }}>
                {props.year} Driver Standings: {props.racerName}
            </h2>
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
