
import { ReactNode } from 'react';
import { convertToDashboardFormat } from '../observation/competencyAdapter';

export interface Competence {
  id: string;
  title: string;
  icon: ReactNode; // Changed from ReactNode to match what the adapter returns
}

// Use the adapter to generate the competences list from the central data source
export const competences: Competence[] = convertToDashboardFormat();
