import { useCallback, useEffect, useState } from "react";
import { formatFullDateTime } from "../utils/dateUtils";
import { useAuth } from "../context/AuthContext";
import NoteService from "../services/noteService";

export default function useNotes() {
  const { user } = useAuth();

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch all notes
   */
  const fetchNotes = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const response = await NoteService.getAllNotes();

      // If your service returns data directly:
      // setNotes(response);

      setNotes(response.data ?? []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  /**
   * Create new note
   */
  const createNote = async () => {
    try {
      const payload = {
        title: formatFullDateTime(Date.now()),
        content: "Start Writing...",
      };

      const response = await NoteService.addNote(payload);
      const newNote = response.data;
      setNotes((prev) => [newNote, ...prev]);
      setSelectedNote(newNote);
      return newNote;
    } catch (error) {
      console.error("Create note failed:", error);
      throw error;
    }
  };

  /**
   * Local update only.
   * Called on every keystroke.
   */
  const updateSelectedNote = (updatedNote) => {
    setSelectedNote(updatedNote);

    setNotes((prev) =>
      prev.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  };

  /**
   * Save note to API.
   * Called after debounce (2 seconds).
   */
  const updateNote = async (updatedNote) => {
    console.log('updatedNote', updatedNote)
    try {
      const payload = {
        title: updatedNote.title,
        content: updatedNote.content,
        tagIds: updatedNote.tags?.map((tag) => tag.tagId) || [],
        isFavorite: updatedNote.isFavorite || false,
        isArchived: updatedNote.isArchived || false,
        isPinned: updatedNote.isPinned || false,
        deletedAt: updatedNote.deletedAt || null
      };

      const response = await NoteService.updateNote(
        updatedNote.id,
        payload
      );

      const savedNote = response.data;

      setNotes((prev) =>
        prev.map((note) =>
          note.id === savedNote.id ? savedNote : note
        )
      );

      setSelectedNote(savedNote);

      return savedNote;
    } catch (error) {
      console.error("Update note failed:", error);
      throw error;
    }
  };

  /**
   * Delete note
   */
  const deleteNote = async (id) => {
    try {
      await NoteService.deleteNote(id);

      setNotes((prev) =>
        prev.filter((note) => note.id !== id)
      );

      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error("Delete note failed:", error);
      throw error;
    }
  };

  /**
   * Refresh notes
   */
  const refreshNotes = async () => {
    await fetchNotes();
  };

  return {
    loading,

    notes,
    setNotes,

    selectedNote,
    setSelectedNote,

    createNote,

    updateSelectedNote, // Local state only

    updateNote, // API call

    deleteNote,

    refreshNotes,
  };
}