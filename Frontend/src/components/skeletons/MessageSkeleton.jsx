const MessageSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Left skeleton message */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        <div className="space-y-2">
          <div className="h-8 w-48 bg-white/10 rounded-2xl animate-pulse" />
          <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Right skeleton message */}
      <div className="flex items-end justify-end gap-3">
        <div className="space-y-2 flex flex-col items-end">
          <div className="h-8 w-60 bg-indigo-500/20 rounded-2xl animate-pulse" />
          <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
      </div>

      {/* Left skeleton message */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        <div className="space-y-2">
          <div className="h-10 w-36 bg-white/10 rounded-2xl animate-pulse" />
          <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;