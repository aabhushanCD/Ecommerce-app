import { AlertTriangle } from "lucide-react";

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-start gap-4 rounded-2xl border border-red-200 bg-white p-5 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            Something went wrong
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-gray-600 wrap-break-words">
            {message}
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={onRetry}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBanner;
