import neo4j, { Driver, Session } from 'neo4j-driver';

const driver: Driver = neo4j.driver(
  'neo4j+s://neo4j.projetm1.makeprops-dev.com:8443',
  neo4j.auth.basic('neo4j', 'GS47Xe8CPgix7NzJ')
);

export async function createRole(name: string, accesses: string[]): Promise<void> {
  const session: Session = driver.session();
  try {
    await session.run(
      'CREATE (r:Role {name: $name, accesses: $accesses}) RETURN r',
      { name, accesses }
    );
    console.log('Role created successfully');
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  } finally {
    await session.close();
  }
}

export async function getRoles(): Promise<{ name: string }[]> {
  const session: Session = driver.session();
  try {
    const result = await session.run('MATCH (r:Role) RETURN r.name AS name');
    return result.records.map((record) => ({ name: record.get('name') }));
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  } finally {
    await session.close();
  }
}

export async function createUser(username: string, password: string, fullName: string, roleName: string): Promise<void> {
  const session: Session = driver.session();
  try {
    await session.run(
      'MATCH (r:Role {name: $roleName}) CREATE (u:User {username: $username, password: $password, fullName: $fullName})-[:HAS_ROLE]->(r) RETURN u',
      { username, password, fullName, roleName }
    );
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    await session.close();
  }
}

export async function getUserByUsername(username: string): Promise<any> {
  const session: Session = driver.session();
  try {
    const result = await session.run(
      'MATCH (u:User {username: $username})-[:HAS_ROLE]->(r:Role) RETURN u.username AS username, u.password AS password, u.fullName AS fullName, r.name AS role',
      { username }
    );
    if (result.records.length > 0) {
      const record = result.records[0];
      return {
        username: record.get('username'),
        password: record.get('password'),
        fullName: record.get('fullName'),
        role: record.get('role'),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  } finally {
    await session.close();
  }
}