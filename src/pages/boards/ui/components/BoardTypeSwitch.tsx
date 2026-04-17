import { Button } from "@promentorapp/ui-kit";
import { BOARD_VARIANTS } from "@/pages/boards/model/constants";
import { useBoardsTactics } from "@/pages/boards/model/useBoardsTactics";

export function BoardTypeSwitch() {
  const boardType = useBoardsTactics((state) => state.boardType);
  const setBoardType = useBoardsTactics((state) => state.setBoardType);

  return (
    <div className="flex gap-2 rounded-lg border border-white/10 bg-slate-900/70 p-1">
      {BOARD_VARIANTS.map((variant) => (
        <Button
          key={variant.value}
          type="button"
          onClick={() => setBoardType(variant.value)}
          className={`rounded-lg ${
            boardType === variant.value
              ? `bg-white/10 ${variant.accentClassName}`
              : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {variant.label}
        </Button>
      ))}
    </div>
  );
}
