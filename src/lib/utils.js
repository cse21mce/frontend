import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export const parseDatePosted = (datePostedStr) => {
  // Example input: "Posted On: 24 AUG 2024 9:48AM by PIB Delhi"
  const datePattern = /Posted On: (\d{2}) (\w{3}) (\d{4}) (\d{1,2}):(\d{2})(AM|PM)/;
  const match = datePostedStr.match(datePattern);

  // Extract components
  const [, day, month, year, hour, minute, period] = match;

  // Convert month abbreviation to number
  const monthMap = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
  };
  const monthNumber = monthMap[month];

  // Convert 12-hour format to 24-hour format
  let hour24 = parseInt(hour, 10);
  if (period === 'PM' && hour24 < 12) hour24 += 12;
  if (period === 'AM' && hour24 === 12) hour24 = 0;

  // Create Date object
  return new Date(year, monthNumber, day, hour24, minute);
};