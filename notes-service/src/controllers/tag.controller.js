import * as tagService from "../services/tag.service.js";

export const createTag = async (req, res, next) => {
  try {
    const tag = await tagService.createTag(
      req.user.id,
      req.body.name,
      req.body.icon
    );

    res.status(201).json({
      success: true,
      message: "Tag created successfully",
      data: tag,
    });
  } catch (error) {
    next(error);
  }
};


export const updateTag = async (req, res, next) => {
  try {
    const tag = await tagService.update(
      req.params.id,
      req.user.userId,
      req.body
    );

    res.json({
      success: true,
      message: "Tag updated successfully",
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

export const getTags = async (req, res, next) => {
  try {
    const tags = await tagService.getTags(req.user.id);

    res.json({
      success: true,
      message: "Tags fetched successfully",
      icon_reference: "https://lucide.dev/icons",
      data: tags,
    });
  } catch (error) {
    next(error);
  }
};