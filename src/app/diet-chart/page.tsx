'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BMICategory } from '@/types';
import { getDietPlanByBMI, calculateDailyNutrition } from '@/utils/dietPlans';
import { getBMICategoryInfo } from '@/utils/bmiCalculator';
import { generateDietPlanPDF } from '@/utils/pdfGenerator';

export default function DietChartPage() {
  const [selectedBMI, setSelectedBMI] = useState<BMICategory>('normal');
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const bmiCategories: BMICategory[] = ['underweight', 'normal', 'overweight', 'obese_class_1'];
  const dietPlan = getDietPlanByBMI(selectedBMI);
  const dailyNutrition = dietPlan ? calculateDailyNutrition(dietPlan.meals) : null;

  const handleDownloadPDF = () => {
    if (!dietPlan) return;

    try {
      generateDietPlanPDF(dietPlan);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const getMealIcon = (mealType: string) => {
    const icons = {
      breakfast: '🌅',
      lunch: '☀️',
      dinner: '🌙',
      snack: '🍎'
    };
    return icons[mealType as keyof typeof icons] || '🍽️';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container">
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                Diet Charts
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get personalized diet plans based on your BMI and health goals
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* BMI Category Selection */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Select Your BMI Category
            </h2>
            
            <div className="diet-chart__bmi-selector">
              {bmiCategories.map(category => {
                const categoryInfo = getBMICategoryInfo(category);
                return (
                  <button
                    key={category}
                    className={`diet-chart__bmi-button ${selectedBMI === category ? 'diet-chart__bmi-button--active' : ''}`}
                    onClick={() => setSelectedBMI(category)}
                    style={{ 
                      borderColor: selectedBMI === category ? categoryInfo.color : undefined,
                      backgroundColor: selectedBMI === category ? `${categoryInfo.color}15` : undefined
                    }}
                  >
                    <div className="diet-chart__bmi-label">{categoryInfo.label}</div>
                    <div className="diet-chart__bmi-range">{categoryInfo.range}</div>
                  </button>
                );
              })}
            </div>

            <div className="text-center mt-6">
              <Link 
                href="/bmi-calculator" 
                className="text-primary-color hover:text-primary-dark transition-colors font-medium"
              >
                Don&apos;t know your BMI? Calculate it here →
              </Link>
            </div>
          </div>
        </section>

        {/* Diet Plan Display */}
        {dietPlan && (
          <section className="mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="diet-plan">
                <div className="diet-plan__header">
                  <h2 className="diet-plan__title">{dietPlan.name}</h2>
                  <p className="diet-plan__target">Target: {dietPlan.targetCalories} calories/day</p>
                  
                  <button
                    className="diet-plan__download-btn"
                    onClick={handleDownloadPDF}
                  >
                    📄 Download PDF
                  </button>
                </div>

                {/* Daily Nutrition Summary */}
                {dailyNutrition && (
                  <div className="diet-plan__nutrition-summary">
                    <h3>Daily Nutrition Summary</h3>
                    <div className="nutrition-grid">
                      <div className="nutrition-item">
                        <span className="nutrition-value">{dailyNutrition.calories}</span>
                        <span className="nutrition-label">Calories</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-value">{dailyNutrition.protein}g</span>
                        <span className="nutrition-label">Protein</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-value">{dailyNutrition.carbs}g</span>
                        <span className="nutrition-label">Carbs</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-value">{dailyNutrition.fat}g</span>
                        <span className="nutrition-label">Fat</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-value">{dailyNutrition.fiber}g</span>
                        <span className="nutrition-label">Fiber</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Guidelines */}
                <div className="diet-plan__guidelines">
                  <h3>Guidelines</h3>
                  <ul>
                    {dietPlan.guidelines.map((guideline, index) => (
                      <li key={index}>{guideline}</li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions */}
                {dietPlan.restrictions && dietPlan.restrictions.length > 0 && (
                  <div className="diet-plan__restrictions">
                    <h3>Important Restrictions</h3>
                    <ul>
                      {dietPlan.restrictions.map((restriction, index) => (
                        <li key={index}>{restriction}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Meal Plans */}
                <div className="diet-plan__meals">
                  <h3>Daily Meal Plan</h3>
                  <div className="meals-grid">
                    {dietPlan.meals.map((meal, index) => (
                      <div 
                        key={index} 
                        className={`meal-card ${selectedMeal === meal.name ? 'meal-card--expanded' : ''}`}
                        onClick={() => setSelectedMeal(selectedMeal === meal.name ? null : meal.name)}
                      >
                        <div className="meal-card__header">
                          <span className="meal-card__icon">{getMealIcon(meal.type)}</span>
                          <div className="meal-card__info">
                            <h4 className="meal-card__name">{meal.name}</h4>
                            <p className="meal-card__type">{meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}</p>
                            <p className="meal-card__calories">{meal.calories} calories</p>
                          </div>
                        </div>

                        {selectedMeal === meal.name && (
                          <div className="meal-card__details">
                            <div className="meal-card__ingredients">
                              <h5>Ingredients:</h5>
                              <ul>
                                {meal.ingredients.map((ingredient, idx) => (
                                  <li key={idx}>{ingredient}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="meal-card__instructions">
                              <h5>Instructions:</h5>
                              <ol>
                                {meal.instructions.map((instruction, idx) => (
                                  <li key={idx}>{instruction}</li>
                                ))}
                              </ol>
                            </div>

                            <div className="meal-card__nutrition">
                              <h5>Nutrition Info:</h5>
                              <div className="nutrition-mini-grid">
                                <span>Protein: {meal.nutritionInfo.protein}g</span>
                                <span>Carbs: {meal.nutritionInfo.carbs}g</span>
                                <span>Fat: {meal.nutritionInfo.fat}g</span>
                                <span>Fiber: {meal.nutritionInfo.fiber}g</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quick Links Section */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gradient mb-8">
              Related Health Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/bmi-calculator" className="diet-chart__quick-link">
                <span className="diet-chart__quick-link-icon">⚖️</span>
                <div>
                  <h3>BMI Calculator</h3>
                  <p>Calculate your BMI to get the right diet plan</p>
                </div>
              </Link>
              
              <Link href="/health-tips" className="diet-chart__quick-link">
                <span className="diet-chart__quick-link-icon">💡</span>
                <div>
                  <h3>Health Tips</h3>
                  <p>Discover expert health and wellness advice</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              These diet plans are for general guidance. Consult with a nutritionist for personalized advice.
            </p>
            <p className="text-gray-600 text-sm">
              © 2024 Age Calculator. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Developed by <span className="font-semibold text-primary-color">Md. Farhan Sadik</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
