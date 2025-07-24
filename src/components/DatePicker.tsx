'use client';

import React, { useState, useEffect } from 'react';
import { DateInput, DatePickerProps } from '@/types';
import { validateDateInput } from '@/utils/ageCalculator';

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label = 'Birth Date',
  error,
  disabled = false
}) => {
  const [localValue, setLocalValue] = useState<DateInput>(value);
  const [validationError, setValidationError] = useState<string>('');

  // Generate options for dropdowns
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  // Get days in selected month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInSelectedMonth = getDaysInMonth(localValue.month, localValue.year);
  const availableDays = days.slice(0, daysInSelectedMonth);

  // Handle input changes
  const handleChange = (field: keyof DateInput, newValue: number) => {
    const updatedValue = { ...localValue, [field]: newValue };
    
    // Adjust day if it's invalid for the selected month
    if (field === 'month' || field === 'year') {
      const maxDays = getDaysInMonth(updatedValue.month, updatedValue.year);
      if (updatedValue.day > maxDays) {
        updatedValue.day = maxDays;
      }
    }
    
    setLocalValue(updatedValue);
    
    // Validate the date
    const validation = validateDateInput(updatedValue);
    if (validation.isValid) {
      setValidationError('');
      onChange(updatedValue);
    } else {
      setValidationError(validation.error || '');
    }
  };

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const displayError = error || validationError;

  return (
    <div className="date-picker">
      <label className="date-picker__label">
        {label}
      </label>
      
      <div className="date-picker__inputs">
        {/* Day Dropdown */}
        <div className="date-picker__field">
          <label className="date-picker__field-label">Day</label>
          <select
            value={localValue.day}
            onChange={(e) => handleChange('day', parseInt(e.target.value))}
            disabled={disabled}
            className={`date-picker__select ${displayError ? 'date-picker__select--error' : ''}`}
          >
            {availableDays.map(day => (
              <option key={day} value={day}>
                {day.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>

        {/* Month Dropdown */}
        <div className="date-picker__field">
          <label className="date-picker__field-label">Month</label>
          <select
            value={localValue.month}
            onChange={(e) => handleChange('month', parseInt(e.target.value))}
            disabled={disabled}
            className={`date-picker__select ${displayError ? 'date-picker__select--error' : ''}`}
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year Dropdown */}
        <div className="date-picker__field">
          <label className="date-picker__field-label">Year</label>
          <select
            value={localValue.year}
            onChange={(e) => handleChange('year', parseInt(e.target.value))}
            disabled={disabled}
            className={`date-picker__select ${displayError ? 'date-picker__select--error' : ''}`}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {displayError && (
        <div className="date-picker__error">
          <span className="date-picker__error-icon">⚠️</span>
          {displayError}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
