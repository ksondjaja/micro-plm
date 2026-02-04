import pg from 'pg';
import {Connector} from '@google-cloud/cloud-sql-connector';
import {SqlDatabasesServiceClient} from '@google-cloud/sql';
const {Pool} = pg;

const connector = new Connector();
const clientOpts = await connector.getOptions({
  instanceConnectionName: import.meta.env.VITE_GCLOUD_SQL_INSTANCE_CONNECTION_NAME,
  ipType: 'PUBLIC',
});
const pool = new Pool({
  ...clientOpts,
  user: import.meta.env.VITE_GCLOUD_SQL_USER,
  password: import.meta.env.VITE_GCLOUD_SQL_PASSWORD,
  database: import.meta.env.VITE_GCLOUD_SQL_DATABASE,
  max: 5,
});

const getStyles = async() => {
  return await pool.query('SELECT * FROM styles;');
}

const getStyleById = async(styleId: number) => {
  return await pool.query(`SELECT * FROM styles WHERE id = ${styleId};`);
}

const getStylePersonByStyleId = async(styleId: number) => {
  return await pool.query(`SELECT * FROM style_person WHERE style_id = ${styleId};`);
}

const getPersonById = async(personId: number) => {
  return await pool.query(`SELECT * FROM person WHERE id = ${personId};`);
}

module.exports = {
  getStyles,
  getStyleById,
  getStylePersonByStyleId,
  getPersonById
}


await pool.end();
connector.close();