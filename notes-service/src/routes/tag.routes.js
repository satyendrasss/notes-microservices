import { Router } from "express";
import * as tagController from "../controllers/tag.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", tagController.createTag);
router.put("/:id", tagController.updateTag);

router.get("/", tagController.getTags);

export default router;