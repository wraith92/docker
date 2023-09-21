
import React, { useState, useEffect } from 'react';
import PeopleList from './PeopleList';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/people')
      .then(response => response.json())
      .then(data => {
        setPeople(data.people);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const [people, setPeople] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Liste des Personnes</h1>
        {loading && <p>Chargement en cours...</p>}
        {error && <p>Une erreur s'est produite : {error.message}</p>}
        {!loading && !error && <PeopleList people={people} />}
      </header>
    </div>
  );
};

export default App;
