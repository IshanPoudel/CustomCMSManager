import React, { useEffect, useState } from 'react';

const Ecommerce = () => {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    // Fetch API data
    fetch('https://rapiddb.link/19bc9_get_char')
      .then(response => response.json())
      .then(data => {
        setCharacterData(data.result);
      })
      .catch(error => {
        console.error('Error fetching character data:', error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {characterData.map(character => (
        <div key={character.int} className="m-4">
          <img src={character.image} alt={character.name} className="w-40 h-40" />
          <div className="text-center mt-2">{character.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Ecommerce;
