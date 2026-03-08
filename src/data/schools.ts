export const AVAILABLE_SCHOOLS = [
  'Coppice Performing Arts School',
] as const;

export type SchoolName = typeof AVAILABLE_SCHOOLS[number];
