import Link from 'next/link';

export default function NotFound() {
  console.error('Not Found');

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
