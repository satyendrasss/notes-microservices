import { useEffect, useMemo, useRef, useState } from "react";
import * as Icons from "lucide-react";
import TagBadge from "./TagBadge";

export default function TagSelector({ selectedTags = [], allTags = [], onChange, }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const ref = useRef(null);

  /**
   * Close dropdown outside click
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  /**
   * Available tags
   */
  const filteredTags = useMemo(() => {

    const keyword = search.toLowerCase().trim();

    return allTags
      .filter(
        (tag) =>
          !selectedTags.some(
            (selected) =>
              selected.id === tag.id
          )
      )
      .filter((tag) =>
        keyword
          ? tag.name
            .toLowerCase()
            .includes(keyword)
          : true
      );

  }, [allTags, selectedTags, search,]);


  const addTag = (tag) => {

    if (selectedTags.some((item) => item.id === tag.id)) {
      return;
    }

    onChange([...selectedTags, tag,]);
    setSearch("");
    setOpen(false);
  };

  const removeTag = (tagId) => {
    onChange(selectedTags.filter((tag) => tag.id !== tagId));
  };


  return (
    <div ref={ref} className="relative">

      {/* Selected Tags */}
      <div className="flex flex-wrap items-center gap-2 ">

        {selectedTags.map((tag) => (
          <TagBadge
            key={tag.id}
            tag={tag}
            removable
            onRemove={() => removeTag(tag.id)}
          />
        ))}


        <button
          type="button"
          onClick={() =>
            setOpen((prev) => !prev)
          }
          className="inline-flex items-center gap-1 rounded-md border border-dashed border-zinc-300 px-2 py-1 text-xs text-zinc-500 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400">
          <Icons.Plus size={12} />
          Add Tag
        </button>

      </div>

      {/* Dropdown */}
      {open && (

        <div className=" absolute left-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 ">

          {/* Search */}
          <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800 ">

            <Icons.Search size={14} className="text-zinc-400" />

            <input
              autoFocus
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tags..."
              className=" w-full bg-transparent text-sm outline-none "
            />

          </div>

          {/* List */}
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredTags.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-zinc-500">
                No tags found
              </p>
            ) : (
              filteredTags.map((tag) => {
                const Icon = Icons[tag.icon] || Icons.Tag;

                return (
                  <button
                    type="button"
                    key={tag.id}
                    onClick={() => addTag(tag)}
                    className="w-full px-3 py-2 text-left text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Icon size={14} className="inline mr-2 text-zinc-400" />
                    <span>{tag.name}</span>
                  </button>
                );
              })
            )}
          </div>

        </div>

      )}

    </div>
  );
}