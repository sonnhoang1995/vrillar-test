export default function Page({
    params
}: {
    params: { year: string };
}) {
    return (
        <div>
            All drivers in {params.year} 
        </div>
    );
}
