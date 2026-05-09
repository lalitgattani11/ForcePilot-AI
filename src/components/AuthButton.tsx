import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '../context/AuthContext';

const AuthButton = () => {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <button
      onClick={signInWithGoogle}
      disabled={loading}
      className="
        flex items-center justify-center gap-3
        px-6 py-3
        rounded-2xl
        bg-white/10
        border border-cyan-400/30
        text-white
        hover:bg-cyan-500/10
        transition-all duration-300
        backdrop-blur-md
        shadow-lg shadow-cyan-500/10
        w-full
        disabled:opacity-50
      "
    >
      <FcGoogle size={22} />

      <span>
        {loading
          ? 'Loading...'
          : 'Continue with Google'}
      </span>
    </button>
  );
};

export default AuthButton;