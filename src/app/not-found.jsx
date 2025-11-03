// app/not-found.jsx

export default function NotFound() {
  // Optional: You can get the path that caused the 404

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#121212] p-6 text-white">
      <h1 className="mb-4 text-6xl font-extrabold text-blue-500">404</h1>
      <h2 className="mb-4 text-3xl">Page Not Found</h2>
      <p className="mb-8 text-lg text-gray-400">
        We couldn&apos;t find the page you were looking for.
      </p>
    </div>
  );
}
