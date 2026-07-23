import api from "../utils/axios";

const TagService = {
  async getAllTags() {
    const response = await api.get("/notes/tags");
    return response.data;
  },

  async createTag(data) {
    const response = await api.post("/notes/tags", data);
    return response.data;
  },

  async updateTag(id, data) {
    const response = await api.put(`/notes/tags/${id}`, data);
    return response.data;
  },

  async deleteTag(id) {
    const response = await api.delete(`/notes/tags/${id}`);
    return response.data;
  },
};

export default TagService;