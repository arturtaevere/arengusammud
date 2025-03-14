
import { useState } from 'react';
import { VERIFICATION_TOKENS_KEY } from './constants';

export const useTokenManagement = () => {
  const [verificationTokens, setVerificationTokens] = useState<Record<string, string>>({});

  const saveVerificationTokens = (tokens: Record<string, string>) => {
    localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(tokens));
    setVerificationTokens(tokens);
  };

  const generateVerificationToken = (userId: string) => {
    // Clear any existing tokens for this user first
    const currentTokens = JSON.parse(localStorage.getItem(VERIFICATION_TOKENS_KEY) || '{}');
    
    // Generate a stronger token
    const token = Math.random().toString(36).substring(2, 15);
    
    // Store the new token
    const updatedTokens = { ...currentTokens, [userId]: token };
    localStorage.setItem(VERIFICATION_TOKENS_KEY, JSON.stringify(updatedTokens));
    
    // Update state
    setVerificationTokens(updatedTokens);
    
    console.log(`Generated new token for userId ${userId}: ${token}`);
    console.log(`Updated tokens in localStorage:`, updatedTokens);
    
    return token;
  };

  return {
    verificationTokens,
    setVerificationTokens,
    saveVerificationTokens,
    generateVerificationToken
  };
};
