import { DietPlan, Meal, BMICategory } from '@/types';

export const DIET_PLANS: DietPlan[] = [
  // Underweight Diet Plan
  {
    id: 'underweight-plan',
    name: 'Weight Gain Diet Plan',
    bmiCategory: 'underweight',
    targetCalories: 2800,
    guidelines: [
      'Eat frequent, smaller meals (5-6 times per day)',
      'Include healthy fats and proteins in every meal',
      'Choose nutrient-dense, calorie-rich foods',
      'Stay hydrated but avoid drinking too much before meals',
      'Consider strength training to build muscle mass'
    ],
    restrictions: [
      'Avoid empty calories from junk food',
      'Limit excessive cardio exercise',
      'Don\'t skip meals'
    ],
    meals: [
      {
        type: 'breakfast',
        name: 'Protein-Rich Breakfast Bowl',
        calories: 650,
        ingredients: [
          '1 cup oatmeal with whole milk',
          '1 sliced banana',
          '2 tbsp almond butter',
          '1 tbsp honey',
          '1/4 cup mixed nuts'
        ],
        instructions: [
          'Cook oatmeal with whole milk',
          'Top with sliced banana and almond butter',
          'Drizzle with honey and sprinkle nuts'
        ],
        nutritionInfo: {
          protein: 25,
          carbs: 75,
          fat: 28,
          fiber: 12,
          sugar: 35
        }
      },
      {
        type: 'lunch',
        name: 'Quinoa Power Bowl',
        calories: 750,
        ingredients: [
          '1 cup cooked quinoa',
          '4 oz grilled chicken breast',
          '1/2 avocado',
          '1/4 cup chickpeas',
          '2 tbsp olive oil dressing',
          'Mixed vegetables'
        ],
        instructions: [
          'Cook quinoa according to package directions',
          'Grill chicken breast and slice',
          'Combine all ingredients in a bowl',
          'Drizzle with olive oil dressing'
        ],
        nutritionInfo: {
          protein: 45,
          carbs: 65,
          fat: 25,
          fiber: 15,
          sugar: 8
        }
      },
      {
        type: 'dinner',
        name: 'Salmon with Sweet Potato',
        calories: 800,
        ingredients: [
          '6 oz baked salmon',
          '1 large roasted sweet potato',
          '1 cup steamed broccoli',
          '2 tbsp butter',
          'Herbs and spices'
        ],
        instructions: [
          'Bake salmon at 400°F for 15-20 minutes',
          'Roast sweet potato until tender',
          'Steam broccoli until bright green',
          'Serve with butter and seasonings'
        ],
        nutritionInfo: {
          protein: 50,
          carbs: 45,
          fat: 35,
          fiber: 10,
          sugar: 15
        }
      },
      {
        type: 'snack',
        name: 'Trail Mix & Greek Yogurt',
        calories: 600,
        ingredients: [
          '1 cup Greek yogurt',
          '1/4 cup trail mix',
          '1 tbsp honey',
          '1 medium apple'
        ],
        instructions: [
          'Mix honey into Greek yogurt',
          'Top with trail mix',
          'Serve with sliced apple'
        ],
        nutritionInfo: {
          protein: 25,
          carbs: 45,
          fat: 20,
          fiber: 8,
          sugar: 40
        }
      }
    ]
  },

  // Normal Weight Diet Plan
  {
    id: 'normal-plan',
    name: 'Balanced Maintenance Diet',
    bmiCategory: 'normal',
    targetCalories: 2200,
    guidelines: [
      'Maintain current healthy eating patterns',
      'Include variety in your diet',
      'Stay active with regular exercise',
      'Practice portion control',
      'Stay hydrated throughout the day'
    ],
    meals: [
      {
        type: 'breakfast',
        name: 'Balanced Morning Meal',
        calories: 450,
        ingredients: [
          '2 whole grain toast slices',
          '2 scrambled eggs',
          '1/2 avocado',
          '1 cup mixed berries',
          '1 cup green tea'
        ],
        instructions: [
          'Toast whole grain bread',
          'Scramble eggs with minimal oil',
          'Mash avocado and spread on toast',
          'Serve with fresh berries'
        ],
        nutritionInfo: {
          protein: 20,
          carbs: 45,
          fat: 18,
          fiber: 12,
          sugar: 15
        }
      },
      {
        type: 'lunch',
        name: 'Mediterranean Salad',
        calories: 550,
        ingredients: [
          '2 cups mixed greens',
          '3 oz grilled chicken',
          '1/4 cup feta cheese',
          '10 olives',
          '1 tbsp olive oil',
          '1 small whole grain pita'
        ],
        instructions: [
          'Grill chicken and slice',
          'Combine greens, chicken, feta, and olives',
          'Drizzle with olive oil',
          'Serve with pita bread'
        ],
        nutritionInfo: {
          protein: 35,
          carbs: 30,
          fat: 22,
          fiber: 8,
          sugar: 6
        }
      },
      {
        type: 'dinner',
        name: 'Lean Protein with Vegetables',
        calories: 600,
        ingredients: [
          '4 oz lean beef or fish',
          '1 cup brown rice',
          '2 cups roasted vegetables',
          '1 tbsp olive oil',
          'Herbs and spices'
        ],
        instructions: [
          'Cook protein of choice',
          'Prepare brown rice',
          'Roast vegetables with olive oil',
          'Season with herbs and spices'
        ],
        nutritionInfo: {
          protein: 40,
          carbs: 50,
          fat: 15,
          fiber: 10,
          sugar: 12
        }
      },
      {
        type: 'snack',
        name: 'Healthy Snack Mix',
        calories: 300,
        ingredients: [
          '1 medium apple',
          '2 tbsp almond butter',
          '1 cup herbal tea'
        ],
        instructions: [
          'Slice apple',
          'Serve with almond butter for dipping',
          'Enjoy with herbal tea'
        ],
        nutritionInfo: {
          protein: 8,
          carbs: 25,
          fat: 16,
          fiber: 6,
          sugar: 20
        }
      }
    ]
  },

  // Overweight Diet Plan
  {
    id: 'overweight-plan',
    name: 'Weight Loss Diet Plan',
    bmiCategory: 'overweight',
    targetCalories: 1800,
    guidelines: [
      'Create a moderate calorie deficit',
      'Focus on whole, unprocessed foods',
      'Increase protein intake to preserve muscle',
      'Include plenty of vegetables and fiber',
      'Stay hydrated and limit sugary drinks'
    ],
    restrictions: [
      'Limit processed and packaged foods',
      'Reduce added sugars and refined carbs',
      'Control portion sizes',
      'Limit alcohol consumption'
    ],
    meals: [
      {
        type: 'breakfast',
        name: 'High-Protein Breakfast',
        calories: 350,
        ingredients: [
          '3 egg whites + 1 whole egg',
          '1 cup spinach',
          '1/4 cup low-fat cheese',
          '1 slice whole grain toast',
          '1/2 grapefruit'
        ],
        instructions: [
          'Sauté spinach until wilted',
          'Scramble eggs with spinach and cheese',
          'Serve with toast and grapefruit'
        ],
        nutritionInfo: {
          protein: 25,
          carbs: 30,
          fat: 12,
          fiber: 8,
          sugar: 15
        }
      },
      {
        type: 'lunch',
        name: 'Lean Protein Salad',
        calories: 450,
        ingredients: [
          '4 oz grilled chicken breast',
          '3 cups mixed greens',
          '1 cup cherry tomatoes',
          '1/2 cucumber',
          '2 tbsp balsamic vinaigrette'
        ],
        instructions: [
          'Grill chicken breast',
          'Combine all vegetables',
          'Top with sliced chicken',
          'Drizzle with vinaigrette'
        ],
        nutritionInfo: {
          protein: 35,
          carbs: 20,
          fat: 15,
          fiber: 8,
          sugar: 12
        }
      },
      {
        type: 'dinner',
        name: 'Fish with Vegetables',
        calories: 500,
        ingredients: [
          '5 oz baked white fish',
          '2 cups steamed broccoli',
          '1/2 cup quinoa',
          '1 tbsp olive oil',
          'Lemon and herbs'
        ],
        instructions: [
          'Bake fish with lemon and herbs',
          'Steam broccoli until tender',
          'Cook quinoa according to package',
          'Drizzle vegetables with olive oil'
        ],
        nutritionInfo: {
          protein: 40,
          carbs: 35,
          fat: 12,
          fiber: 12,
          sugar: 8
        }
      },
      {
        type: 'snack',
        name: 'Light Healthy Snack',
        calories: 200,
        ingredients: [
          '1 cup raw vegetables',
          '2 tbsp hummus',
          '1 small orange'
        ],
        instructions: [
          'Cut vegetables into sticks',
          'Serve with hummus for dipping',
          'Enjoy with fresh orange'
        ],
        nutritionInfo: {
          protein: 6,
          carbs: 25,
          fat: 6,
          fiber: 8,
          sugar: 18
        }
      }
    ]
  }
];

/**
 * Get diet plan by BMI category
 */
export function getDietPlanByBMI(bmiCategory: BMICategory): DietPlan | null {
  // For obesity classes, use the overweight plan as base
  if (bmiCategory.startsWith('obese')) {
    const plan = DIET_PLANS.find(plan => plan.bmiCategory === 'overweight');
    if (plan) {
      return {
        ...plan,
        name: 'Structured Weight Loss Plan',
        targetCalories: 1600, // Lower calories for obesity
        guidelines: [
          ...plan.guidelines,
          'Consider consulting with a nutritionist',
          'Monitor progress with healthcare provider'
        ]
      };
    }
  }
  
  return DIET_PLANS.find(plan => plan.bmiCategory === bmiCategory) || null;
}

/**
 * Calculate total daily nutrition from meals
 */
export function calculateDailyNutrition(meals: Meal[]) {
  return meals.reduce((total, meal) => ({
    calories: total.calories + meal.calories,
    protein: total.protein + meal.nutritionInfo.protein,
    carbs: total.carbs + meal.nutritionInfo.carbs,
    fat: total.fat + meal.nutritionInfo.fat,
    fiber: total.fiber + meal.nutritionInfo.fiber,
    sugar: total.sugar + meal.nutritionInfo.sugar
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  });
}

/**
 * Get meal by type from diet plan
 */
export function getMealsByType(dietPlan: DietPlan, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'): Meal[] {
  return dietPlan.meals.filter(meal => meal.type === mealType);
}
