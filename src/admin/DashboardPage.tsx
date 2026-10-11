import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { formatBytes, STORAGE_WARN_BYTES } from '../utils/imageUpload';

export const DashboardPage = () => {
  const { gallery, reviews, events, storageUsedBytes } = useData();
  const pendingReviews = reviews.filter((r) => r.status === 'pending').length;

  const stats = [
    { label: 'Gallery Photos', value: gallery.length, to: '/admin/gallery', color: 'text-gold-primary' },
    { label: 'Total Reviews', value: reviews.length, to: '/admin/reviews', color: 'text-gold-primary' },
    { label: 'Pending Reviews', value: pendingReviews, to: '/admin/reviews', color: 'text-red-400' },
    { label: 'Upcoming Events', value: events.length, to: '/admin/events', color: 'text-gold-primary' },
  ];

  const usagePercent = Math.min(
    100,
    Math.round((storageUsedBytes / STORAGE_WARN_BYTES) * 100)
  );

  return (
    <div className="p-6 md:p-10">
      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Dashboard
        </h1>
        <p className="text-text-subtle text-sm">
          Welcome back. Here's an overview of your website.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="bg-bg-dark-elevated border border-white/5 rounded-sm p-6 hover:border-gold-primary transition-colors"
          >
            <p className="text-text-subtle text-xs uppercase tracking-widest mb-3">
              {stat.label}
            </p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Storage Card */}
      <div className="mt-6 bg-bg-dark-elevated border border-white/5 rounded-sm p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-text-subtle text-xs uppercase tracking-widest">
              Storage Used
            </p>
            <p className="text-text-primary text-2xl font-bold mt-1">
              {formatBytes(storageUsedBytes)}
              <span className="text-text-muted text-sm font-normal">
                {' '}/ {formatBytes(STORAGE_WARN_BYTES)}
              </span>
            </p>
          </div>
          <span className="text-gold-primary text-2xl font-bold">
            {usagePercent}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              usagePercent > 85
                ? 'bg-red-500'
                : usagePercent > 60
                ? 'bg-yellow-500'
                : 'bg-gold-primary'
            }`}
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-text-primary text-lg font-semibold mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/gallery"
            className="bg-gold-primary text-bg-dark text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-sm hover:bg-gold-hover transition-colors"
          >
            + Upload Photos
          </Link>
          <Link
            to="/admin/reviews"
            className="border border-gold-primary text-gold-primary text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-sm hover:bg-gold-primary hover:text-bg-dark transition-colors"
          >
            Review Comments
          </Link>
          <Link
            to="/admin/events"
            className="border border-gold-primary text-gold-primary text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-sm hover:bg-gold-primary hover:text-bg-dark transition-colors"
          >
            + Add Event
          </Link>
        </div>
      </div>
    </div>
  );
};