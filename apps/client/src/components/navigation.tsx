import * as React from "react"
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar"

import {
    IconCirclePlusFilled,
    IconChartBar,
    IconScaleOutline,
    IconTreadmill,
    IconBarbell,
    IconSettings
} from "@tabler/icons-react"
import { DASHBOARD_VIEWS } from "@/utils/types"


const data = {
    Personal: [
        {
            title: "Bodyweight",
            viewState: DASHBOARD_VIEWS.BODYWEIGHT,
            icon: IconScaleOutline
        }
    ],
    Training: [
        {
            title: "Exercises",
            viewState: DASHBOARD_VIEWS.EXERCISES,
            icon: IconTreadmill
        },
        {
            title: "Training",
            viewState: DASHBOARD_VIEWS.TRAINING,
            icon: IconBarbell
        }
    ],
    Account: [
        {
            title: "Settings",
            viewState: DASHBOARD_VIEWS.SETTINGS,
            icon: IconSettings
        }
    ]

};

export function Navigation({ activeView, setActiveView, ...props }): React.ComponentProps<typeof Sidebar> {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="#">
                                <span className="text-base font-bold">TrackMyFitness</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            <SidebarMenuItem className="flex items-center gap-2">
                                <SidebarMenuButton tooltip="Create workout" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear">
                                    <IconCirclePlusFilled />
                                    <span>Create workout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem key="Overview">
                                <SidebarMenuButton
                                    tooltip="Overview"
                                    onClick={() => setActiveView(DASHBOARD_VIEWS.OVERVIEW)}
                                >
                                    <IconChartBar />
                                    <span>Overview</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {Object.keys(data).map((key: string) => (
                                <React.Fragment key={key}>
                                    <SidebarGroupLabel>{key}</SidebarGroupLabel>
                                    {
                                        data[key].map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    onClick={() => setActiveView(item.viewState)}
                                                >
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))
                                    }
                                </React.Fragment>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}