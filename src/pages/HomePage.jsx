import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Award, Zap, ShieldCheck, Smile } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center md:text-left md:w-3/5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Host & Compete in <span className="text-accent-400">Tournaments</span> Like Never Before
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 animate-slide-up">
              Create tournaments, manage participants, run auctions, and track real-time results — all in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/features"
                className="bg-white text-primary-800 font-medium py-3 px-8 rounded-lg transition-colors duration-300 hover:bg-neutral-100"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-primary-800 border-t border-primary-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">1000+</p>
                <p className="text-neutral-300 mt-1 text-sm md:text-base">Tournaments Hosted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">50k+</p>
                <p className="text-neutral-300 mt-1 text-sm md:text-base">Active Players</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">10+</p>
                <p className="text-neutral-300 mt-1 text-sm md:text-base">Sports Supported</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">99%</p>
                <p className="text-neutral-300 mt-1 text-sm md:text-base">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Powerful Tournament Management</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Everything you need to run successful tournaments, from registration to results tracking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Tournament Creation</h3>
              <p className="text-neutral-600">
                Create customized tournaments with unique joining codes, sport selection, and flexible scheduling options.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="bg-accent-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Team Auction System</h3>
              <p className="text-neutral-600">
                Our innovative auction system ensures fair team formations with virtual currency and real-time bidding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="bg-secondary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Game Integrations</h3>
              <p className="text-neutral-600">
                Direct integrations with popular games like Chess and Ludo for seamless match tracking and results.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="bg-success-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Real-time Updates</h3>
              <p className="text-neutral-600">
                Get instant notifications for match results, tournament updates, and auction activities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="bg-warning-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Secure Platform</h3>
              <p className="text-neutral-600">
                Advanced security measures protect user data and ensure fair play throughout tournaments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="bg-error-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Smile className="h-6 w-6 text-error-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Player Profiles</h3>
              <p className="text-neutral-600">
                Detailed player stats, match history, and achievements to track progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">How It Works</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Getting started with TourneyPro is simple — create an account, set up your tournament, and invite players
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Sign Up</h3>
              <p className="text-neutral-600">
                Create a host account to organize tournaments or a player account to participate in competitions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Set Up Tournament</h3>
              <p className="text-neutral-600">
                Choose sports, set rules, generate a unique code, and customize your tournament structure.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900">Invite & Compete</h3>
              <p className="text-neutral-600">
                Share your tournament code, manage registrations, and start tracking results in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Host Your First Tournament?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of organizers who trust TourneyPro for their tournament management needs.
          </p>
          <Link
            to="/register"
            className="bg-white text-accent-600 font-medium py-3 px-8 rounded-lg hover:bg-neutral-100 transition-colors duration-300 transform hover:scale-105"
          >
            Get Started - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;