
import React from 'react';

export interface SessionContent {
  id: string;
  title: string;
  circleName: string;
  session: number;
  content: React.ReactNode;
}
