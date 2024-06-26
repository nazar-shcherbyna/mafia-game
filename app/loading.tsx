import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col p-6">
      <div className="flex grow flex-col items-center justify-center">
        <Image
          src="/main-logo.png"
          width={560}
          height={620}
          alt="Screenshots of the dashboard project showing mobile version"
        />
      </div>
    </div>
  );
}
