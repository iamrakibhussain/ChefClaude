import { buildRecipePrompt } from "../services/recipeService.js"
import { recipeGenerator } from "./recipeGenerator.js"

function parseIngredients(input) {
    if (Array.isArray(input)) {
        return input.flatMap(item => String(item).split(",")).map(item => item.trim()).filter(Boolean)
    }

    if (typeof input === "string") {
        return input.split(",").map(item => item.trim()).filter(Boolean)
    }
    return []
}

async function generateRecipeResponse(req, res, rawIngredients, examplePath) {
    try {
        // Clean and normalize the incoming ingredients value.
        const ingredients = parseIngredients(rawIngredients)

        // Stop early if the user did not send any valid ingredients.
        if (ingredients.length === 0) {
            return res.status(400).json({
                message: "ingredients array is required",
                example: examplePath
            })
        }

        // Turn ingredients into a prompt for the AI.
        const prompt = buildRecipePrompt(ingredients)

        // Ask the generator to create the actual recipe text.
        const recipe = await recipeGenerator(prompt)

        // Send the successful response back to the frontend.
        return res.json({
            message: "successful",
            prompt,
            recipe,
            ingredients
        })
    } catch (error) {
        // Send a clear server error if anything fails.
        return res.status(500).json({
            message: "Failed to generate recipe",
            error: error.message
        })
    }
}

export async function handlePostRecipeRequest(req, res) {
    const ingredientsFromBody = req.body?.ingredients
    const examplePath = "/api/recipe"

    return generateRecipeResponse(
        req,
        res,
        ingredientsFromBody,
        examplePath
    )
}

export async function handleGetRecipeRequest(req, res) {
    const ingredientsFromQuery = req.query?.ingredients
    const examplePath = "/api/recipe?ingredients=tomato,pasta,garlic"

    return generateRecipeResponse(
        req,
        res,
        ingredientsFromQuery,
        examplePath
    )
}
