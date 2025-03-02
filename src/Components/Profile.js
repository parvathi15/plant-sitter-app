import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import UserPlantList from './UserPlantList';
// import UserReviews from './UserReviews';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('plants');
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user profile');
        setLoading(false);
        console.error(err);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="text-center py-10">Loading user profile...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!user) return <div className="text-center py-10">User not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-green-100 p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img 
              src={user.profileImage || 'https://via.placeholder.com/150'} 
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-600 capitalize">{user.role}</p>
            <div className="flex items-center justify-center md:justify-start mt-2">
              <span className="text-yellow-500 text-lg font-bold">{user.ratings?.average.toFixed(1) || 'N/A'}</span>
              <div className="flex ml-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(user.ratings?.average || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-gray-600">({user.ratings?.count || 0} reviews)</span>
            </div>
            <p className="mt-2">{user.bio}</p>
          </div>
          {user.role === 'sitter' && (
            <div className="ml-auto">
              <Link to={`/bookings/new/${user.id}`} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                Book as Sitter
              </Link>
            </div>
          )}
        </div>

        {/* Profile Navigation */}
        <div className="border-b">
          <nav className="flex">
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'plants' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('plants')}
            >
              Plants
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'about' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
          </nav>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {activeTab === 'plants' && <UserPlantList userId={userId} />}
          {activeTab === 'reviews' && <UserReviews userId={userId} />}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.phoneNumber || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.address?.city && user.address?.state 
                        ? `${user.address.city}, ${user.address.state}` 
                        : 'Not provided'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Member since</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>

              {user.role === 'sitter' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Sitter Information</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Preferred Plants</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.preferredPlants?.length > 0 
                          ? user.preferredPlants.join(', ') 
                          : 'All plants'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Verification</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.isVerified 
                          ? 'Verified ✓' 
                          : 'Not verified'}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;