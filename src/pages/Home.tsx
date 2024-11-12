import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { Layout } from '../components/Layout';
import { authProvider } from '../routes/authProvider';
import CreateRole from '../components/CreateRole';
import UpdateRole from '../components/UpdateRole';
import RolesList from '../components/RolesList';
import CreateUser from '../components/CreateUser';

// Page for creating roles
const RoleCreationPage: React.FC = () => (
  <div className="App">
    <CreateRole />
  </div>
);

// Page for creating users
const UserCreationPage: React.FC = () => (
  <div className="App">
    <CreateUser />
  </div>
);

const HomeWithUpdateRole: React.FC = () => {
  return (
    <div className="App">
      <UpdateRole />
    </div>
  );
};

const HomeWithListRoles: React.FC = () => {
  return (
    <div className="App">
      <RolesList />
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
      list={RoleCreationPage}  
      options={{ label: "Create Role" }}
    />
    <Resource
      name="create-user"
      list={UserCreationPage}  
      options={{ label: "Create User" }}
    />
        <Resource
      name="update-role"
      list={HomeWithUpdateRole}  
      options={{ label: "Modifier un rôle" }}
    />
            <Resource
      name="affiche-role"
      list={HomeWithListRoles}  
      options={{ label: "Liste des rôles" }}
    />
  </Admin>
);

export default Home;
