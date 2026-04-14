import {
  BoardAssignForm,
  BoardTypeSwitch,
  TacticsCanvas,
  TacticsToolbar,
} from "@/pages/boards/ui/components";
import { PageHeader } from "@/shared/ui";

export default function BoardsPage() {
  return (
    <section className="space-y-5">
      <PageHeader
        title="Tactical Boards"
        description="Draw and plan hockey or football tactical scenarios. Board data is kept locally for now."
        actions={<BoardTypeSwitch />}
      />
      <TacticsToolbar />
      <TacticsCanvas />

      <BoardAssignForm />
    </section>
  );
}
