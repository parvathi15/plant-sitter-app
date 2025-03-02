import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserPlantList = ({ userId }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/plants/user/${userId}`);
        setPlants(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load plants');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPlants();
  }, [userId]);

  if (loading) return <div className="text-center py-10">Loading plants...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (plants.length === 0) return <div className="text-center py-10">No plants listed yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plants.map((plant) => (
        <Link to={`/plants/${plant.id}`} key={plant.id} className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
            <div className="h-48 overflow-hidden">
              <img 
                src={plant.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
                alt={plant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600">{plant.name}</h3>
              <p className="text-sm text-gray-600 italic">{plant.species}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {plant.careLevel}
                </span>
                <span className="text-lg font-bold text-green-600">${plant.pricePerDay}/day</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserPlantList;
