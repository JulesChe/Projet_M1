import React, { useState, FormEvent, ChangeEvent } from 'react';
import { updateRole } from '../routes/neo4j.ts';

interface Accesses {
  create: boolean;
  modify: boolean;
  view: boolean;
  delete: boolean;
}

const UpdateRole: React.FC = () => {
  const [name, setName] = useState<string>(''); // Nom du rôle à mettre à jour
  const [accesses, setAccesses] = useState<Accesses>({
    create: false,
    modify: false,
    view: false,
    delete: false,
  }); // Permissions associées au rôle
  const [roleExists, setRoleExists] = useState<boolean | null>(null); // État pour l'existence du rôle

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const selectedAccesses = Object.keys(accesses).filter(
      (access) => accesses[access as keyof Accesses]
    );

    try {
      // Appel de la fonction `updateRole`
      const result = await updateRole(name, selectedAccesses);

      if (result === 'Role does not exist') {
        setRoleExists(false);
        return;
      }

      if (result === 'Role updated successfully') {
        setRoleExists(true);
        setName('');
        setAccesses({ create: false, modify: false, view: false, delete: false });
      } else {
        alert('Erreur inconnue lors de la mise à jour du rôle.');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleAccessChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAccesses((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setRoleExists(null); // Réinitialise l'état de l'existence du rôle
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Mettre à jour un rôle</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du rôle</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange} // Utilise handleNameChange au lieu de setName directement
            required
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="Entrez le nom du rôle"
          />
          {roleExists === false && (
            <p className="text-red-500 text-sm mt-2">Le rôle spécifié n'existe pas.</p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Modifier les permissions</p>
          {Object.keys(accesses).map((access) => (
            <label className="flex items-center" key={access}>
              <input
                type="checkbox"
                name={access}
                checked={accesses[access as keyof Accesses]}
                onChange={handleAccessChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 capitalize">{access}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          disabled={roleExists === false}
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateRole;
