import React, { useState, FormEvent, ChangeEvent } from 'react';
import { createRole } from '../routes/neo4j.ts';

interface Accesses {
  create: boolean;
  modify: boolean;
  view: boolean;
  delete: boolean;
}

const CreateRole: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [accesses, setAccesses] = useState<Accesses>({
    create: false,
    modify: false,
    view: false,
    delete: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const selectedAccesses = Object.keys(accesses).filter(
      (access) => accesses[access as keyof Accesses]
    );
    try {
      await createRole(name, selectedAccesses);
      alert('Role created successfully');
      setName('');
      setAccesses({ create: false, modify: false, view: false, delete: false });
    } catch (error) {
      console.error('Error creating role:', error);
      alert('Failed to create role');
    }
  };

  const handleAccessChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          {Object.keys(accesses).map((access) => (
            <label className="flex items-center" key={access}>
              <input
                type="checkbox"
                name={access}
                checked={accesses[access as keyof Accesses]}
                onChange={handleAccessChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 capitalize">{access} Activity</span>
            </label>
          ))}
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
