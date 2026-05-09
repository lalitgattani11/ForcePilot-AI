import { useAuth } from '../context/AuthContext';

const UserMenu = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div
      className="
        flex items-center gap-2 sm:gap-3
        p-1 sm:p-1.5
        rounded-2xl
        border border-cyan-400/20
        bg-black/40
        backdrop-blur-xl
        hover:border-cyan-400/40
        hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
        transition-all duration-300
        group
        max-w-[180px] sm:max-w-[280px] lg:max-w-xs
      "
    >
      {/* Avatar Container with Glow */}
      <div className="relative flex-shrink-0 ml-0.5 sm:ml-1">
        <img
          src={
            user.user_metadata?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || 'User')}&background=0D1117&color=22D3EE`
          }
          alt="User"
          className="
            w-8 h-8 sm:w-9 sm:h-9
            rounded-full
            border border-cyan-400/30
            group-hover:border-cyan-400/60
            transition-colors
            object-cover
          "
        />
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </div>

      {/* User Info - Hidden on very small screens, shown from sm up */}
      <div className="hidden sm:flex flex-col min-w-0 flex-1 overflow-hidden">
        <span className="text-xs sm:text-sm text-white font-semibold truncate leading-tight">
          {user.user_metadata?.full_name || 'Candidate'}
        </span>

        <span className="text-[10px] sm:text-xs text-cyan-300/50 truncate leading-tight">
          {user.email}
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={signOut}
        className="
          flex-shrink-0
          text-[10px] sm:text-xs font-semibold
          px-3 py-1.5
          rounded-xl
          bg-white/5
          border border-cyan-400/10
          text-slate-400
          hover:bg-cyan-500/10
          hover:text-cyan-300
          hover:border-cyan-400/40
          hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]
          transition-all duration-300
          mr-0.5 sm:mr-1
          tracking-wide
        "
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;