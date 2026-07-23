import { useDeferredValue, useMemo, useState } from "react";
import { formatFullDateTime } from "../utils/dateUtils";
import TagBadge from "./tags/TagBadge";
import { Archive, Pin, Plus, Star, Trash2 } from "lucide-react";

export default function NotesList({ notes = [], currentSection, selectedNote, setSelectedNote, addNewNote }) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filteredNotes = useMemo(() => {

    let result = [...notes];

    switch (currentSection) {
      case "Pinned":
        result = result.filter(
          note => note.isPinned && !note.deletedAt
        );
        break;
      case "Favorites":
        result = result.filter(note => note.isFavorite);
        break;

      case "Archive":
        result = result.filter(note => note.isArchived);
        break;

      case "Trash":
        result = result.filter(note => note.deletedAt !== null);
        break;

      case "Files":
        result = result.filter(note => note.folder === "Files");
        break;

      case "Tags":
        result = result.filter(note => (note.tags ?? []).length > 0);
        break;

      default:
        result = result.filter(note => !note.isArchived && !note.deletedAt);
    }

    if (deferredSearch.trim()) {

      const query = deferredSearch.toLowerCase();
      result =
        result.filter(note => {
          const title = note.title?.toLowerCase() ?? "";
          const content = note.content?.toLowerCase() ?? "";
          return (
            title.includes(query) ||
            content.includes(query)
          );
        });
    }

    result.sort((a, b) => {
      if (a.isPinned === b.isPinned) return 0;
      return a.isPinned ? -1 : 1;
    });

    return result;

    // newest first

    // return result.sort(
    //   (a, b) =>
    //     new Date(b.updatedAt || b.createdAt)
    //     -
    //     new Date(a.updatedAt || a.createdAt)
    // );

  }, [
    notes,
    currentSection,
    deferredSearch
  ]);


  return (
    <div className="flex h-full flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">

      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 p-3 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">

        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {currentSection}
            </h2>

            <p className="text-xs text-zinc-500">
              {filteredNotes.length} note{filteredNotes.length !== 1 && "s"}
            </p>
          </div>

          
          <button
            onClick={addNewNote}
            type="button"
            aria-label="Add new note"
            title="Add new note"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950          ">
            <Plus size={20} strokeWidth={2.5} />
          </button>

        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${currentSection.toLowerCase()}...`}
          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-900"
        />
      </div>

      {/* Notes */}
      <div className="flex-1 overflow-y-auto">

        {filteredNotes.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No notes found.
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`cursor-pointer border-b border-zinc-200 px-3 py-3 transition dark:border-zinc-800 ${selectedNote?.id === note.id
                ? "border-l-4 border-l-blue-600 bg-blue-100 dark:bg-zinc-800"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold">
                  {note.title || "Untitled"}
                </h3>

                <div className="flex items-center gap-1">
                  {note.isPinned && (
                    <Pin size={14} className="text-blue-500 " fill="currentColor" />
                  )}

                  {note.isFavorite && (
                    <Star
                      size={14}
                      className="text-orange-500"
                      fill="currentColor"
                    />
                  )}

                  {note.isArchived && (
                    <Archive
                      size={14}
                      className="text-zinc-500"
                    />
                  )}

                  {note.deletedAt && (
                    <Trash2
                      size={14}
                      className="text-red-500"
                    />
                  )}
                </div>
              </div>

              <p className="mt-1 line-clamp-1 text-sm text-zinc-900 dark:text-zinc-300">
                {note.content}
              </p>
              <small className="text-xs text-zinc-600 dark:text-zinc-400">{formatFullDateTime(note.createdAt)}</small>
              {note.deletedAt &&
                <>
                  <br />
                  <small className="text-xs text-red-600 dark:text-red-400">{formatFullDateTime(note.deletedAt)}</small>
                </>
              }


              {note?.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {note.tags.map((item) => {
                    const tag = item.tag ?? item;
                    return (
                      <TagBadge
                        key={tag.id}
                        tag={tag}
                      />
                    );
                  })}

                </div>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
}