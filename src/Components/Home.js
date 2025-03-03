import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users"); // Ensure this matches your backend route
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email} | <strong>Role:</strong> {user.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

