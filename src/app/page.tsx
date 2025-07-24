'use client';

import React from 'react';
import { useAgeCalculator } from '@/hooks/useAgeCalculator';
import DatePicker from '@/components/DatePicker';
import AgeDisplay from '@/components/AgeDisplay';
import ShareButton from '@/components/ShareButton';

export default function Home() {
  const {
    birthDate,
    setBirthDate,
    ageResult,
    loading,
    error
  } = useAgeCalculator();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4 px-4">
            Age Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your exact age in years, months, days, hours, minutes, and seconds.
            Get personalized BMI analysis, custom diet plans, and expert health tips.
          </p>
        </div>
        {/* Date Input Section */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <DatePicker
              value={birthDate}
              onChange={setBirthDate}
              label="Enter Your Birth Date"
              error={error || undefined}
            />


          </div>
        </section>

        {/* Results Section */}
        {(ageResult || loading) && (
          <section className="mb-12">
            <AgeDisplay ageResult={ageResult} loading={loading} />

            {ageResult && (
              <div className="flex justify-center mt-8">
                <ShareButton ageResult={ageResult} />
              </div>
            )}
          </section>
        )}

        {/* What's Next Section - Always visible */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              What&apos;s Next?
            </h2>
          </div>

          <div className="whats-next-card">
            <a href="/bmi-calculator" className="whats-next-card__button">
              <span className="whats-next-card__icon">⚖️</span>
              <span className="whats-next-card__text">Check BMI</span>
            </a>

            <a href="/health-tips" className="whats-next-card__button">
              <span className="whats-next-card__icon">💡</span>
              <span className="whats-next-card__text">Health Tips</span>
            </a>

            <a href="/diet-chart" className="whats-next-card__button">
              <span className="whats-next-card__icon">🥗</span>
              <span className="whats-next-card__text">Diet Chart</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2025 Age Calculator. All rights reserved.
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
