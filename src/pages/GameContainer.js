import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Leaderboard from './Leaderboard';
import EndGame from './EndGame';
import Pregame from './Pregame';
import Host from './Host';
import Profile from './Profile';

export default function Container() {
  const [currentPage, setCurrentPage] = useState('Pregame');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Pregame') {
      return <Pregame />;
    }
    if (currentPage === 'Leaderboard') {
      return <Leaderboard />;
    }
    if (currentPage === 'EndGame') {
      return <EndGame />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      {/* <Navbar currentPage={currentPage} handlePageChange={handlePageChange} /> */}
      <button type='button'>Quit</button>
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
    </div>
  );
}