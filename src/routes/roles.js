// routes/roles.js
const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'neo4j+s://neo4j.projetm1.makeprops-dev.com:8443',
  neo4j.auth.basic('neo4j', 'GS47Xe8CPgix7NzJ')
);

router.post('/create-role', async (req, res) => {
  const { name, accesses } = req.body;

  const session = driver.session();
  try {
    const result = await session.run(
      `
      CREATE (r:Role {name: $name})
      WITH r
      UNWIND $accesses AS access
      CREATE (r)-[:ACCESS {right: access}]->(a:Activity {name: access})
      RETURN r
      `,
      { name, accesses }
    );

    res.status(200).json({ message: 'Rôle créé avec succès', role: result.records[0].get('r').properties });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du rôle', details: error.message });
  } finally {
    await session.close();
  }
});

module.exports = router;
