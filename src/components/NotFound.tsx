import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | ForcePilot AI</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.2)] mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Navigation Coordinates Lost
        </h2>
        <p className="text-slate-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
          The requested system node does not exist or has been moved. Let's return to the mission control deck.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-sm font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
        >
          Return to Deck
        </Link>
      </div>
    </>
  );
}
