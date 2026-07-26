import * as React from "react"
import { useState } from "react"
import type { DashboardView } from "@/utils/types"
import { DASHBOARD_VIEWS } from "@/utils/types";
import { Bodyweight } from "@/pages/dashboard/bodyweight"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Navigation } from "@/components/navigation"


function DashboardContent({ activeView }) {
    switch (activeView) {
        case DASHBOARD_VIEWS.OVERVIEW:
            return <h1>Overview page !!</h1>;
        case DASHBOARD_VIEWS.BODYWEIGHT:
            return <Bodyweight />;
        default:
            return null;
    }
}

export function Dashboard() {
    const [activeView, setActiveView] = useState<DashboardView>(DASHBOARD_VIEWS.OVERVIEW);
    return (
        <SidebarProvider style={
            {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
        }>
            <Navigation variant="inset" activeView={activeView} setActiveView={setActiveView} />
            <SidebarInset>
                <div className="flex flex-1 flex-col">
                    <DashboardContent activeView={activeView} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}