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


export async function updateRole(name: string, newAccesses: string[]): Promise<string> {
  const session: Session = driver.session();
  try {
    // Vérifie si le rôle existe
    const exists = await roleExists(name);
    if (!exists) {
      console.log(`Role with name "${name}" does not exist.`);
      return 'Role does not exist'; // Retourne un message explicite
    }

    // Met à jour le rôle si le rôle existe
    await session.run(
      `
      MATCH (r:Role {name: $name})
      SET r.accesses = apoc.coll.toSet(r.accesses + $newAccesses)
      RETURN r
      `,
      { name, newAccesses }
    );

    console.log('Role updated successfully');
    return 'Role updated successfully'; // Retourne un message de succès
  } catch (error) {
    console.error('Error updating role:', error);
    throw error; // Relance l'erreur pour qu'elle soit capturée en amont
  } finally {
    await session.close();
  }
}


export async function roleExists(name: string): Promise<boolean> {
  const session: Session = driver.session();
  try {
    const result = await session.run(
      'MATCH (r:Role {name: $name}) RETURN COUNT(r) as count',
      { name }
    );

    const count = result.records[0].get('count').toInt();
    return count > 0; // Retourne true si le rôle existe
  } catch (error) {
    console.error('Error checking if role exists:', error);
    throw error;
  } finally {
    await session.close();
  }
}