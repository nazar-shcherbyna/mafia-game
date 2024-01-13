'use client';

import React from 'react';
import {
  TranslationsContext,
  defaultLanguage,
  defaultTranslations,
} from './provider';

export const TranslationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const language = defaultLanguage;

  return (
    <TranslationsContext.Provider
      value={{
        language,
        translate: (key: string) => defaultTranslations[language][key] || key,
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};
