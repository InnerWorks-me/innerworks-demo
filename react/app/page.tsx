import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black">
      <h1 className="text-2xl font-bold mb-4">Welcome to Innerworks</h1>
      <p className="mb-4">Please login using the sign in page below</p>
      <div className="flex space-x-4">
        <Link href="/demo/frontend-flow">
          <span className="cursor-pointer block px-6 py-2 bg-blue-500 text-white border border-transparent text-center hover:bg-blue-600">
            Sign In Here!
          </span>
        </Link>
      </div>
    </div>
  );
}
