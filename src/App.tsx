import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Team {
  name: string;
}

interface Match {
  id: number;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
}

const API_URL = 'https://upcoming-soccer-matches-api.onrender.com/api/upcoming-matches';

const App: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<Match[]>(API_URL);
      setMatches(res.data);
    } catch (err) {
      setError('Failed to load matches. Please try again.');
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: 20, color: '#fff' }}>Loading matches...</p>;

  if (error)
    return (
      <div style={{ textAlign: 'center', padding: 20, color: 'red' }}>
        <p>{error}</p>
        <button onClick={fetchMatches}>Try Again</button>
      </div>
    );

  if (matches.length === 0)
    return <p style={{ textAlign: 'center', padding: 20, color: '#fff' }}>No upcoming matches found.</p>;

  return (
    <div className="container">
     <h1
  style={{
    textAlign: 'center',
    color: '#2c3e59',
    fontSize: '2.5rem',
    fontWeight: 700,
    letterSpacing: '1px',
    marginBottom: '2rem',
    textTransform: 'uppercase',
  }}
>
  ⚽Upcoming Soccer Matches
</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {matches.map(({ id, homeTeam, awayTeam, utcDate }) => (
          <li key={id} className="match-card">
            <div className="match-teams">{homeTeam.name} vs {awayTeam.name}</div>
            <div className="match-date">
              {new Date(utcDate).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
