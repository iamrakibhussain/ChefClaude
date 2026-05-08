

export function buildRecipePrompt(ingredients) {
    const cleanedIngredients = ingredients.map(item => String(item).trim()).filter(Boolean)

    return `
You are a helpful chef assistant.

Task: Create 1 simple recipe using the given ingredients.

Rules:
- Use as many ingredients as possible
- Keep it very simple and beginner friendly
- Give step-by-step instructions

Ingredients:
${cleanedIngredients.join(", ")}

Output format:
Title
Ingredients list
Steps
`
}

