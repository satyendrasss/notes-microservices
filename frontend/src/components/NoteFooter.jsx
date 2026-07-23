import * as Icons from "lucide-react";
import { getContentSize } from "../utils/calculateSize";
import { formatFullDateTime } from "../utils/dateUtils";

export default function NoteFooter({ note }) {
  if (!note) return null;

  const characterCount = note.content.length;

  const wordCount = note.content.trim()
    ? note.content.trim().split(/\s+/).length
    : 0;

  return (
    <footer className="flex h-11 items-center justify-between border-t border-zinc-200 bg-white px-4 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-5 overflow-hidden">
        <div className="flex items-center gap-1.5">
          <Icons.Hash size={14} />
          <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">
            {note.id}
          </span>
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          <Icons.CalendarPlus size={14} />
          <span>{formatFullDateTime(note.createdAt)}</span>
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          <Icons.History size={14} />
          <span>{formatFullDateTime(note.updatedAt)}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Icons.FileText size={14} />
          <span>{wordCount} words</span>
        </div>

        <div className="flex items-center gap-1">
          <Icons.Type size={14} />
          <span>{characterCount} chars</span>
        </div>

        <div className="hidden items-center gap-1 xl:flex">
          <Icons.Database size={14} />
          <span>{getContentSize(note.content)}</span>
        </div>
      </div>
    </footer>
  );
}
