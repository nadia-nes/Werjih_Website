'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log DOM translation mismatch errors without freezing the UI
    if (
      error.message?.includes('NotFoundError') ||
      error.message?.includes('removeChild') ||
      error.message?.includes('insertBefore')
    ) {
      console.warn('Caught translation DOM manipulation conflict:', error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-lg font-bold">Something went wrong</h2>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-md"
      >
        Reload Page
      </button>
    </div>
  );
}