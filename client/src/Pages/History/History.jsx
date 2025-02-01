import React from 'react';
import './History.css';

const History = () => {
  const historyItems = [
    { id: 1, name: 'FLOWER 1', date: 'time and date' },
    { id: 2, name: 'FLOWER 2', date: 'time and date' },
    { id: 3, name: 'FLOWER 3', date: 'time and date' },
    { id: 4, name: 'FLOWER 4', date: 'time and date' },
    { id: 5, name: 'FLOWER 5', date: 'time and date' },
    { id: 6, name: 'FLOWER 6', date: 'time and date' },
    { id: 7, name: 'FLOWER 7', date: 'time and date' },
    { id: 8, name: 'FLOWER 8', date: 'time and date' },
    { id: 9, name: 'FLOWER 9', date: 'time and date' },
    { id: 10, name: 'FLOWER 10', date: 'time and date' },
    { id: 11, name: 'FLOWER 11', date: 'time and date' },
  ];

  return (
    <div className="history-page">
      <h2>HISTORY</h2>
      <ul className="history-list">
        {historyItems.map((item) => (
          <li key={item.id} className="history-item">
            <div className="history-name">{item.name}</div>
            <div className="history-date">{item.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
