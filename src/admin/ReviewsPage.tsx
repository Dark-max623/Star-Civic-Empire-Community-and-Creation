import { useState } from 'react';
import { useData } from '../context/DataContext';

type Filter = 'all' | 'pending' | 'approved';

export const ReviewsPage = () => {
  const { reviews, approveReview, deleteReview } = useData();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = reviews.filter((r) =>
    filter === 'all' ? true : r.status === filter
  );

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Reviews & Comments
        </h1>
        <p className="text-text-subtle text-sm">
          Manage what visitors are saying about Star Civic Group.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs uppercase tracking-widest px-4 py-2 rounded-sm border transition-colors ${
              filter === f
                ? 'bg-gold-primary text-bg-dark border-gold-primary'
                : 'border-text-muted text-text-subtle hover:border-gold-primary hover:text-gold-primary'
            }`}
          >
            {f} ({f === 'all' ? reviews.length : reviews.filter((r) => r.status === f).length})
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((review) => (
          <div
            key={review.id}
            className="bg-bg-dark-elevated border border-white/5 rounded-sm p-5 md:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-text-primary font-semibold">{review.name}</p>
                <p className="text-text-subtle text-xs">{review.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gold-primary text-sm">
                  {'★'.repeat(review.rating)}
                  <span className="text-text-muted">
                    {'★'.repeat(5 - review.rating)}
                  </span>
                </span>
                <span
                  className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm ${
                    review.status === 'approved'
                      ? 'bg-green-500/15 text-green-400'
                      : 'bg-yellow-500/15 text-yellow-400'
                  }`}
                >
                  {review.status}
                </span>
              </div>
            </div>

            <p className="text-text-subtle text-sm leading-relaxed mb-4">
              {review.message}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
              <span className="text-text-muted text-xs">
                {formatDate(review.createdAt)}
              </span>
              <div className="flex gap-2">
                {review.status === 'pending' && (
                  <button
                    onClick={() => approveReview(review.id)}
                    className="bg-gold-primary text-bg-dark text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-gold-hover transition-colors"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => deleteReview(review.id)}
                  className="border border-red-500/50 text-red-400 text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-red-500/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-text-subtle text-sm text-center py-10">
            No reviews in this category.
          </p>
        )}
      </div>
    </div>
  );
};