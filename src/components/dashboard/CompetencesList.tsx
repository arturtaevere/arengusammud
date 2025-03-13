
import { ReactNode } from 'react';
import { convertToDashboardFormat } from '../observation/competencyAdapter';

export interface Competence {
  id: string;
  title: string;
  icon: ReactNode;
}

// Use the adapter to generate the competences list from the central data source
export const competences: Competence[] = convertToDashboardFormat();
