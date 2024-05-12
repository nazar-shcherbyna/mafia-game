import Image from 'next/image';

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex grow flex-col justify-center align-middle">
        <Image
          src="/main-logo.svg"
          width={560}
          height={620}
          alt="Screenshots of the dashboard project showing mobile version"
        />
      </div>
    </main>
  );
}
