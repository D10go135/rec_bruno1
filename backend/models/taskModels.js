const db = require('\database\db.js');

const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM tasks');
  return rows;
};

const create = async ({ titulo, descricao }) => {
  const [result] = await db.query(
    'INSERT INTO tasks (titulo, descricao) VALUES (?, ?)',
    [titulo, descricao]
  );
  return result.insertId;
};

const update = async (id, { titulo, descricao, status }) => {
  const [result] = await db.query(
    'UPDATE tasks SET titulo = ?, descricao = ?, status = ? WHERE id = ?',
    [titulo, descricao, status, id]
  );
  return result;
};

const remove = async (id) => {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
};

module.exports = { getAll, create, update, remove };
