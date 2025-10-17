
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.STUDENT_DASHBOARD:
        return <StudentDashboard />;
      case Page.ADMIN_DASHBOARD:
        return <AdminDashboard />;
      case Page.LANDING:
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-brand-dark to-gray-900 text-white font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentPage={currentPage} onNavigate={navigate} />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
