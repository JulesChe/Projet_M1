import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { Layout } from '../components/Layout';
import { authProvider } from '../routes/authProvider';
import CreateRole from '../components/CreateRole';

// Page d'accueil intégrant le composant CreateRole et react-admin
const HomeWithCreateRole: React.FC = () => {
  return (
    <div className="App">
      <CreateRole />
    </div>
  );
};

const Home: React.FC = () => (
  <Admin layout={Layout} authProvider={authProvider}>
    <Resource
      name="root"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="create-role"
      list={HomeWithCreateRole}  
      options={{ label: "Créer un rôle" }}
    />
  </Admin>
);

export default Home;
