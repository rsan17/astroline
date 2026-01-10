import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for optimal class name handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate zodiac sign from birth date
 * @param birthDate - Birth date string in YYYY-MM-DD format
 * @returns Ukrainian zodiac sign name or null if invalid
 */
export function calculateZodiacSignFromDate(birthDate: string): string | null {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthDate)) {
    return null;
  }

  const date = new Date(birthDate + 'T00:00:00');
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (isNaN(date.getTime())) {
    return null;
  }

  // Aries: March 21 - April 19
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Овен';
  // Taurus: April 20 - May 20
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Телець';
  // Gemini: May 21 - June 20
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Близнюки';
  // Cancer: June 21 - July 22
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Рак';
  // Leo: July 23 - August 22
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Лев';
  // Virgo: August 23 - September 22
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Діва';
  // Libra: September 23 - October 22
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Терези';
  // Scorpio: October 23 - November 21
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Скорпіон';
  // Sagittarius: November 22 - December 21
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Стрілець';
  // Capricorn: December 22 - January 19
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Козеріг';
  // Aquarius: January 20 - February 18
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Водолій';
  // Pisces: February 19 - March 20
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Риби';

  return null;
}
