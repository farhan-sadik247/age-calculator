'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BMIInput, BMIResult } from '@/types';
import { calculateBMI, validateBMIInput, getBMICategoryInfo } from '@/utils/bmiCalculator';
import { generateBMIReportPDF } from '@/utils/pdfGenerator';

export default function BMICalculatorPage() {
  const [bmiInput, setBmiInput] = useState<BMIInput>({
    weight: 0,
    height: 0,
    unit: 'metric'
  });
  
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof BMIInput, value: number | string) => {
    setBmiInput(prev => ({
      ...prev,
      [field]: field === 'unit' ? value : Number(value)
    }));
    setError('');
  };

  const handleCalculate = () => {
    const validation = validateBMIInput(bmiInput);
    
    if (!validation.isValid) {
      setError(validation.error || 'Invalid input');
      setBmiResult(null);
      return;
    }

    setLoading(true);
    setError('');

    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        const result = calculateBMI(bmiInput);
        setBmiResult(result);
      } catch (error) {
        console.error('BMI calculation error:', error);
        setError('Error calculating BMI. Please try again.');
        setBmiResult(null);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleReset = () => {
    setBmiInput({
      weight: 0,
      height: 0,
      unit: 'metric'
    });
    setBmiResult(null);
    setError('');
  };

  const categoryInfo = bmiResult ? getBMICategoryInfo(bmiResult.category) : null;

  const handleDownloadPDF = () => {
    if (!bmiResult || !categoryInfo) return;

    try {
      generateBMIReportPDF({
        bmi: bmiResult.bmi,
        category: categoryInfo.label,
        healthyWeightRange: bmiResult.healthyWeightRange,
        recommendations: bmiResult.recommendations,
        weight: bmiInput.weight,
        height: bmiInput.height,
        unit: bmiInput.unit
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container">
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                BMI Calculator
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Calculate your Body Mass Index and understand your health status
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* BMI Input Section */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="bmi-calculator">
              <div className="bmi-calculator__header">
                <h2 className="bmi-calculator__title">Enter Your Details</h2>
              </div>

              {/* Unit Toggle */}
              <div className="bmi-calculator__unit-toggle">
                <button
                  className={`bmi-calculator__unit-button ${bmiInput.unit === 'metric' ? 'bmi-calculator__unit-button--active' : ''}`}
                  onClick={() => handleInputChange('unit', 'metric')}
                >
                  Metric (kg/cm)
                </button>
                <button
                  className={`bmi-calculator__unit-button ${bmiInput.unit === 'imperial' ? 'bmi-calculator__unit-button--active' : ''}`}
                  onClick={() => handleInputChange('unit', 'imperial')}
                >
                  Imperial (lbs/inches)
                </button>
              </div>

              {/* Input Fields */}
              <div className="bmi-calculator__inputs">
                <div className="bmi-calculator__field">
                  <label className="bmi-calculator__label">
                    Weight ({bmiInput.unit === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input
                    type="number"
                    className="bmi-calculator__input"
                    value={bmiInput.weight || ''}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder={`Enter weight in ${bmiInput.unit === 'metric' ? 'kg' : 'lbs'}`}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="bmi-calculator__field">
                  <label className="bmi-calculator__label">
                    Height ({bmiInput.unit === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <input
                    type="number"
                    className="bmi-calculator__input"
                    value={bmiInput.height || ''}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder={`Enter height in ${bmiInput.unit === 'metric' ? 'cm' : 'inches'}`}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bmi-calculator__error">
                  <span className="bmi-calculator__error-icon">⚠️</span>
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="bmi-calculator__actions">
                <button
                  className="bmi-calculator__button bmi-calculator__button--primary"
                  onClick={handleCalculate}
                  disabled={loading}
                >
                  {loading ? 'Calculating...' : 'Calculate BMI'}
                </button>
                <button
                  className="bmi-calculator__button bmi-calculator__button--secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BMI Result Section */}
        {bmiResult && categoryInfo && (
          <section className="mb-12">
            <div className="bmi-result animate-fade-in">
              <div className="bmi-result__header">
                <h2 className="bmi-result__title">Your BMI Result</h2>
              </div>

              <div className="bmi-result__main">
                <div className="bmi-result__score" style={{ borderColor: categoryInfo.color }}>
                  <span className="bmi-result__number">{bmiResult.bmi}</span>
                  <span className="bmi-result__label">BMI</span>
                </div>
                
                <div className="bmi-result__category" style={{ backgroundColor: categoryInfo.color }}>
                  {categoryInfo.label}
                </div>
                
                <p className="bmi-result__description">
                  {categoryInfo.description}
                </p>
              </div>

              <div className="bmi-result__details">
                <div className="bmi-result__healthy-range">
                  <h3>Healthy Weight Range</h3>
                  <p>
                    {bmiResult.healthyWeightRange.min} - {bmiResult.healthyWeightRange.max} {bmiInput.unit === 'metric' ? 'kg' : 'lbs'}
                  </p>
                </div>

                {categoryInfo.recommendations.length > 0 && (
                  <div className="bmi-result__recommendations">
                    <h3>Recommendations</h3>
                    <ul>
                      {categoryInfo.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {categoryInfo.risks.length > 0 && (
                  <div className="bmi-result__risks">
                    <h3>Health Considerations</h3>
                    <ul>
                      {categoryInfo.risks.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bmi-result__actions">
                <button
                  onClick={handleDownloadPDF}
                  className="bmi-result__download-btn"
                >
                  📄 Download Report
                </button>
                <Link href="/diet-chart" className="bmi-result__link">
                  Get Personalized Diet Plan →
                </Link>
                <Link href="/health-tips" className="bmi-result__link">
                  View Health Tips →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              BMI is a screening tool and not a diagnostic tool. Consult with healthcare professionals for personalized advice.
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
