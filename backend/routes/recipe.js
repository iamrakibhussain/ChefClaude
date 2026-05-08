import { Router } from "express"
import {
    handleGetRecipeRequest,
    handlePostRecipeRequest
} from "../controllers/recipeController.js"

const router = Router()

router.post("/", handlePostRecipeRequest)
router.get("/", handleGetRecipeRequest)

export default router
