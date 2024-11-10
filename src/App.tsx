import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";

export const App = () => (
  <Admin layout={Layout} authProvider={authProvider}>
    <Resource
      name="root"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="root"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      options={{ label: "Créer un rôle" }}
    />
  </Admin>
);
