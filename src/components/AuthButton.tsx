import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '../context/AuthContext';

const AuthButton = () => {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <button
      onClick={signInWithGoogle}
      disabled={loading}
      className="
        flex items-center justify-center gap-2.5
        h-11 px-4 sm:px-5
        rounded-full
        bg-black/40
        border border-cyan-500/30
        text-white
        backdrop-blur-md
        hover:border-cyan-400
        hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]
        hover:bg-cyan-500/5
        transition-all duration-300
        disabled:opacity-50
        whitespace-nowrap
        group
        text-sm font-medium tracking-wide
      "
    >
      <FcGoogle size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />

      <span>
        {loading ? 'Sign In...' : 'Sign In'}
      </span>
    </button>
  );
};

export default AuthButton;