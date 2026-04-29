import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('https://your-backend-url.com/api/profiles', {
          headers: { 'X-API-Version': '1' },
          withCredentials: true // MANDATORY for HTTP-only cookies
        });
        setProfiles(response.data.data);
      } catch (err) {
        console.error("Not authorized or session expired");
        // Optional: window.location.href = '/';
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Profile Intelligence Dashboard</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.gender}</td>
              <td>{p.age}</td>
              <td>{p.country_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;