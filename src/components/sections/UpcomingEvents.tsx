import { events } from '../../data/events';
import { SectionHeader } from '../ui/SectionHeader';
import { EventCard } from '../ui/EventCard';

export const UpcomingEvents = () => {
  return (
    <section className="section-padding bg-bg-dark-elevated">
      <div className="section-container">
        <SectionHeader subtitle="Don't Miss Out" title="Upcoming Events" align="center" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};