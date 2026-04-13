import { PageForShell } from "@/shared/ui";
import { useState } from "react";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

export default function WorkoutPlansPage() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.PlainDate.from('2023-12-16'),
        end: Temporal.PlainDate.from('2023-12-16'),
      },
    ],
    plugins: [eventsService]
  })

  return (
    <PageForShell
      title="Workout Plans"
      description="Define focused learning routines with measurable sessions and clear outcomes for each learner path."
    >
      <div className="mt-6">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </PageForShell>
  );
}
