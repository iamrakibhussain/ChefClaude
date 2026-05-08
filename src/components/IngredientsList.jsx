import ClaudeRecipe from "./ClaudeRecipe"

export default function IngredientsList({
    ingredients,
    getRecipe,
    recipeShown,
    recipe,
    isLoading,
    error
}) {
    const ingredientListItems = ingredients.map((ingredient, index) => {
        return <li key={`${ingredient}-${index}`}>{ingredient}</li>
    })

    return (
        ingredients.length > 0 && <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientListItems}</ul>
            {ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={getRecipe} type="button" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Get a recipe"}
                </button>
            </div>}
            {error && <p className="error-message" role="alert">{error}</p>}
            {recipeShown && <ClaudeRecipe recipe={recipe} />}
        </section>
    )
}
