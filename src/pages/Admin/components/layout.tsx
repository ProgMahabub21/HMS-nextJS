import Sidebar from "./sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar />
            <main>{children}</main>

        </>
    )
}