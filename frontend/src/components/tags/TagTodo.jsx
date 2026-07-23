import * as Icons from "lucide-react";
import { useState } from "react";

import TagModal from "../modals/TagModal";
import useTags from "../../hooks/useTags";


export default function TagTodo() {

    const { tags, loading, createTag, updateTag, deleteTag, } = useTags();
    const [open, setOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);

    const handleSave = async (tagData) => {
        try {
            if (tagData.id) {
                // Update existing tag
                await updateTag(
                    tagData.id,
                    {
                        name: tagData.name,
                        icon: tagData.icon,
                    }
                );

            } else {
                // Create new tag
                await createTag({
                    name: tagData.name,
                    icon: tagData.icon,
                });
            }

            handleClose();

        } catch (error) {

            console.error(
                "Failed to save tag:",
                error
            );

        }
    };

    const handleCreate = () => {
        setSelectedTag(null);
        setOpen(true);
    };

    const handleEdit = (tag) => {
        setSelectedTag(tag);
        setOpen(true);
    };

    const handleDelete = async (id) => {

        try {
            await deleteTag(id);
        } catch (error) {
            console.error(
                "Failed to delete tag:",
                error
            );
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTag(null);
    };

    return (
        <>
            <div className="mb-4">

                {/* Header */}
                <div className=" flex items-center justify-between rounded-md px-2 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 ">

                    <div className="flex items-center gap-2">
                        <Icons.Tag size={16} />
                        <span className="text-sm font-medium">
                            Tags
                        </span>
                    </div>

                    <button
                        onClick={handleCreate}
                        className=" rounded p-1 hover:bg-zinc-300 dark:hover:bg-zinc-700 " >
                        <Icons.Plus size={15} />
                    </button>

                </div>



                {/* Tags list */}
                <div className=" mt-3 max-h-72 space-y-1 overflow-y-auto pr-1 ">
                    {loading && (
                        <div className="py-6 text-center text-sm text-zinc-500 ">
                            Loading tags...
                        </div>
                    )}

                    {!loading && tags?.map((tag) => {

                        const Icon = Icons[tag.icon] || Icons.Tag;

                        return (

                            <div
                                key={tag.id}
                                className=" group flex items-center justify-between rounded-md py-1 pl-5 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"  >

                                <div className=" flex items-center gap-2 ">
                                    <Icon size={16} />
                                    <span className="text-sm">
                                        {tag.name}
                                    </span>

                                </div>

                                <div className=" flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 ">

                                    <button
                                        onClick={() => handleEdit(tag) }
                                        className="roundedp-1 hover:bg-zinc-300 dark:hover:bg-zinc-700 " >
                                        <Icons.Pencil size={14} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(tag.id) }
                                        className=" rounded p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 " >
                                        <Icons.Trash2 size={14} />
                                    </button>
                                </div>

                            </div>
                        );

                    })}

                    {!loading && tags.length === 0 && (

                        <div className=" py-6 text-center text-sm text-zinc-500 ">
                            No tags created yet.
                        </div>
                    )}

                </div>

            </div>

            <TagModal
                open={open}
                tag={selectedTag}
                onClose={handleClose}
                onSave={handleSave}
            />

        </>
    );
}