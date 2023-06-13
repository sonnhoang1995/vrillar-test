export default function Page({
    params
}: {
    params: { year: string, id: string };
}) {
    return (
        <div>
            Team id { params.id } in year { params.year }
        </div>
    );
}
