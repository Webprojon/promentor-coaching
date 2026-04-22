import type { Control, UseFormRegister } from "react-hook-form";
import type { SuggestionComposerFormValues } from "@/pages/suggestion/model/schema/suggestion-composer";

export type SuggestionPriority = "High" | "Medium" | "Low";

export type SuggestionComposerProps = {
  register: UseFormRegister<SuggestionComposerFormValues>;
  control: Control<SuggestionComposerFormValues>;
  priorities: SuggestionPriority[];
  canSend: boolean;
  sendLabel: string;
  isSending: boolean;
  isEditing: boolean;
  onSend: () => void;
  onCancelEdit: () => void;
};

export type SuggestionHistoryItemVm = {
  id: string;
  title: string;
  detail: string;
  priority: SuggestionPriority;
  targetLabel: string;
};

export type SuggestionHistoryProps = {
  items: SuggestionHistoryItemVm[];
  editingId: string | null;
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDeletingId: string | null;
};
