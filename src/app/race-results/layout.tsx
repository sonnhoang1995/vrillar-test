export default function ResultLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <section style={{ height: "100vh" }}>{children}</section>;
}
