'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HealthTip, HealthTipCategory } from '@/types';
import { HEALTH_TIPS, getHealthTipsByCategory, getHealthTipCategories, getCategoryInfo, searchHealthTips } from '@/utils/healthTips';

export default function HealthTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<HealthTipCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());

  const categories = getHealthTipCategories();

  const getFilteredTips = (): HealthTip[] => {
    let tips = selectedCategory === 'all' ? HEALTH_TIPS : getHealthTipsByCategory(selectedCategory);
    
    if (searchQuery.trim()) {
      tips = searchHealthTips(searchQuery);
    }
    
    return tips;
  };

  const toggleTipExpansion = (tipId: string) => {
    const newExpanded = new Set(expandedTips);
    if (newExpanded.has(tipId)) {
      newExpanded.delete(tipId);
    } else {
      newExpanded.add(tipId);
    }
    setExpandedTips(newExpanded);
  };

  const filteredTips = getFilteredTips();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container">
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                Health Tips
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Expert health advice and wellness tips for a better lifestyle
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="health-tips__search mb-8">
              <input
                type="text"
                placeholder="Search health tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="health-tips__search-input"
              />
              <span className="health-tips__search-icon">🔍</span>
            </div>

            {/* Category Filter */}
            <div className="health-tips__categories">
              <button
                className={`health-tips__category-button ${selectedCategory === 'all' ? 'health-tips__category-button--active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                <span className="health-tips__category-icon">🌟</span>
                All Tips
              </button>
              
              {categories.map(category => {
                const categoryInfo = getCategoryInfo(category);
                return (
                  <button
                    key={category}
                    className={`health-tips__category-button ${selectedCategory === category ? 'health-tips__category-button--active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className="health-tips__category-icon">{categoryInfo.icon}</span>
                    {categoryInfo.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Health Tips Grid */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto">
            {filteredTips.length > 0 ? (
              <div className="health-tips__grid">
                {filteredTips.map((tip, index) => (
                  <div key={tip.id} className="health-tip-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="health-tip-card__header">
                      <span className="health-tip-card__icon">{tip.icon}</span>
                      <div className="health-tip-card__title-section">
                        <h3 className="health-tip-card__title">{tip.title}</h3>
                        <span className="health-tip-card__category">
                          {getCategoryInfo(tip.category).name}
                        </span>
                      </div>
                    </div>

                    <p className="health-tip-card__description">
                      {tip.description}
                    </p>

                    {expandedTips.has(tip.id) && (
                      <div className="health-tip-card__expanded">
                        <div className="health-tip-card__content">
                          <h4>How to implement:</h4>
                          <ul>
                            {tip.content.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="health-tip-card__benefits">
                          <h4>Benefits:</h4>
                          <ul>
                            {tip.benefits.map((benefit, idx) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <button
                      className="health-tip-card__toggle"
                      onClick={() => toggleTipExpansion(tip.id)}
                    >
                      {expandedTips.has(tip.id) ? 'Show Less' : 'Learn More'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="health-tips__empty">
                <div className="health-tips__empty-icon">🔍</div>
                <h3 className="health-tips__empty-title">No tips found</h3>
                <p className="health-tips__empty-description">
                  Try adjusting your search or selecting a different category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gradient mb-8">
              Explore More Health Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/bmi-calculator" className="health-tips__quick-link">
                <span className="health-tips__quick-link-icon">⚖️</span>
                <div>
                  <h3>BMI Calculator</h3>
                  <p>Check your Body Mass Index and health status</p>
                </div>
              </Link>
              
              <Link href="/diet-chart" className="health-tips__quick-link">
                <span className="health-tips__quick-link-icon">🥗</span>
                <div>
                  <h3>Diet Charts</h3>
                  <p>Get personalized diet plans based on your BMI</p>
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
              These tips are for general wellness. Always consult healthcare professionals for personalized advice.
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
