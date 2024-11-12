import React, { useState, FormEvent, useEffect } from 'react';
import { createUser, getRoles } from '../routes/neo4j.ts';

interface Role {
  name: string;
}

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesList = await getRoles();
      setRoles(rolesList);
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUser(username, password, fullName, selectedRole);
      alert('User successfully created');
      setUsername('');
      setPassword('');
      setFullName('');
      setSelectedRole('');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Create a New User</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="Enter password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.name} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
