import Image from 'next/image';
import { UiLink } from './ui/link';

export default function Page() {
  return (
    <div className="flex min-h-screen p-6">
      <div className="flex grow flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-6 p-6">
          <Image
            src="/main-logo.png"
            width={560}
            height={620}
            alt="Screenshots of the dashboard project showing mobile version"
          />
          <div className="flex gap-8">
            <UiLink href="/login" className="px-5 py-3">
              Sign in
            </UiLink>
            <UiLink href="/registration" className="px-5 py-3">
              Sign up
            </UiLink>
          </div>
        </div>
      </div>
    </div>
  );
}
