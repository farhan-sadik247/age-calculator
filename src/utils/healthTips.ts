import { HealthTip, HealthTipCategory } from '@/types';

export const HEALTH_TIPS: HealthTip[] = [
  // Nutrition Tips
  {
    id: 'nutrition-1',
    title: 'Eat a Rainbow of Vegetables',
    description: 'Include colorful vegetables in your daily diet for optimal nutrition',
    category: 'nutrition',
    icon: '🥗',
    content: [
      'Aim for at least 5 servings of fruits and vegetables daily',
      'Different colors provide different nutrients and antioxidants',
      'Include leafy greens, orange vegetables, and purple produce',
      'Fresh, frozen, and canned (without added sugar/salt) all count'
    ],
    benefits: [
      'Reduced risk of chronic diseases',
      'Better immune system function',
      'Improved digestion and gut health',
      'Natural source of vitamins and minerals'
    ]
  },
  {
    id: 'nutrition-2',
    title: 'Stay Hydrated',
    description: 'Proper hydration is essential for optimal body function',
    category: 'hydration',
    icon: '💧',
    content: [
      'Drink at least 8 glasses (64 oz) of water daily',
      'Increase intake during exercise or hot weather',
      'Monitor urine color - pale yellow indicates good hydration',
      'Include water-rich foods like cucumbers and watermelon'
    ],
    benefits: [
      'Better energy levels and mental clarity',
      'Improved skin health',
      'Better kidney function',
      'Helps maintain healthy weight'
    ]
  },
  {
    id: 'nutrition-3',
    title: 'Choose Whole Grains',
    description: 'Replace refined grains with nutrient-rich whole grains',
    category: 'nutrition',
    icon: '🌾',
    content: [
      'Choose brown rice over white rice',
      'Opt for whole wheat bread and pasta',
      'Try quinoa, oats, and barley',
      'Read labels - look for "whole grain" as first ingredient'
    ],
    benefits: [
      'Better blood sugar control',
      'Increased fiber intake',
      'Longer-lasting energy',
      'Reduced risk of heart disease'
    ]
  },

  // Exercise Tips
  {
    id: 'exercise-1',
    title: 'Get Moving Daily',
    description: 'Aim for at least 30 minutes of physical activity every day',
    category: 'exercise',
    icon: '🏃‍♂️',
    content: [
      'Start with 10-minute walks if you\'re a beginner',
      'Take stairs instead of elevators',
      'Park farther away to add extra steps',
      'Try dancing, gardening, or playing with pets'
    ],
    benefits: [
      'Improved cardiovascular health',
      'Better mood and mental health',
      'Stronger bones and muscles',
      'Better sleep quality'
    ]
  },
  {
    id: 'exercise-2',
    title: 'Strength Training',
    description: 'Include resistance exercises 2-3 times per week',
    category: 'exercise',
    icon: '💪',
    content: [
      'Use bodyweight exercises like push-ups and squats',
      'Try resistance bands or free weights',
      'Focus on major muscle groups',
      'Allow rest days between strength sessions'
    ],
    benefits: [
      'Increased muscle mass and bone density',
      'Better metabolism',
      'Improved functional strength',
      'Reduced risk of injury'
    ]
  },

  // Sleep Tips
  {
    id: 'sleep-1',
    title: 'Prioritize Quality Sleep',
    description: 'Aim for 7-9 hours of quality sleep each night',
    category: 'sleep',
    icon: '😴',
    content: [
      'Maintain a consistent sleep schedule',
      'Create a relaxing bedtime routine',
      'Keep bedroom cool, dark, and quiet',
      'Avoid screens 1 hour before bedtime'
    ],
    benefits: [
      'Better immune system function',
      'Improved memory and concentration',
      'Better emotional regulation',
      'Reduced risk of chronic diseases'
    ]
  },
  {
    id: 'sleep-2',
    title: 'Create a Sleep-Friendly Environment',
    description: 'Optimize your bedroom for better sleep quality',
    category: 'sleep',
    icon: '🛏️',
    content: [
      'Invest in a comfortable mattress and pillows',
      'Use blackout curtains or eye masks',
      'Keep temperature between 60-67°F (15-19°C)',
      'Remove electronic devices from bedroom'
    ],
    benefits: [
      'Faster sleep onset',
      'Deeper, more restorative sleep',
      'Fewer sleep disruptions',
      'Better morning alertness'
    ]
  },

  // Mental Health Tips
  {
    id: 'mental-1',
    title: 'Practice Mindfulness',
    description: 'Incorporate mindfulness and meditation into your daily routine',
    category: 'mental_health',
    icon: '🧘‍♀️',
    content: [
      'Start with 5-10 minutes of daily meditation',
      'Practice deep breathing exercises',
      'Try mindful eating and walking',
      'Use meditation apps for guidance'
    ],
    benefits: [
      'Reduced stress and anxiety',
      'Better emotional regulation',
      'Improved focus and concentration',
      'Enhanced self-awareness'
    ]
  },
  {
    id: 'mental-2',
    title: 'Stay Connected',
    description: 'Maintain strong social connections for mental well-being',
    category: 'mental_health',
    icon: '👥',
    content: [
      'Schedule regular time with friends and family',
      'Join clubs or groups with shared interests',
      'Volunteer in your community',
      'Reach out when you need support'
    ],
    benefits: [
      'Reduced feelings of loneliness',
      'Better stress management',
      'Increased sense of purpose',
      'Improved overall life satisfaction'
    ]
  },

  // General Health Tips
  {
    id: 'general-1',
    title: 'Regular Health Check-ups',
    description: 'Stay on top of preventive healthcare',
    category: 'general',
    icon: '🩺',
    content: [
      'Schedule annual physical exams',
      'Keep up with recommended screenings',
      'Monitor blood pressure and cholesterol',
      'Stay current with vaccinations'
    ],
    benefits: [
      'Early detection of health issues',
      'Better management of chronic conditions',
      'Peace of mind',
      'Longer, healthier life'
    ]
  },
  {
    id: 'general-2',
    title: 'Limit Processed Foods',
    description: 'Reduce consumption of highly processed and packaged foods',
    category: 'nutrition',
    icon: '🚫',
    content: [
      'Cook more meals at home',
      'Read nutrition labels carefully',
      'Choose fresh ingredients when possible',
      'Limit foods high in added sugars and sodium'
    ],
    benefits: [
      'Better nutrient intake',
      'Improved weight management',
      'Reduced risk of chronic diseases',
      'Better energy levels'
    ]
  }
];

/**
 * Get health tips by category
 */
export function getHealthTipsByCategory(category: HealthTipCategory): HealthTip[] {
  return HEALTH_TIPS.filter(tip => tip.category === category);
}

/**
 * Get all health tip categories
 */
export function getHealthTipCategories(): HealthTipCategory[] {
  return ['nutrition', 'exercise', 'mental_health', 'sleep', 'hydration', 'general'];
}

/**
 * Get category display information
 */
export function getCategoryInfo(category: HealthTipCategory): { name: string; icon: string; description: string } {
  const categoryMap = {
    nutrition: {
      name: 'Nutrition',
      icon: '🥗',
      description: 'Tips for healthy eating and nutrition'
    },
    exercise: {
      name: 'Exercise',
      icon: '🏃‍♂️',
      description: 'Physical activity and fitness guidance'
    },
    mental_health: {
      name: 'Mental Health',
      icon: '🧘‍♀️',
      description: 'Mental wellness and stress management'
    },
    sleep: {
      name: 'Sleep',
      icon: '😴',
      description: 'Better sleep habits and quality rest'
    },
    hydration: {
      name: 'Hydration',
      icon: '💧',
      description: 'Proper hydration and fluid intake'
    },
    general: {
      name: 'General Health',
      icon: '🩺',
      description: 'Overall health and wellness tips'
    }
  };

  return categoryMap[category];
}

/**
 * Search health tips by keyword
 */
export function searchHealthTips(query: string): HealthTip[] {
  const lowercaseQuery = query.toLowerCase();
  return HEALTH_TIPS.filter(tip =>
    tip.title.toLowerCase().includes(lowercaseQuery) ||
    tip.description.toLowerCase().includes(lowercaseQuery) ||
    tip.content.some(content => content.toLowerCase().includes(lowercaseQuery))
  );
}
