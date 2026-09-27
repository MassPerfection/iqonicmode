import { Link } from "react-router-dom";
import { usePageMeta } from "../components/ui";

export function NotFoundPage() {
  usePageMeta("ICONIQMode");

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-ink">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-ink/70">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="text-sm font-medium text-ink">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
