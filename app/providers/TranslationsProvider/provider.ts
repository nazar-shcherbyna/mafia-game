'use client';
import React from 'react';

export const defaultLanguage = 'ua';

export const defaultTranslations: Record<
  'en' | 'ua',
  Record<string, string>
> = {
  en: {
    translations__link: 'Translations',
    'translations__page-title': 'Translations settings',
  },
  ua: {
    translations__link: 'Переклади',
    'translations__page-title': 'Налаштування перекладів',
  },
};

export const TranslationsContext = React.createContext({
  language: defaultLanguage,
  translate: (key: string) => defaultTranslations[defaultLanguage][key] || key,
});

export const useTranslate = () =>
  React.useContext(TranslationsContext).translate;
