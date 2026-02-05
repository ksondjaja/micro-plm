import pg from 'pg';
import { Connector } from '@google-cloud/cloud-sql-connector';
import gcloudKeys from './gcloudKeys.json' with { type: "json" };

const {Pool} = pg;

const connector = new Connector();
const clientOpts = await connector.getOptions({
  instanceConnectionName: gcloudKeys.connectionName,
  ipType: 'PUBLIC',
  authType: 'IAM'
});

const pool = new Pool({
  ...clientOpts,
  user: gcloudKeys.IAMUser,
  password: gcloudKeys.password,
  database: gcloudKeys.database,
  max: 5,
});

console.log(gcloudKeys.connectionName);

export const getStyles = async() => {
  const q = 'SELECT * FROM styles;';

  return await pool.query(q);
}

export const getStyleById = async(styleId: number) => {
  const q = 'SELECT * FROM styles WHERE id = $1;';
  const a = styleId;

  return await pool.query(q, a);
}

export const getStylePersonByStyleId = async(styleId: number) => {
  const q = 'SELECT * FROM style_person WHERE style_id = $1;';
  const a = styleId;

  return await pool.query(q, a);
}

export const getPersonById = async(personId: number) => {
  const q = 'SELECT * FROM person WHERE id = $1;';
  const a = personId;

  return await pool.query(q, a);
}


await pool.end();
connector.close();