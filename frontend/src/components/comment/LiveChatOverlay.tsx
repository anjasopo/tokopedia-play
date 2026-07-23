import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Sparkles } from 'lucide-react';
import { Comment } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

interface LiveChatOverlayProps {
  comments: Comment[];
  loading?: boolean;
  posting?: boolean;
  onPostComment: (username: string, comment: string) => Promise<void>;
}

export const LiveChatOverlay: React.FC<LiveChatOverlayProps> = ({
  comments,
  loading = false,
  posting = false,
  onPostComment,
}) => {
  const [username, setUsername] = useState('Anjas');
  const [commentText, setCommentText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom when new comment arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || posting) return;

    const currentText = commentText;
    setCommentText('');

    try {
      await onPostComment(username || 'Pembeli', currentText);
    } catch (err) {
      setCommentText(currentText);
    }
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Top Spender':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Verified Buyer':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/90 rounded-2xl border border-gray-800/80 overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="px-4 py-3 bg-gray-950/80 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-gray-100">Live Chat Stream</h3>
        </div>
        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold rounded-full flex items-center gap-1 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          REALTIME
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 max-h-[420px] min-h-[250px]">
        {loading && comments.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-xs text-gray-500">
            Memuat obrolan...
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center text-xs text-gray-500 space-y-1">
            <Sparkles className="w-6 h-6 text-gray-600 mb-1" />
            <p className="font-semibold text-gray-400">Belum ada obrolan</p>
            <p>Jadilah yang pertama mengirim pesan!</p>
          </div>
        ) : (
          comments.map((item, idx) => (
            <div
              key={item._id || idx}
              className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-950/60 border border-gray-800/60 text-xs animate-fade-in hover:border-gray-700 transition-colors"
            >
              <img
                src={
                  item.avatarUrl ||
                  `https://api.dicebear.com/7.x/bottts/svg?seed=${item.username}`
                }
                alt={item.username}
                className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-bold text-emerald-400 truncate">
                    {item.username}
                  </span>
                  <span
                    className={`px-1.5 py-0.2 text-[9px] font-extrabold rounded border ${getBadgeStyle(
                      item.userBadge
                    )}`}
                  >
                    {item.userBadge || 'Penonton'}
                  </span>
                  <span className="text-[10px] text-gray-500 ml-auto flex-shrink-0">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                </div>
                <p className="text-gray-200 leading-relaxed break-words font-normal">
                  {item.comment}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-gray-950 border-t border-gray-800 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nama Anda"
            className="w-24 bg-gray-900 text-xs text-gray-200 placeholder-gray-500 px-2.5 py-1.5 rounded-lg border border-gray-800 focus:border-emerald-500 focus:outline-none"
          />
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ketik komentar live..."
            className="flex-1 bg-gray-900 text-xs text-gray-100 placeholder-gray-400 px-3 py-1.5 rounded-lg border border-gray-800 focus:border-emerald-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!commentText.trim() || posting}
            className="p-2 bg-tokopedia-500 hover:bg-tokopedia-600 disabled:opacity-40 text-white rounded-lg transition-transform active:scale-95 flex-shrink-0"
            aria-label="Kirim Komentar"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
