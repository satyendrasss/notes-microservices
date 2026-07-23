import { Router } from "express";
import * as noteController from "../controllers/note.controller.js";
import { validateNote } from "../validators/note.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();


// router.get("/", (req, res) => {
//     res.json({
//         service: "Notes Service",
//         status: "Running"
//     });
// });


router.post("/", authMiddleware, validateNote, noteController.createNote);
router.get("/", authMiddleware, noteController.getAllNotes);
router.get("/:id", authMiddleware, noteController.getNote);
router.put("/:id", authMiddleware, validateNote, noteController.updateNote);
router.delete("/:id", authMiddleware, noteController.deleteNote);

router.patch("/:id/favorite", authMiddleware, noteController.toggleFavorite)
router.patch("/:id/archive", authMiddleware, noteController.toggleArchive)
router.patch("/:id/pin", authMiddleware, noteController.togglePin)




export default router;