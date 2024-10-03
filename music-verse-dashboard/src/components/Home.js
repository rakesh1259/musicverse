// HomePage.js
import React from 'react';
const HomePage = () => {
  return (
    <div className="text-white min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[75vh]">
        <div className="max-w-xl">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome to Music Verse
          </h1>
          <p className="mt-4 text-lg">
            Explore a world of melodies and rhythms. Your journey into music starts here!
          </p>
          <a
            href="/songs"
            className="mt-8 inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Discover Music
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Personalized Playlists</h3>
              <p>Your favorite songs curated just for you. Enjoy personalized playlists tailored to your taste!</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Discover New Artists</h3>
              <p>Find new and emerging artists that match your musical preferences. Explore a vast library!</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Seamless Streaming</h3>
              <p>Enjoy smooth and uninterrupted music streaming anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose Us?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Music Verse is more than just a music app. It's a community where music lovers can share, discover, and enjoy the art of sound.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
