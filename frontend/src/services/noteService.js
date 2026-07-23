import api from "../utils/axios";

const NoteService = {
    getAllNotes: async () => {
        const response = await api.get("/notes");
        return response.data;
    },

    addNote: async (data) => {
        const response = await api.post("/notes", data);
        return response.data;
    },

    updateNote: async (id, data) => {
        console.log(`/notes/${id}`)
        const response = await api.put(`/notes/${id}`, data);
        return response.data;
    }

}

export default NoteService;