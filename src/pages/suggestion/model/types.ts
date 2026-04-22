export type SuggestionPriority = "High" | "Medium" | "Low";

export type SuggestionComposerFields = {
  title: string;
  detail: string;
  priority: SuggestionPriority;
};

export type SuggestionComposerProps = {
  fields: SuggestionComposerFields;
  priorities: SuggestionPriority[];
  canSend: boolean;
  sendLabel: string;
  isSending: boolean;
  isEditing: boolean;
  onFieldChange: (
    field: keyof SuggestionComposerFields,
    value: string,
  ) => void;
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
