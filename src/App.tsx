import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { Welcome } from './components/sections/Welcome';
import { Gallery } from './components/sections/Gallery';
import { Services } from './components/sections/Services';
import { WhyUs } from './components/sections/WhyUs';
import { Journey } from './components/sections/Journey';
import { UpcomingEvents } from './components/sections/UpcomingEvents';
import { Reviews } from './components/sections/Reviews';

import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminLayout } from './admin/AdminLayout';
import { LoginPage } from './admin/LoginPage';
import { DashboardPage } from './admin/DashboardPage';
import { GalleryPage } from './admin/GalleryPage';
import { ReviewsPage } from './admin/ReviewsPage';
import { EventsPage } from './admin/EventsPage';

const PublicHome = () => (
  <Layout>
    <Hero />
    <Welcome />
    <Gallery />
    <Services />
    <WhyUs />
    <Journey />
    <UpcomingEvents />
    <Reviews />
  </Layout>
);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicHome />} />

            {/* Primary login route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Legacy alias */}
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />

            {/* Protected admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="events" element={<EventsPage />} />
            </Route>

            {/* Catch-all → home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;