import React from 'react';
import JeffLanding from './components/JeffLanding';

const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/draftsol.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 w-full min-h-screen">
        <JeffLanding />
      </div>
    </div>
  );
};

export default App;