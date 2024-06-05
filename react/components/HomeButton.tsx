"use client"

import { useRouter } from 'next/navigation';

const HomeButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.replace(process.env.NEXT_PUBLIC_BASE_URL!)}
      className="fixed top-4 left-4 z-50 p-2 bg-gray-100 text-black rounded hover:bg-gray-200"
    >
      Back
    </button>
  );
};

export default HomeButton;