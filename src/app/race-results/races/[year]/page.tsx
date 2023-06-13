export default function Page({
    params
}: {
    params: { year: string };
}) {
    return (
        <div>
            All Races in {params.year} 
        </div>
    );
}
