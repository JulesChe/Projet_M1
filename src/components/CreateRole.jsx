import React, { useState } from 'react';
import { createRole } from '../routes/neo4j';

const CreateRole = () => {
  const [name, setName] = useState('');
  const [accesses, setAccesses] = useState({
    create: false,
    modify: false,
    view: false,
    delete: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedAccesses = Object.keys(accesses).filter(access => accesses[access]);
    try {
      await createRole(name, selectedAccesses);
      alert('Role created successfully');
      setName(''); // Reset the name field
      setAccesses({ create: false, modify: false, view: false, delete: false }); // Reset checkboxes
    } catch (error) {
      console.error('Error creating role:', error);
      alert('Failed to create role');
    }
  };

  const handleAccessChange = (e) => {
    const { name, checked } = e.target;
    setAccesses((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Create a New Role</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="Enter role name"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Select Access Permissions</p>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="create"
              checked={accesses.create}
              onChange={handleAccessChange}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Create Activity</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="modify"
              checked={accesses.modify}
              onChange={handleAccessChange}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Modify Activity</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="view"
              checked={accesses.view}
              onChange={handleAccessChange}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">View Activity</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="delete"
              checked={accesses.delete}
              onChange={handleAccessChange}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Delete Activity</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Create Role
        </button>
      </form>
    </div>
  );
};

export default CreateRole;