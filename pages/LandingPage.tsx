
import React from 'react';
import { Page } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <Card className="text-center transition-all duration-300 hover:bg-white/10 hover:border-white/30 transform hover:-translate-y-2">
        <div className="mx-auto h-16 w-16 flex items-center justify-center bg-brand-secondary/20 text-brand-secondary rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </Card>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="text-center pt-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            AttendChain
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Transparent & Secure Attendance with RFID + Blockchain
        </p>
        <div className="flex justify-center items-center space-x-4">
          <Button onClick={() => onNavigate(Page.ADMIN_DASHBOARD)}>Admin Login</Button>
          <Button variant="secondary" onClick={() => onNavigate(Page.STUDENT_DASHBOARD)}>Student Login</Button>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why AttendChain?</h2>
            <p className="text-gray-400 mt-2">Discover the future of attendance tracking.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <Feature 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                title="Real-time Tracking"
                description="Instantaneous attendance updates using high-frequency RFID technology."
            />
            <Feature 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                title="Immutable Records"
                description="Every record is secured on the blockchain, making it tamper-proof and auditable."
            />
            <Feature 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>}
                title="Decentralized & Secure"
                description="No single point of failure. Data is distributed, ensuring high availability and security."
            />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
