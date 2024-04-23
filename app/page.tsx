import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black">
      <h1 className="text-2xl font-bold mb-4">Innerworks SDK Playground / Integration Docs</h1>
      <p className="mb-4">This repo is used to demo the Innerworks Authentication SDK, use the buttons below to select which flow to use (just frontend flow for now).</p>
      <p className="mb-8">You can also view the source code to see our recommendations for best practises on integrating the SDK in React.</p>
      <div className="flex space-x-4">
        <Link href="/demo/frontend-flow">
          <span className="cursor-pointer block px-6 py-2 bg-blue-500 text-white border border-transparent text-center hover:bg-blue-600">
            Frontend Flow Demo
          </span>
        </Link>
        <Link href="/demo/auth-flow">
          <span className="cursor-pointer block px-6 py-2 bg-blue-500 text-white border border-transparent text-center hover:bg-blue-600">
            Authentication Flow Demo
          </span>
        </Link>
      </div>
    </div>
  );
}
