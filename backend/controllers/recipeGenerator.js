import "../config/loadEnv.js"
import OpenAI from "openai"

const client = new OpenAI()

export async function recipeGenerator(prompt) {
    if (!prompt) {
        throw new Error("prompt is required")
    }

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are Chef Claude, a helpful cooking assistant."
            },
            {
                role: "user",
                content: prompt
            }
        ]
    })

    return response.choices?.[0]?.message?.content?.trim() ?? ""
}
