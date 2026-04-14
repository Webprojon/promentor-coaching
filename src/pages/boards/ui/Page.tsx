import { Typography } from "@promentorapp/ui-kit";
import { BoardTypeSwitch, TacticsCanvas, TacticsToolbar } from "@/pages/boards/ui/components";

export default function BoardsPage() {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Typography component="h1" className="text-2xl font-semibold text-white">
            Tactical Boards
          </Typography>
          <Typography component="p" className="mt-1 text-sm text-slate-300">
            Draw and plan hockey or football tactical scenarios. Board data is kept locally for now.
          </Typography>
        </div>
        
        <BoardTypeSwitch />
      </div>

      <TacticsToolbar />
      <TacticsCanvas />
    </section>
  );
}
