// frontend/src/components/new-entry/Tags.tsx
import { ErrorMessage } from "./ErrorMessage";

interface TagsProps {
    tags: string[];
    tagInput: string;
    onTagInputChange: (value: string) => void;
    onTagsChange: (next: string[]) => void;
    addTag: () => void;
    tagError?: string;
}

export function Tags({tags, tagInput, onTagInputChange, onTagsChange, addTag, tagError}: TagsProps) {
    const MAX_TAGS = 4
    return (
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <p className="text-xs font-semibold text-white">Tags</p>
            <p className="text-xs tabular-nums shrink-0" style={{ color: "var(--app-text-muted)" }}>
                {tags.length}/{MAX_TAGS}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "rgba(99,102,241,0.12)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.2)" }}>
                #{tag}
                <button type="button" onClick={() => onTagsChange(tags.filter((t) => t !== tag))} className="opacity-60 hover:opacity-100">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => onTagInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                }}}
              placeholder="Add a tag..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-[var(--app-text-muted)] focus:outline-none transition-all"
              style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "var(--app-border)")}
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
              style={{ background: "rgba(99,102,241,0.15)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.2)" }}>
              Add
            </button>
          </div>
          <div className="mt-2">
          {tagError && <ErrorMessage message={tagError} />}
          </div>
        </div>
    )
}