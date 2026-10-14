import { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Layout } from '../components/layout/Layout';
import { PageHero } from '../components/ui/PageHero';
import { EventCard } from '../components/ui/EventCard';
import { LoadMoreButton } from '../components/ui/LoadMoreButton';

export const PublicEventsPage = () => {
  const {
    events,
    eventsTotal,
    eventsHasMore,
    isLoadingEvents,
    refreshEvents,
    loadMoreEvents,
  } = useData();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    if (events.length === 0) {
      refreshEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showLoading = isLoadingEvents && events.length === 0;

  return (
    <Layout>
      <PageHero
        title="Upcoming Events"
        subtitle="Don't Miss Out"
        breadcrumb="Events"
      />

      <section className="section-padding bg-bg-dark">
        <div className="section-container">
          {showLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 md:h-36 bg-bg-dark-elevated border border-white/5 rounded-sm animate-pulse"
                />
              ))}
            </div>
          ) : events.length === 0 ? (
            <p className="text-text-subtle text-sm text-center py-10">
              No upcoming events at the moment.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={{
                      id: event.id,
                      title: event.title,
                      date: event.date,
                      startTime: event.start_time,
                      endTime: event.end_time,
                      location: event.location,
                      imageUrl: event.image_url,
                      ctaLabel: event.cta_label,
                    }}
                  />
                ))}
              </div>

              <LoadMoreButton
                onClick={loadMoreEvents}
                isLoading={isLoadingEvents}
                hasMore={eventsHasMore}
                shown={events.length}
                total={eventsTotal}
                label="events"
              />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};