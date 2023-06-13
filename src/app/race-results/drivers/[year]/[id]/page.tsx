export default function Page({
    params
}: {
    params: { year: string, id: string };
}) {
    return (
        <div>
            Driver id {params.id} in year {params.year} 
        </div>
    );
}
