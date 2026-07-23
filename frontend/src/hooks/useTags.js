import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TagService from "../services/tagService.js";

export default function useTags() {
  const { user } = useAuth();

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch all tags
   */
  const fetchTags = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const response = await TagService.getAllTags();
      setTags(response.data ?? []);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  /**
   * Create tag
   */
  const createTag = async (payload) => {
    try {
      const response = await TagService.createTag(payload);

      setTags((prev) => [...prev, response.data]);

      return response.data;
    } catch (error) {
      console.error("Create tag failed:", error);
      throw error;
    }
  };

  /**
   * Update tag
   */
  const updateTag = async (id, payload) => {
    try {
      const response = await TagService.updateTag(id, payload);

      setTags((prev) =>
        prev.map((tag) =>
          tag.id === response.data.id ? response.data : tag
        )
      );

      return response.data;
    } catch (error) {
      console.error("Update tag failed:", error);
      throw error;
    }
  };

  /**
   * Delete tag
   */
  const deleteTag = async (id) => {
    try {
      await TagService.deleteTag(id);

      setTags((prev) =>
        prev.filter((tag) => tag.id !== id)
      );
    } catch (error) {
      console.error("Delete tag failed:", error);
      throw error;
    }
  };

  /**
   * Refresh
   */
  const refreshTags = async () => {
    await fetchTags();
  };

  return {
    loading,

    tags,
    setTags,

    createTag,
    updateTag,
    deleteTag,

    refreshTags,
  };
}