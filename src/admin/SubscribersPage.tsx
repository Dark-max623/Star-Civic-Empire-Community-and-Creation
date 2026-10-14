import { useEffect, useState } from 'react';
import { newsletterApi, getErrorMessage, type ApiSubscriber } from '../api';
import { LoadMoreButton } from '../components/ui/LoadMoreButton';

export const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState<ApiSubscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPage = async (p: number, append = false) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await newsletterApi.listSubscribers(p, 20);
      setSubscribers((prev) =>
        append ? [...prev, ...data.results] : data.results
      );
      setTotal(data.count);
      setPage(p);
      setHasMore(!!data.next);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) fetchPage(page + 1, true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    setDeletingId(id);
    try {
      await newsletterApi.removeSubscriber(id);
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const exportCsv = () => {
    const rows = [['Email', 'Subscribed']];
    subscribers.forEach((s) => {
      rows.push([s.email, new Date(s.created_at).toISOString()]);
    });
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (ts: string) =>
    new Date(ts).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Newsletter Subscribers
          </h1>
          <p className="text-text-subtle text-sm">
            People who signed up through the footer form.
          </p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={exportCsv}
            className="text-xs uppercase tracking-widest border border-gold-primary text-gold-primary px-4 py-2 rounded-sm hover:bg-gold-primary hover:text-bg-dark transition-colors"
          >
            Export CSV
          </button>
        )}
      </header>

      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-sm mb-6">
          {error}
        </p>
      )}

      {isLoading && subscribers.length === 0 ? (
        <p className="text-text-subtle text-sm text-center py-10">Loading…</p>
      ) : subscribers.length === 0 ? (
        <p className="text-text-subtle text-sm text-center py-10 border border-dashed border-white/10 rounded-sm">
          No subscribers yet.
        </p>
      ) : (
        <>
          <div className="bg-bg-dark-elevated border border-white/5 rounded-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-text-subtle text-xs uppercase tracking-widest px-4 py-3">
                    Email
                  </th>
                  <th className="text-left text-text-subtle text-xs uppercase tracking-widest px-4 py-3 hidden md:table-cell">
                    Subscribed
                  </th>
                  <th className="text-right text-text-subtle text-xs uppercase tracking-widest px-4 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 text-text-primary text-sm truncate">
                      {s.email}
                    </td>
                    <td className="px-4 py-3 text-text-muted text-xs hidden md:table-cell">
                      {formatDate(s.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(s.id)}
                        disabled={deletingId === s.id}
                        className="border border-red-500/50 text-red-400 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm hover:bg-red-500/10 disabled:opacity-50 transition-colors"
                      >
                        {deletingId === s.id ? '…' : 'Remove'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <LoadMoreButton
            onClick={handleLoadMore}
            isLoading={isLoading}
            hasMore={hasMore}
            shown={subscribers.length}
            total={total}
            label="subscribers"
          />
        </>
      )}
    </div>
  );
};