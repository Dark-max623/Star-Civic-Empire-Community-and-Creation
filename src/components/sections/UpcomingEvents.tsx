import { useData } from '../../context/DataContext';
import { SectionHeader } from '../ui/SectionHeader';
import { EventCard } from '../ui/EventCard';

export const UpcomingEvents = () => {
  const { events, isLoadingEvents } = useData();

  const showLoading = isLoadingEvents && events.length === 0;

  return (
    <section className="section-padding bg-bg-dark-elevated">
      <div className="section-container">
        <SectionHeader
          subtitle="Don't Miss Out"
          title="Upcoming Events"
          align="center"
        />

        {showLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-32 md:h-36 bg-bg-dark border border-white/5 rounded-sm animate-pulse"
              />
            ))}
          </div>
        ) : events.length > 0 ? (
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
        ) : (
          <p className="text-text-subtle text-sm text-center py-10">
            No upcoming events at the moment.
          </p>
        )}
      </div>
    </section>
  );
};