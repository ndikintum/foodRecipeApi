const pool = require('../db/db');

async function getAllRecipes(req, res) {
  try {
    const query = 'SELECT * FROM recipes';
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getRecipeById(req, res) {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM recipes WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createRecipe(req, res) {
  const { name, ingredients, instructions } = req.body;
  try {
    const query = 'INSERT INTO recipes (name, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [name, ingredients, instructions]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateRecipe(req, res) {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  try {
    const query = 'UPDATE recipes SET name = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *';
    const { rows } = await pool.query(query, [name, ingredients, instructions, id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteRecipe(req, res) {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM recipes WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.status(204).send(); // No content to send after successful deletion
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
