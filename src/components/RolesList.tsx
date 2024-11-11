import React, { useEffect, useState } from 'react';
import { getAllRoles, deleteRole } from '../routes/neo4j.ts'; // Import des fonctions

interface Role {
  name: string;
  accesses: string[];
}

const RolesList: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]); // Liste des rôles
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Message d'erreur

  // Fonction pour supprimer les doublons
  const removeDuplicates = (roles: Role[]): Role[] => {
    const seen = new Set();
    return roles.filter((role) => {
      if (seen.has(role.name)) {
        return false;
      }
      seen.add(role.name);
      return true;
    });
  };

  // Fonction pour récupérer les rôles
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const rolesData = await getAllRoles();
      console.log(rolesData);
      const uniqueRoles = removeDuplicates(rolesData); // Filtre les doublons
      setRoles(uniqueRoles);
      setError(null);
    } catch (err: any) {
      setError('Erreur lors du chargement des rôles.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un rôle
  const handleDelete = async (name: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le rôle "${name}" ?`)) {
      return;
    }

    try {
      await deleteRole(name); // Appel de la fonction `deleteRole`
      setRoles((prevRoles) => prevRoles.filter((role) => role.name !== name)); // Mise à jour locale
    } catch (err: any) {
      alert('Erreur lors de la suppression du rôle.');
      console.error(err);
    }
  };

  // Récupération des rôles lors du montage du composant
  useEffect(() => {
    fetchRoles();
  }, []);

  if (loading) {
    return <p>Chargement des rôles...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erreur : {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Liste des rôles</h1>

      {roles.length === 0 ? (
        <p>Aucun rôle trouvé.</p>
      ) : (
        <ul className="w-full max-w-md space-y-4">
        {roles.map((role, index) => (
          <li
            key={`${role.name}-${index}`}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-2"
          >
            <h2 className="text-lg font-semibold text-gray-500">{role.name}</h2>
            <p className="text-gray-700">
              Permissions : {role.accesses.join(', ') || 'Aucune'}
            </p>
            <button
              onClick={() => handleDelete(role.name)}
              className="bg-red-600 text-white p-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      
      )}
    </div>
  );
};

export default RolesList;
