import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center px-4">

      <h1 className="text-7xl font-extrabold text-green-700 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6 max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/home"
        className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
      >
        Go Back Home
      </Link>

    </div>
  );
}