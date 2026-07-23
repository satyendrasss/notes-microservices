import * as noteService from "../services/note.service.js";

export const createNote = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const note = await noteService.create(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const notes = await noteService.findAll(userId);
    return res.status(200).json({
        success: true,
        message: "Notes retrieved successfully",
        data: notes
    });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const note = await noteService.findById(req.params.id, req.user.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.json({
      success: true,
      message: "Note retrieved successfully",
      data: note
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await noteService.update(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    next(error);
  }
};


export const toggleFavorite = async (req, res, next) => {
  try {
    const note = await noteService.toggleFavorite(req.params.id, req.user.id);

    res.json({
      success: true,
      message: "Favorite status updated successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleArchive = async (req, res, next) => {
  try{
    const note = await noteService.toggleArchive(req.params.id, req.user.id);
    res.json({
      success: true,
      message:"Archive status changed successfully.",
      data: note
    })
  }catch(error){
    next(error);
  }
}

export const togglePin = async (req, res, next) => {
  try{
    const note = await noteService.togglePin(req.params.id, req.user.id);
    res.json({
      success: true,
      message:"Pinned status changed successfully.",
      data: note
    })
  }catch(error){
    next(error);
  }
}



// soft delete
export const deleteNote = async (req, res, next) => {
  try {
    await noteService.softDelete(req.params.id, req.user.id);

    res.json({
        success: true,
        message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


// Permanent delete
export const deleteNotePermanent = async (req, res, next) => {
  try {
    await noteService.remove(req.params.id, req.user.id);

    res.json({
        success: true,
        message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};