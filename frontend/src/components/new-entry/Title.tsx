// frontend/src/components/new-entry/Title.tsx
"use client"

interface TitleProps {
    title: string;
    onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}
export function Title({title, onChange}: TitleProps) {
    return (
        <div>
          <input
            value={title}
            name="title"
            onChange={onChange}
            placeholder="Entry title..."
            className="w-full bg-transparent text-xl font-bold text-white placeholder-[#2A354D] focus:outline-none"
            style={{ fontFamily: "Outfit, sans-serif" }}
          />
          <p className="text-xs mt-1" style={{ color: "#4B5B73" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          </p>
        </div>
    )
}