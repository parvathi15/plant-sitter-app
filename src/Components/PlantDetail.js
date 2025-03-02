import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import BookingRequestForm from '../bookings/BookingRequestForm';

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { plantId } = useParams();
  const { user } = useAuth();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchPlantAndOwner = async () => {
      try {
        setLoading(true);
        const plantResponse = await axios.get(`/api/plants/${plantId}`);
        setPlant(plantResponse.data);
        
        const ownerResponse = await axios.get(`/api/users/${plantResponse.data.owner}`);
        setOwner(ownerResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load plant details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPlantAndOwner();
  }, [plantId]);

  if (loading) return <div className="text-center py-10">Loading plant details...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!plant) return <div className="text-center py-10">Plant not found</div>;

  const isOwner = user && user.id === plant.owner;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Plant Images */}
          <div className="p-6">
            <div className="relative h-80 overflow-hidden rounded-lg">
              <img 
                src={plant.images[activeImage] || 'https://via.placeholder.com/600x400?text=No+Image'} 
                alt={plant.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {plant.images.length > 1 && (
              <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
                {plant.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 ${index === activeImage ? 'ring-2 ring-green-500' : ''}`}
                  >
                    <img src={image} alt={`${plant.name} thumbnail ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plant Details */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">{plant.name}</h1>
            <p className="text-lg text-gray-600 italic">{plant.species}</p>
            
            <div className="flex items-center mt-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 mr-2">
                {plant.careLevel}
              </span>
              {plant.isIndoor && (
                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 mr-2">
                  Indoor
                </span>
              )}
              {!plant.isIndoor && (
                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800 mr-2">
                  Outdoor
                </span>
              )}
              <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800">
                {plant.size}
              </span>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">About this plant</h2>
              <p className="mt-2 text-gray-700">{plant.description}</p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Care Instructions</h2>
              <div className="mt-2 grid grid-cols-1 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700"><span className="font-medium">Watering:</span> {plant.careInstructions.watering}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700"><span className="font-medium">Sunlight:</span> {plant.careInstructions.sunlight}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700"><span className="font-medium">Temperature:</span> {plant.careInstructions.temperature}</p>
                  </div>
                </div>
                {plant.careInstructions.additionalNotes && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700"><span className="font-medium">Additional notes:</span> {plant.careInstructions.additionalNotes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Location</h2>
              <p className="mt-1 text-gray-700">{plant.location}</p>
            </div>
            
            <div className="mt-6 flex items-baseline">
              <span className="text-3xl font-bold text-green-600">${plant.pricePerDay}</span>
              <span className="ml-1 text-gray-600">/day</span>
            </div>
            
            {owner && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Plant Owner</h2>
                <Link to={`/users/${owner.id}`} className="mt-2 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={owner.profileImage || 'https://via.placeholder.com/100'} 
                      alt={`${owner.firstName} ${owner.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{owner.firstName} {owner.lastName}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500">{owner.ratings?.average.toFixed(1) || 'N/A'}</span>
                      <span className="ml-1 text-xs text-gray-600">({owner.ratings?.count || 0} reviews)</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            
            <div className="mt-8 space-x-3">
              {!isOwner && user && (
                <button 
                  onClick={() => setShowBookingForm(!showBookingForm)}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm"
                >
                  {showBookingForm ? 'Cancel' : 'Book This Plant'}
                </button>
              )}
              {!isOwner && user && (
                <Link to={`/messages/new?recipient=${plant.owner}&plantId=${plant.id}`} className="px-6 py-3 bg-white hover:bg-gray-50 text-green-600 font-medium rounded-md shadow-sm border border-green-600">
                  Contact Owner
                </Link>
              )}
              {isOwner && (
                <Link to={`/plants/edit/${plant.id}`} className="px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-medium rounded-md shadow-sm border border-blue-600">
                  Edit Plant
                </Link>
              )}
            </div>
            
            {showBookingForm && (
              <div className="mt-6">
                <BookingRequestForm plantId={plant.id} ownerId={plant.owner} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;