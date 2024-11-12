import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { Layout } from '../components/Layout';
import { authProvider } from '../routes/authProvider';
import CreateRole from '../components/CreateRole';
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
  </Admin>
);

export default Home;
