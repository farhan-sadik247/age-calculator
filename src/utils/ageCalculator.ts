import { AgeResult, DateInput } from '@/types';

/**
 * Calculate exact age from birth date to current date
 */
export function calculateAge(birthDate: Date, currentDate: Date = new Date()): AgeResult {
  // Ensure we're working with valid dates
  if (!isValidDate(birthDate) || !isValidDate(currentDate)) {
    throw new Error('Invalid date provided');
  }

  // Ensure birth date is not in the future
  if (birthDate > currentDate) {
    throw new Error('Birth date cannot be in the future');
  }

  // Calculate years, months, and days
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total values
  const totalDays = Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Calculate next birthday
  const nextBirthday = getNextBirthday(birthDate, currentDate);

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthday,
  };
}

/**
 * Calculate next birthday information
 */
function getNextBirthday(birthDate: Date, currentDate: Date) {
  const currentYear = currentDate.getFullYear();
  let nextBirthdayYear = currentYear;
  
  // Create next birthday date for current year
  let nextBirthdayDate = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
  
  // If birthday has already passed this year, use next year
  if (nextBirthdayDate <= currentDate) {
    nextBirthdayYear = currentYear + 1;
    nextBirthdayDate = new Date(nextBirthdayYear, birthDate.getMonth(), birthDate.getDate());
  }
  
  // Calculate days until next birthday
  const daysUntil = Math.ceil((nextBirthdayDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Get day of week for next birthday
  const dayOfWeek = nextBirthdayDate.toLocaleDateString('en-US', { weekday: 'long' });
  
  return {
    date: nextBirthdayDate,
    daysUntil,
    dayOfWeek,
  };
}

/**
 * Validate if a date is valid
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Convert DateInput to Date object
 */
export function dateInputToDate(dateInput: DateInput): Date {
  return new Date(dateInput.year, dateInput.month - 1, dateInput.day);
}

/**
 * Convert Date to DateInput
 */
export function dateToDateInput(date: Date): DateInput {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

/**
 * Validate DateInput
 */
export function validateDateInput(dateInput: DateInput): { isValid: boolean; error?: string } {
  const { day, month, year } = dateInput;
  
  // Check if values are numbers
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return { isValid: false, error: 'Date values must be valid numbers' };
  }
  
  // Check year range
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return { isValid: false, error: `Year must be between 1900 and ${currentYear}` };
  }
  
  // Check month range
  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Month must be between 1 and 12' };
  }
  
  // Check day range
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return { isValid: false, error: `Day must be between 1 and ${daysInMonth} for the selected month` };
  }
  
  // Check if date is not in the future
  const inputDate = dateInputToDate(dateInput);
  const currentDate = new Date();
  if (inputDate > currentDate) {
    return { isValid: false, error: 'Birth date cannot be in the future' };
  }
  
  return { isValid: true };
}

/**
 * Format age result for display
 */
export function formatAgeResult(ageResult: AgeResult): string {
  const { years, months, days } = ageResult;
  
  const parts: string[] = [];
  
  if (years > 0) {
    parts.push(`${years} year${years !== 1 ? 's' : ''}`);
  }
  
  if (months > 0) {
    parts.push(`${months} month${months !== 1 ? 's' : ''}`);
  }
  
  if (days > 0) {
    parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  }
  
  if (parts.length === 0) {
    return 'Born today!';
  }
  
  if (parts.length === 1) {
    return parts[0];
  }
  
  if (parts.length === 2) {
    return parts.join(' and ');
  }
  
  return `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`;
}

/**
 * Get age in specific unit
 */
export function getAgeInUnit(birthDate: Date, unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds', currentDate: Date = new Date()): number {
  const ageResult = calculateAge(birthDate, currentDate);
  
  switch (unit) {
    case 'years':
      return ageResult.years;
    case 'months':
      return ageResult.totalMonths;
    case 'days':
      return ageResult.totalDays;
    case 'hours':
      return ageResult.totalHours;
    case 'minutes':
      return ageResult.totalMinutes;
    case 'seconds':
      return ageResult.totalSeconds;
    default:
      throw new Error(`Invalid unit: ${unit}`);
  }
}
