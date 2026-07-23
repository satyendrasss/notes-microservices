import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import { formatFullDateTime } from "../utils/dateUtils";

export default function NoteActionMenu({
  note,
  onPin,
  onArchive,
  onTrash,
  onFavorite,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const actions = [
    {
      label: note.isFavorite ? "Remove Favorite" : "Add Favorite",
      icon: Icons.Star,
      onClick: () => onFavorite(note),
    },
    {
      label: note.isPinned ? "Unpin" : "Pin",
      icon: note.isPinned ? Icons.PinOff : Icons.Pin,
      onClick: () => onPin(note),
    },
    {
      label: note.isArchived ? "Unarchive" : "Archive",
      icon: note.isArchived ? Icons.ArchiveRestore : Icons.Archive,
      onClick: () => onArchive(note),
    },
    {
      label: note.deletedAt ? "Restore" : "Move to Trash",
      icon: note.deletedAt ? Icons.RotateCcw : Icons.Trash2,
      onClick: () => onTrash(note),
      danger: true,
    },
  ];

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="
          group inline-flex h-9 w-9 items-center justify-center
          rounded-full
          text-zinc-500 dark:text-zinc-400
          transition-all duration-200
          hover:bg-zinc-100 hover:text-zinc-700
          dark:hover:bg-zinc-800 dark:hover:text-white
          active:scale-95
          focus:outline-none
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          dark:focus:ring-offset-zinc-900
        "
      >
        <Icons.MoreHorizontal
          size={18}
          className="transition-transform duration-200 group-hover:scale-110"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="
            absolute right-0 top-11 z-50
            w-72 overflow-hidden
            rounded-2xl
            border border-zinc-200/80
            bg-white
            shadow-2xl
            ring-1 ring-black/5
            animate-in fade-in zoom-in-95 duration-150
            dark:border-zinc-700
            dark:bg-zinc-900
            dark:ring-white/10
          "
        >
          {/* Header */}
          <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Note Actions
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              Manage this note
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-1 p-2">
            {actions.map((item) => {
              const Icon = item.icon;

              const favorite =
                item.icon === Icons.Star && note.isFavorite;

              return (
                <button
                  key={item.label}
                  role="menuitem"
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  className={`
                    group flex w-full items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-sm font-medium
                    transition-all duration-150

                    ${
                      item.danger
                        ? `
                          text-red-600
                          hover:bg-red-50
                          dark:text-red-400
                          dark:hover:bg-red-500/10
                        `
                        : `
                          text-zinc-700
                          hover:bg-zinc-100
                          dark:text-zinc-200
                          dark:hover:bg-zinc-800
                        `
                    }
                  `}
                >
                  <Icon
                    size={17}
                    className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      favorite ? "text-yellow-500" : ""
                    }`}
                    fill={favorite ? "currentColor" : "none"}
                  />

                  <span className="flex-1 text-left">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-2 border-t border-zinc-200 dark:border-zinc-700" />

          {/* Metadata */}
          <div className="grid grid-cols-[70px_1fr] gap-y-2 bg-zinc-50 px-4 py-3 text-xs dark:bg-zinc-900/60">
            <span className="text-zinc-500">ID</span>
            <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">
              {note.id}
            </span>

            <span className="text-zinc-500">Created</span>
            <span className="text-right text-zinc-700 dark:text-zinc-300">
              {formatFullDateTime(note.createdAt)}
            </span>

            <span className="text-zinc-500">Modified</span>
            <span className="text-right text-zinc-700 dark:text-zinc-300">
              {formatFullDateTime(note.updatedAt)}
            </span>

            {note.deletedAt && (
              <>
                <span className="text-zinc-500">Deleted</span>
                <span className="text-right text-red-500">
                  {formatFullDateTime(note.deletedAt)}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
