import { describe, expect, it } from "vitest";
import type { RequestSuggestionCardViewModel } from "@/pages/requests/model/types";
import { mergeReceivedRequestCards } from "@/pages/requests/model/lib/merge-received-sorted";

function cardStub(id: string): RequestSuggestionCardViewModel {
  return { id } as RequestSuggestionCardViewModel;
}

describe("mergeReceivedRequestCards", () => {
  it("merges and sorts by createdAt descending (newest first)", () => {
    const a = {
      createdAt: "2024-01-01T00:00:00.000Z",
      card: cardStub("old"),
    };
    const b = {
      createdAt: "2024-06-01T00:00:00.000Z",
      card: cardStub("new"),
    };
    const c = {
      createdAt: "2024-03-01T00:00:00.000Z",
      card: cardStub("mid"),
    };
    const result = mergeReceivedRequestCards([a], [b], [c]);
    expect(result.map((r) => r.id)).toEqual(["new", "mid", "old"]);
  });
});
