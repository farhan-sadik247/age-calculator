'use client';

import React from 'react';
import { AgeDisplayProps } from '@/types';
import { formatAgeResult } from '@/utils/ageCalculator';

const AgeDisplay: React.FC<AgeDisplayProps> = ({ ageResult, loading = false }) => {
  if (loading) {
    return (
      <div className="age-display age-display--loading">
        <div className="age-display__spinner"></div>
        <p className="age-display__loading-text">Calculating your age...</p>
      </div>
    );
  }

  if (!ageResult) {
    return null;
  }

  const {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthday
  } = ageResult;

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const getValueClass = (num: number): string => {
    const numStr = num.toString();
    return numStr.length > 6 ? 'age-display__total-value large-number' : 'age-display__total-value';
  };

  return (
    <div className="age-display animate-fade-in">
      {/* Main Age Display */}
      <div className="age-display__main">
        <h2 className="age-display__title">Your Age</h2>
        <div className="age-display__primary">
          <span className="age-display__primary-text">
            {formatAgeResult(ageResult)}
          </span>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="age-display__breakdown">
        <div className="age-display__breakdown-grid">
          <div className="age-display__stat">
            <div className="age-display__stat-value">{years}</div>
            <div className="age-display__stat-label">Year{years !== 1 ? 's' : ''}</div>
          </div>
          <div className="age-display__stat">
            <div className="age-display__stat-value">{months}</div>
            <div className="age-display__stat-label">Month{months !== 1 ? 's' : ''}</div>
          </div>
          <div className="age-display__stat">
            <div className="age-display__stat-value">{days}</div>
            <div className="age-display__stat-label">Day{days !== 1 ? 's' : ''}</div>
          </div>
        </div>
      </div>

      {/* Total Time Units */}
      <div className="age-display__totals">
        <h3 className="age-display__totals-title">Total Time Lived</h3>
        <div className="age-display__totals-grid">
          <div className="age-display__total-item">
            <span className={getValueClass(totalDays)}>{formatNumber(totalDays)}</span>
            <span className="age-display__total-label">Days</span>
          </div>
          <div className="age-display__total-item">
            <span className={getValueClass(totalWeeks)}>{formatNumber(totalWeeks)}</span>
            <span className="age-display__total-label">Weeks</span>
          </div>
          <div className="age-display__total-item">
            <span className={getValueClass(totalMonths)}>{formatNumber(totalMonths)}</span>
            <span className="age-display__total-label">Months</span>
          </div>
          <div className="age-display__total-item">
            <span className={getValueClass(totalHours)}>{formatNumber(totalHours)}</span>
            <span className="age-display__total-label">Hours</span>
          </div>
          <div className="age-display__total-item">
            <span className={getValueClass(totalMinutes)}>{formatNumber(totalMinutes)}</span>
            <span className="age-display__total-label">Minutes</span>
          </div>
          <div className="age-display__total-item">
            <span className={getValueClass(totalSeconds)}>{formatNumber(totalSeconds)}</span>
            <span className="age-display__total-label">Seconds</span>
          </div>
        </div>
      </div>

      {/* Next Birthday */}
      <div className="age-display__next-birthday">
        <h3 className="age-display__next-birthday-title">Next Birthday</h3>
        <div className="age-display__next-birthday-content">
          <div className="age-display__next-birthday-date">
            {nextBirthday.date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="age-display__next-birthday-countdown">
            <span className="age-display__countdown-number">{nextBirthday.daysUntil}</span>
            <span className="age-display__countdown-label">
              day{nextBirthday.daysUntil !== 1 ? 's' : ''} to go!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeDisplay;
