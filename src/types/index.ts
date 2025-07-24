// Age calculation result interface
export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: {
    date: Date;
    daysUntil: number;
    dayOfWeek: string;
  };
}

// Date input interface
export interface DateInput {
  day: number;
  month: number;
  year: number;
}

// Component props interfaces
export interface DatePickerProps {
  value: DateInput;
  onChange: (date: DateInput) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export interface AgeDisplayProps {
  ageResult: AgeResult | null;
  loading?: boolean;
}

// Utility types
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
export type AgeUnit = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';

// Form validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isValid: boolean;
  errors: ValidationError[];
  touched: Record<string, boolean>;
}

// Event types
export type AgeCalculationEvent = {
  birthDate: Date;
  calculatedAt: Date;
  result: AgeResult;
};

export type ShareEvent = {
  type: 'social' | 'link' | 'download';
  platform?: string;
  data: AgeResult;
};

// BMI related types
export interface BMIResult {
  bmi: number;
  category: BMICategory;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  recommendations: string[];
}

export interface BMIInput {
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';
}

export type BMICategory =
  | 'underweight'
  | 'normal'
  | 'overweight'
  | 'obese_class_1'
  | 'obese_class_2'
  | 'obese_class_3';

export interface BMICategoryInfo {
  category: BMICategory;
  label: string;
  range: string;
  color: string;
  description: string;
  risks: string[];
  recommendations: string[];
}

// Health Tips types
export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: HealthTipCategory;
  icon: string;
  content: string[];
  benefits: string[];
}

export type HealthTipCategory =
  | 'nutrition'
  | 'exercise'
  | 'mental_health'
  | 'sleep'
  | 'hydration'
  | 'general';

// Diet Chart types
export interface DietPlan {
  id: string;
  name: string;
  bmiCategory: BMICategory;
  targetCalories: number;
  meals: Meal[];
  guidelines: string[];
  restrictions?: string[];
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  ingredients: string[];
  instructions: string[];
  nutritionInfo: NutritionInfo;
}

export interface NutritionInfo {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}
