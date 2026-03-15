import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold text-white">SK</span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-200">Page Not Found</h1>
        <p className="text-zinc-500 max-w-sm">
          The stage or page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
          Back to Stages
        </Link>
      </div>
    </div>
  );
}
