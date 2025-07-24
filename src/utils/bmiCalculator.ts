import { BMIResult, BMIInput, BMICategory, BMICategoryInfo } from '@/types';

/**
 * BMI category information with ranges and recommendations
 */
export const BMI_CATEGORIES: Record<BMICategory, BMICategoryInfo> = {
  underweight: {
    category: 'underweight',
    label: 'Underweight',
    range: 'Below 18.5',
    color: '#3b82f6',
    description: 'You may be underweight. Consider consulting with a healthcare provider.',
    risks: [
      'Weakened immune system',
      'Osteoporosis risk',
      'Anemia',
      'Irregular menstrual periods'
    ],
    recommendations: [
      'Increase caloric intake with nutrient-dense foods',
      'Include healthy fats and proteins',
      'Consider strength training',
      'Consult with a nutritionist'
    ]
  },
  normal: {
    category: 'normal',
    label: 'Normal Weight',
    range: '18.5 - 24.9',
    color: '#10b981',
    description: 'You have a healthy weight. Keep up the good work!',
    risks: [],
    recommendations: [
      'Maintain current healthy lifestyle',
      'Continue regular exercise',
      'Eat a balanced diet',
      'Stay hydrated'
    ]
  },
  overweight: {
    category: 'overweight',
    label: 'Overweight',
    range: '25.0 - 29.9',
    color: '#f59e0b',
    description: 'You may be overweight. Consider lifestyle changes for better health.',
    risks: [
      'Increased risk of heart disease',
      'Type 2 diabetes risk',
      'High blood pressure',
      'Sleep apnea'
    ],
    recommendations: [
      'Reduce caloric intake by 500-750 calories per day',
      'Increase physical activity',
      'Focus on whole foods',
      'Consider portion control'
    ]
  },
  obese_class_1: {
    category: 'obese_class_1',
    label: 'Obesity Class I',
    range: '30.0 - 34.9',
    color: '#ef4444',
    description: 'You are in the obesity range. Consider consulting with a healthcare provider.',
    risks: [
      'High risk of heart disease',
      'Type 2 diabetes',
      'High blood pressure',
      'Stroke risk',
      'Sleep apnea'
    ],
    recommendations: [
      'Consult with healthcare provider',
      'Create a structured weight loss plan',
      'Consider professional nutrition counseling',
      'Increase physical activity gradually'
    ]
  },
  obese_class_2: {
    category: 'obese_class_2',
    label: 'Obesity Class II',
    range: '35.0 - 39.9',
    color: '#dc2626',
    description: 'You are in the severe obesity range. Medical consultation is recommended.',
    risks: [
      'Very high risk of heart disease',
      'Type 2 diabetes',
      'High blood pressure',
      'Stroke',
      'Sleep apnea',
      'Certain cancers'
    ],
    recommendations: [
      'Immediate medical consultation recommended',
      'Consider medically supervised weight loss',
      'Comprehensive lifestyle intervention',
      'Regular health monitoring'
    ]
  },
  obese_class_3: {
    category: 'obese_class_3',
    label: 'Obesity Class III',
    range: '40.0 and above',
    color: '#991b1b',
    description: 'You are in the extreme obesity range. Immediate medical attention is recommended.',
    risks: [
      'Extremely high risk of heart disease',
      'Type 2 diabetes',
      'High blood pressure',
      'Stroke',
      'Sleep apnea',
      'Certain cancers',
      'Reduced life expectancy'
    ],
    recommendations: [
      'Immediate medical consultation required',
      'Consider bariatric surgery evaluation',
      'Comprehensive medical weight management',
      'Regular specialist monitoring'
    ]
  }
};

/**
 * Calculate BMI from weight and height
 */
export function calculateBMI(input: BMIInput): BMIResult {
  let { weight, height } = input;
  const { unit } = input;

  // Convert to metric if imperial
  if (unit === 'imperial') {
    // Convert pounds to kg and inches to meters
    weight = weight * 0.453592;
    height = height * 0.0254;
  } else {
    // Convert cm to meters if needed
    if (height > 3) {
      height = height / 100;
    }
  }

  // Calculate BMI
  const bmi = weight / (height * height);

  // Determine category
  const category = getBMICategory(bmi);

  // Calculate healthy weight range
  const healthyWeightRange = getHealthyWeightRange(height, unit);

  // Get recommendations
  const categoryInfo = BMI_CATEGORIES[category];
  const recommendations = categoryInfo.recommendations;

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    healthyWeightRange,
    recommendations
  };
}

/**
 * Determine BMI category based on BMI value
 */
export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  if (bmi < 35) return 'obese_class_1';
  if (bmi < 40) return 'obese_class_2';
  return 'obese_class_3';
}

/**
 * Calculate healthy weight range for given height
 */
export function getHealthyWeightRange(height: number, unit: 'metric' | 'imperial'): { min: number; max: number } {
  // Ensure height is in meters
  let heightInMeters = height;
  if (unit === 'imperial') {
    heightInMeters = height * 0.0254;
  } else if (height > 3) {
    heightInMeters = height / 100;
  }

  const minWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxWeight = 24.9 * (heightInMeters * heightInMeters);

  if (unit === 'imperial') {
    return {
      min: Math.round(minWeight * 2.20462),
      max: Math.round(maxWeight * 2.20462)
    };
  }

  return {
    min: Math.round(minWeight),
    max: Math.round(maxWeight)
  };
}

/**
 * Validate BMI input
 */
export function validateBMIInput(input: BMIInput): { isValid: boolean; error?: string } {
  const { weight, height, unit } = input;

  if (!weight || weight <= 0) {
    return { isValid: false, error: 'Please enter a valid weight' };
  }

  if (!height || height <= 0) {
    return { isValid: false, error: 'Please enter a valid height' };
  }

  // Check reasonable ranges
  if (unit === 'metric') {
    if (weight < 20 || weight > 300) {
      return { isValid: false, error: 'Weight should be between 20-300 kg' };
    }
    if (height < 100 || height > 250) {
      return { isValid: false, error: 'Height should be between 100-250 cm' };
    }
  } else {
    if (weight < 44 || weight > 660) {
      return { isValid: false, error: 'Weight should be between 44-660 lbs' };
    }
    if (height < 39 || height > 98) {
      return { isValid: false, error: 'Height should be between 39-98 inches' };
    }
  }

  return { isValid: true };
}

/**
 * Get BMI category information
 */
export function getBMICategoryInfo(category: BMICategory): BMICategoryInfo {
  return BMI_CATEGORIES[category];
}

/**
 * Convert weight between units
 */
export function convertWeight(weight: number, from: 'kg' | 'lbs', to: 'kg' | 'lbs'): number {
  if (from === to) return weight;
  
  if (from === 'kg' && to === 'lbs') {
    return Math.round(weight * 2.20462 * 10) / 10;
  }
  
  if (from === 'lbs' && to === 'kg') {
    return Math.round(weight * 0.453592 * 10) / 10;
  }
  
  return weight;
}

/**
 * Convert height between units
 */
export function convertHeight(height: number, from: 'cm' | 'inches', to: 'cm' | 'inches'): number {
  if (from === to) return height;
  
  if (from === 'cm' && to === 'inches') {
    return Math.round(height * 0.393701 * 10) / 10;
  }
  
  if (from === 'inches' && to === 'cm') {
    return Math.round(height * 2.54 * 10) / 10;
  }
  
  return height;
}
