import { memo, useState } from "react"
import { TravelPlan } from "./pages/travel-plan/TravelPlan"
import { Tasks } from "./pages/tasks/Tasks"

import { ThemeProvider } from "./context/theme-context"
import { Header } from "./components/Header"

export const WorkshopRoot = memo(() => {
    const [page, setPage] = useState<string>('travel')

    return (
        <ThemeProvider>
            <Header onPageChange={(page) => setPage(page)} />
            <div>
                {page === 'travel' && <TravelPlan />}
                {page === 'tasks' && <Tasks />}
            </div>
        </ThemeProvider>
    )
})
