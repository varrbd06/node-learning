import pool from "../db.js"

export async function readStats(filters = {}) {
  const { username = null, status = null } = filters;
  const params = [username, status];

  const where = `
    WHERE ($1::text IS NULL OR username = $1)
    AND ($2::text IS NULL OR status = $2) 
  `

  const totalQ = await pool.query(`SELECT COUNT(*) FROM logs ${where}`, params);
  const failedQ = await pool.query(`SELECT COUNT(*) FROM logs ${where} AND status = 'fail'`, params);
  const byUserQ = await pool.query(
    `SELECT username, COUNT(*) FROM logs ${where} GROUP BY username`,
    params
  );
  
  const total = Number(totalQ.rows[0].count);
  const failed = Number(failedQ.rows[0].count);
  const byUser = byUserQ.rows.reduce((acc, r) => {
    acc[r.username] = Number(r.count);
    return acc;
  }, {});

  return { total, failed, byUser };
}

export async function getById(id) {
  const res = await pool.query('SELECT * FROM logs WHERE id = $1', [id])
  return res.rows[0];
}

export async function create(data) {
  const {date, username, action, status} = data;
  const res = await pool.query('INSERT INTO logs (date, username, action, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [date, username, action, status]
  );

  return res.rows[0];
}

export async function remove(id) {
  const res = await pool.query("DELETE FROM logs WHERE id = $1", [id]);
  return res.rowCount > 0;
}