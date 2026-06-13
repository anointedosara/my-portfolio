import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="aurora" />
      <div className="relative z-10 text-center">
        <h1 className="font-display text-8xl font-bold gradient-text">404</h1>
        <p className="mt-4 text-xl font-semibold">Page not found</p>
        <p className="mt-2 text-soft">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link href="/projects" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
