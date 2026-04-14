import { useState } from "react";
import { PageHeader } from "@/shared/ui";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

export default function WorkoutPlansPage() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: Temporal.PlainDate.from("2023-12-16"),
        end: Temporal.PlainDate.from("2023-12-16"),
      },
    ],
    plugins: [eventsService],
  });

  return (
    <section className="space-y-5">
      <PageHeader
        title="Workout plans"
        description="Lay out training sessions on the calendar. Events are sample data until scheduling is wired up."
      />
      <ScheduleXCalendar calendarApp={calendar} />
    </section>
  );
}
