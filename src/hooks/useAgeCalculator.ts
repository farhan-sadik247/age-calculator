'use client';

import { useState, useEffect, useCallback } from 'react';
import { DateInput, AgeResult } from '@/types';
import { calculateAge, dateInputToDate, validateDateInput } from '@/utils/ageCalculator';

interface UseAgeCalculatorReturn {
  birthDate: DateInput;
  setBirthDate: (date: DateInput) => void;
  ageResult: AgeResult | null;
  loading: boolean;
  error: string | null;
  isValidDate: boolean;
  calculateCurrentAge: () => void;
  resetCalculator: () => void;
}

export function useAgeCalculator(): UseAgeCalculatorReturn {
  const [birthDate, setBirthDate] = useState<DateInput>({
    day: 1,
    month: 1,
    year: 2000
  });
  
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate the current birth date
  const validation = validateDateInput(birthDate);
  const isValidDate = validation.isValid;

  // Calculate age with debouncing
  const calculateCurrentAge = useCallback(() => {
    if (!isValidDate) {
      setError(validation.error || 'Invalid date');
      setAgeResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate a small delay for better UX
    setTimeout(() => {
      try {
        const birthDateObj = dateInputToDate(birthDate);
        const result = calculateAge(birthDateObj);
        setAgeResult(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setAgeResult(null);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [birthDate, isValidDate, validation.error]);

  // Auto-calculate when date changes and is valid
  useEffect(() => {
    if (isValidDate) {
      calculateCurrentAge();
    } else {
      setAgeResult(null);
      setError(validation.error || null);
    }
  }, [birthDate, isValidDate, calculateCurrentAge, validation.error]);

  // Reset calculator to initial state
  const resetCalculator = useCallback(() => {
    setBirthDate({
      day: 1,
      month: 1,
      year: 2000
    });
    setAgeResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    birthDate,
    setBirthDate,
    ageResult,
    loading,
    error,
    isValidDate,
    calculateCurrentAge,
    resetCalculator
  };
}
