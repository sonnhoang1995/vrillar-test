export default function Page({
    params
}: {
    params: { year: string };
}) {
    return (
        <div>
            All teams in {params.year} 
        </div>
    );
}
