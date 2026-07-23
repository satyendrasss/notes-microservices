import { useEffect, useRef, useState } from "react";
import { Check,  RefreshCw, } from "lucide-react";
import NoteFooter from "./NoteFooter";
import NoteActionMenu from "./NoteActionMenu";
import TagSelector from "./tags/TagSelector";

export default function Editor({note, onChange, onSave, availableTags = [],}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [saving, setSaving] = useState(false);

  const initialized = useRef(false);
  const saveTimer = useRef(null);


  /**
   * Load note data
   */
  useEffect(() => {
    if (!note) {
      setTitle("");
      setContent("");
      setTags([]);
      return;
    }

    setTitle(note.title ?? "");
    setContent(note.content ?? "");
    setTags(note.tags?.map((item) => item.tag) ?? []);

    initialized.current = false;

  }, [note?.id]);


  /**
   * Local update + debounce API save
   */
  useEffect(() => {

    if (!note) return;

    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    const updatedNote = {
      ...note,
      title,
      content,
      tags,
      tagIds: tags.map(tag => tag.id),
    };

    console.log('updatedNote',updatedNote);
    // Update UI instantly
    onChange(updatedNote);

    // Cancel previous save
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    setSaving(true);

    saveTimer.current = setTimeout(async () => {

      try {
        await onSave(updatedNote);
      } finally {
        setSaving(false);
      }

    }, 2000);

    return () => { clearTimeout(saveTimer.current);};
  }, [ title, content, tags,]);



  /**
   * Pin note
   */
  const handlePin = () => {

    if (!note) return;
    const updated = {...note, isPinned: !note.isPinned,};
    onChange(updated);
    onSave(updated);
  };

  /**  Favorite */
  const handleFavorite = () => {

    if (!note) return; 
    const updated = { ...note, isFavorite: !note.isFavorite, };
    onChange(updated);
    onSave(updated);
  };

  /** Archive */
  const handleArchive = () => {

    if (!note) return;
    const updated = { ...note, isArchived: !note.isArchived};
    console.log('updated',updated)
    onChange(updated);
    onSave(updated);
  };

  /** Trash  */
  const handleTrash = () => {

    if (!note) return;
    const updated = { ...note, deletedAt: new Date() };
    onChange(updated);
    onSave(updated);
  };

  return (
    <div className=" flex h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white ">

      {/* Header */}
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">

        <div className="flex items-center justify-between gap-4">

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Untitled"
            className="flex-1 bg-transparent text-3xl font-bold outline-none placeholder:text-zinc-400"
          />

          <div className="flex items-center gap-3">

            {saving ? (
              <RefreshCw size={18} className="animate-spin text-blue-500" />
            ) : (
              <Check size={18} className="text-green-500" />
            )}

            {note && (
              <NoteActionMenu
                note={note}
                onPin={handlePin}
                onFavorite={handleFavorite}
                onArchive={handleArchive}
                onTrash={handleTrash}
              />
            )}

          </div>

        </div>

        <div className="mt-4">

          <TagSelector
            selectedTags={tags}
            allTags={availableTags}
            onChange={setTags}
          />

        </div>

      </div>

      {/* Content */}
      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Start writing..."
        className="flex-1 resize-none bg-transparent p-6 leading-7 outline-none placeholder:text-zinc-400"
      />

      <NoteFooter note={note} />

    </div>
  );
}