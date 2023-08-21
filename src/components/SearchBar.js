import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [appName, setAppName] = useState('');

  const handleChange = (e) => {
    setAppName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(appName);
    }
  };

  return (
    <input
      type="text"
      value={appName}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      placeholder="Search..."
    />
  );
}

export default SearchBar;
