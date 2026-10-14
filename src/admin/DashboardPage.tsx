import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi, type DashboardStats } from '../api';

export const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminApi.stats();
        setStats(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-text-subtle text-sm">Loading dashboard…</p>
      </div>
    );
  }

  const cards = [
    {
      label: 'Gallery Photos',
      value: stats?.gallery_count ?? 0,
      to: '/admin/gallery',
      color: 'text-gold-primary',
    },
    {
      label: 'Total Reviews',
      value: stats?.reviews_total ?? 0,
      to: '/admin/reviews',
      color: 'text-gold-primary',
    },
    {
      label: 'Pending Reviews',
      value: stats?.reviews_pending ?? 0,
      to: '/admin/reviews',
      color: 'text-yellow-400',
    },
    {
      label: 'Upcoming Events',
      value: stats?.events_count ?? 0,
      to: '/admin/events',
      color: 'text-gold-primary',
    },
    {
      label: 'Services',
      value: stats?.services_count ?? 0,
      to: '/admin/services',
      color: 'text-gold-primary',
    },
    {
      label: 'Unread Messages',
      value: stats?.unread_messages ?? 0,
      to: '/admin/messages',
      color: 'text-red-400',
    },
    {
      label: 'Subscribers',
      value: stats?.subscribers_count ?? 0,
      to: '/admin/subscribers',
      color: 'text-gold-primary',
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Dashboard
        </h1>
        <p className="text-text-subtle text-sm">
          Welcome back. Here's an overview of your Star Civic Empire website.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards.map((stat) => (
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
          <Link
            to="/admin/messages"
            className="border border-gold-primary text-gold-primary text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-sm hover:bg-gold-primary hover:text-bg-dark transition-colors"
          >
            Inbox
          </Link>
        </div>
      </div>
    </div>
  );
};