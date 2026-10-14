import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Layout } from './components/layout/Layout';
import { PageTransition } from './components/layout/PageTransition';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { Hero } from './components/sections/Hero';
import { Welcome } from './components/sections/Welcome';
import { Gallery } from './components/sections/Gallery';
import { Services } from './components/sections/Services';
import { WhyUs } from './components/sections/WhyUs';
import { Journey } from './components/sections/Journey';
import { UpcomingEvents } from './components/sections/UpcomingEvents';
import { Reviews } from './components/sections/Reviews';

import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PublicGalleryPage } from './pages/GalleryPage';
import { PublicEventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';

import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminLayout } from './admin/AdminLayout';
import { LoginPage } from './admin/LoginPage';
import { DashboardPage } from './admin/DashboardPage';
import { GalleryPage } from './admin/GalleryPage';
import { ReviewsPage } from './admin/ReviewsPage';
import { EventsPage } from './admin/EventsPage';
import { ServicesAdminPage } from './admin/ServicesPage';
import { MessagesPage } from './admin/MessagesPage';
import { SubscribersPage } from './admin/SubscribersPage';
import { PasswordResetRequestPage } from './admin/PasswordResetRequestPage';
import { PasswordResetConfirmPage } from './admin/PasswordResetConfirmPage';

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

/**
 * Animated route switcher.
 * Wraps each route in <PageTransition> for the fade effect.
 * `mode="wait"` ensures the outgoing page finishes animating
 * before the incoming page mounts — no overlap, no flicker.
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <PageTransition>
              <PublicHome />
            </PageTransition>
          }
        />

        {/* Standalone public pages */}
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <ServicesPage />
            </PageTransition>
          }
        />
        <Route
          path="/services/:slug"
          element={
            <PageTransition>
              <ServiceDetailPage />
            </PageTransition>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageTransition>
              <PublicGalleryPage />
            </PageTransition>
          }
        />
        <Route
          path="/events"
          element={
            <PageTransition>
              <PublicEventsPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />

        {/* Password reset */}
        <Route
          path="/reset-password"
          element={
            <PageTransition>
              <PasswordResetRequestPage />
            </PageTransition>
          }
        />
        <Route
          path="/reset-password/confirm"
          element={
            <PageTransition>
              <PasswordResetConfirmPage />
            </PageTransition>
          }
        />

        {/* Legacy alias */}
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />

        {/* Protected admin — no PageTransition here, sidebar stays put */}
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
          <Route path="services" element={<ServicesAdminPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="subscribers" element={<SubscribersPage />} />
        </Route>

        {/* Catch-all → homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;