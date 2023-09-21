import React from 'react';

const PeopleList = ({ people }) => {
  return (
    <div>
      <ul>
        {people.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;