import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { Welcome } from './components/sections/Welcome';
import { Gallery } from './components/sections/Gallery';
import { Services } from './components/sections/Services';
import { WhyUs } from './components/sections/WhyUs';
import { Journey } from './components/sections/Journey';
import { UpcomingEvents } from './components/sections/UpcomingEvents';

function App() {
  return (
    <Layout>
      <Hero />
      <Welcome />
      <Gallery />
      <Services />
      <WhyUs />
      <Journey />
      <UpcomingEvents />
    </Layout>
  );
}

export default App;