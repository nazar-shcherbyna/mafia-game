'use client';
import { useTranslate } from '../providers/TranslationsProvider/provider';
import { lusitana } from '../ui/fonts';

export default function Page() {
  const translate = useTranslate();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          {translate('translations__page-title')}
        </h1>
      </div>
    </div>
  );
}
