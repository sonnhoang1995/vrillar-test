export default function Page({
    params
}: {
    params: { year: string; id: string; race: string };
}) {
    return (
        <div>
            Race: {params.id} - {params.race} in {params.year}
        </div>
    );
}
