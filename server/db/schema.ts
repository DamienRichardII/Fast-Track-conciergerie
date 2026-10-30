import { db } from "./pool";

/** Schéma idempotent : appliqué automatiquement au premier accès (et via `npm run db:migrate`). */
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL DEFAULT '',
  phone       TEXT NOT NULL DEFAULT '',
  password    TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client','admin')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS requests (
  id          BIGSERIAL PRIMARY KEY,
  ref         TEXT NOT NULL UNIQUE,
  user_id     BIGINT REFERENCES users(id) ON DELETE SET NULL,
  service     TEXT NOT NULL,
  client_name TEXT NOT NULL DEFAULT '',
  email       TEXT NOT NULL DEFAULT '',
  phone       TEXT NOT NULL DEFAULT '',
  start_date  DATE,
  end_date    DATE,
  participants INT,
  status      TEXT NOT NULL DEFAULT 'Nouvelle',
  notes       TEXT NOT NULL DEFAULT '',
  data        JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS requests_status_idx ON requests(status);
CREATE INDEX IF NOT EXISTS requests_user_idx ON requests(user_id);
CREATE INDEX IF NOT EXISTS requests_email_idx ON requests(lower(email));

CREATE TABLE IF NOT EXISTS messages (
  id          BIGSERIAL PRIMARY KEY,
  ref         TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL DEFAULT '',
  subject     TEXT NOT NULL DEFAULT '',
  body        TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experiences (
  slug        TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  place       TEXT NOT NULL,
  duration    TEXT NOT NULL,
  body        TEXT NOT NULL,
  includes    JSONB NOT NULL DEFAULT '[]',
  note        TEXT NOT NULL DEFAULT '',
  visible     BOOLEAN NOT NULL DEFAULT true,
  position    INT NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

let ready: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  ready ??= db().query(SCHEMA).then(() => undefined).catch((e) => { ready = null; throw e; });
  return ready;
}
