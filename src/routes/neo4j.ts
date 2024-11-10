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
