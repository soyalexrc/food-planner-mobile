import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {FOOD_TYPES} from "@/constants/enums";


export const client = createClient({
    projectId: 'quejp5kb',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2024-01-26', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: any) {
    return builder.image(source)
}

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getMeals(foodType: FOOD_TYPES) {
    return await client.fetch(` *[_type == "meal" && category == $foodType]`, { foodType })
}
