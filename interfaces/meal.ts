export interface Meal {
    title: string;
    description: string;
    category: MealCategory;
    ingredients: Ingredient[];
    calories: number;
    proteins: number;
    fat: number;
    carbs: number;
}

export interface Ingredient {
    title: string;
    amount: string;
    measure: string;
}

export type MealCategory = 'Breakfast' | 'Morning snack' | 'Lunch' | 'Afternoon snack' | 'Dinner'
