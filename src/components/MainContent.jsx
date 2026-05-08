import { useState } from "react"
import IngredientsList from "./IngredientsList"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

export function MainContent() {

    // Ingredients the user has added so far.
    const [ingredients, setIngredients] = useState([])
    // Controls whether the recipe section is visible.
    const [recipeShown, setRecipeShown] = useState(false)
    // Stores the generated recipe returned by the backend.
    const [recipe, setRecipe] = useState("")
    // Tracks whether the recipe is currently being fetched.
    const [isLoading, setIsLoading] = useState(false)
    // Stores any error message from the backend request.
    const [error, setError] = useState("")

    // Reads the submitted form data and stores a new ingredient.
    function handleSubmit(formData) {
        const newIngredient = String(formData.get("ingredient") ?? "").trim()

        if (!newIngredient) {
            setError("Please enter an ingredient.")
            return
        }

        addIngredient(newIngredient)
    }

    // Adds one item to the existing ingredient list.
    function addIngredient(newIngredient) {
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        setError("")
        setRecipe("")
        setRecipeShown(false)
    }

    // Sends the current ingredients to the backend.
    async function sendDataBackend() {
        const response = await fetch(`${API_BASE_URL}/api/recipe`, {
            method: "POST",
            body: JSON.stringify({
                ingredients: ingredients
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Failed to generate recipe")
        }

        return data
    }

    // Button click e backend call hoy, tarpor recipe section dekhano hoy.
    async function getRecipe() {
        try {
            setIsLoading(true)
            setError("")

            const data = await sendDataBackend()

            setRecipe(data.recipe)
            setRecipeShown(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.")
            setRecipeShown(false)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <main className="main-content">
            <form className="add-ingredient-form" action={handleSubmit}>
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>
            <IngredientsList
                ingredients={ingredients}
                getRecipe={getRecipe}
                recipeShown={recipeShown}
                recipe={recipe}
                isLoading={isLoading}
                error={error}
            />

        </main>
    )
}
