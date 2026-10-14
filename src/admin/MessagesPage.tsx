import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactApi, getErrorMessage, type ApiContactMessage } from '../api';
import { LoadMoreButton } from '../components/ui/LoadMoreButton';

type Filter = 'all' | 'unread' | 'read';

export const MessagesPage = () => {
  const [messages, setMessages] = useState<ApiContactMessage[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const hasFetched = useRef(false);

  const fetchPage = async (p: number, append = false) => {
    setIsLoading(true);
    setError('');
    try {
      console.log('🔍 Fetching messages page', p);
      const data = await contactApi.list(p, 15);
      console.log('✅ Messages API response:', data);

      setMessages((prev) => (append ? [...prev, ...data.results] : data.results));
      setTotal(data.count);
      setPage(p);
      setHasMore(!!data.next);
    } catch (err) {
      console.error('❌ Messages API error:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) fetchPage(page + 1, true);
  };

  const handleMarkRead = async (id: string) => {
    setWorkingId(id);
    try {
      const updated = await contactApi.markRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setWorkingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;
    setWorkingId(id);
    try {
      await contactApi.remove(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setWorkingId(null);
    }
  };

  const filtered = messages.filter((m) =>
    filter === 'all' ? true : filter === 'unread' ? !m.is_read : m.is_read
  );

  const formatDate = (ts: string) =>
    new Date(ts).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Contact Messages
          </h1>
          <p className="text-text-subtle text-sm">
            Messages submitted through the public contact form.
          </p>
        </div>
        <button
          onClick={() => fetchPage(1)}
          disabled={isLoading}
          className="text-xs uppercase tracking-widest border border-gold-primary text-gold-primary px-4 py-2 rounded-sm hover:bg-gold-primary hover:text-bg-dark transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading…' : '↻ Refresh'}
        </button>
      </header>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'unread', 'read'] as Filter[]).map((f) => {
          const count =
            f === 'all'
              ? messages.length
              : f === 'unread'
              ? messages.filter((m) => !m.is_read).length
              : messages.filter((m) => m.is_read).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-sm border transition-colors ${
                filter === f
                  ? 'bg-gold-primary text-bg-dark border-gold-primary'
                  : 'border-text-muted text-text-subtle hover:border-gold-primary hover:text-gold-primary'
              }`}
            >
              {f} ({count})
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm mb-6">
          {error}
        </p>
      )}

      {isLoading && messages.length === 0 ? (
        <p className="text-text-subtle text-sm text-center py-10">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-sm">
          <p className="text-text-subtle text-sm mb-2">
            No messages in this category.
          </p>
          <p className="text-text-muted text-xs">(Total in DB: {total})</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {filtered.map((m) => {
                const isExpanded = expandedId === m.id;
                return (
                  <motion.div
                    key={m.id}
                    layout
                    className={`bg-bg-dark-elevated border rounded-sm overflow-hidden transition-colors ${
                      m.is_read ? 'border-white/5' : 'border-gold-primary/40'
                    }`}
                  >
                    <div
                      onClick={() => setExpandedId(isExpanded ? null : m.id)}
                      className="cursor-pointer p-4 md:p-5 flex flex-wrap items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {!m.is_read && (
                          <span className="w-2 h-2 rounded-full bg-gold-primary shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-text-primary font-medium text-sm truncate">
                            {m.name}
                            {m.subject && (
                              <span className="text-text-subtle font-normal">
                                {' '}
                                · {m.subject}
                              </span>
                            )}
                          </p>
                          <p className="text-text-subtle text-xs truncate">
                            {m.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-text-muted text-[10px] uppercase tracking-widest">
                          {formatDate(m.created_at)}
                        </span>
                        <span className="text-gold-primary text-xs">
                          {isExpanded ? '▲' : '▼'}
                        </span>
                      </div>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/5 p-4 md:p-5 flex flex-col gap-4"
                      >
                        <p className="text-text-subtle text-sm leading-relaxed whitespace-pre-wrap">
                          {m.message}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                          <a
                            href={`mailto:${m.email}`}
                            className="bg-gold-primary text-bg-dark text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-gold-hover transition-colors"
                          >
                            Reply by Email
                          </a>
                          {!m.is_read && (
                            <button
                              onClick={() => handleMarkRead(m.id)}
                              disabled={workingId === m.id}
                              className="border border-gold-primary text-gold-primary text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-gold-primary hover:text-bg-dark disabled:opacity-50 transition-colors"
                            >
                              {workingId === m.id ? 'Marking…' : 'Mark as Read'}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(m.id)}
                            disabled={workingId === m.id}
                            className="border border-red-500/50 text-red-400 text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-red-500/10 disabled:opacity-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <LoadMoreButton
            onClick={handleLoadMore}
            isLoading={isLoading}
            hasMore={hasMore}
            shown={messages.length}
            total={total}
            label="messages"
          />
        </>
      )}
    </div>
  );
};