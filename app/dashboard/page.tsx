import Link from 'next/link';

export default function Page() {
  return (
    <p>
      Dashboard page{' '}
      <Link
        href="/dashboard/customers"
        className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        Customers
      </Link>
    </p>
  );
}
