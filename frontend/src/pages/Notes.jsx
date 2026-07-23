import { useState } from "react";
import Sidebar from "../components/Sidebar";
import NotesList from "../components/NotesList";
import Editor from "../components/Editor";
import useNotes from "../hooks/useNotes";
import useTags from "../hooks/useTags";

export default function Notes() {

    const [currentSection, setCurrentSection] = useState("Notes");
    const { notes, selectedNote, setSelectedNote, createNote, updateNote, updateSelectedNote } = useNotes();
    const { tags, loading } = useTags();

    return (
        <div className="flex h-screen overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white"> 

            <Sidebar
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
            />

            <div className=" w-80 border-l border-zinc-200 dark:border-zinc-800">
                
                <NotesList
                    notes={notes}
                    currentSection={currentSection}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    addNewNote={createNote}
                />

            </div>


            <div className=" flex-1 border-l border-zinc-200 dark:border-zinc-800 ">

                <Editor
                    note={selectedNote}
                    onChange={updateSelectedNote}
                    onSave={updateNote}
                    availableTags={tags}
                />

            </div>

        </div>
    );
}