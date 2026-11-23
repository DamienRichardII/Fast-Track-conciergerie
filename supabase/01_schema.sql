-- Fast Track Conciergerie — schéma (idempotent). À exécuter dans Supabase → SQL Editor.

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

-- Paiement SumUp (montant fixé par l'admin sur la demande, statut mis à jour par SumUp).
ALTER TABLE requests ADD COLUMN IF NOT EXISTS pay_amount      NUMERIC(10,2);
ALTER TABLE requests ADD COLUMN IF NOT EXISTS pay_status      TEXT NOT NULL DEFAULT '';
ALTER TABLE requests ADD COLUMN IF NOT EXISTS pay_checkout_id TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS paid_at         TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS requests_checkout_idx ON requests(pay_checkout_id);

-- Supabase expose le schéma public via l'API REST : on verrouille tout (RLS sans politique).
-- Le site accède à la base par connexion Postgres directe (rôle postgres), qui contourne la RLS.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON users, requests, messages, experiences FROM anon, authenticated;
    REVOKE ALL ON SEQUENCE users_id_seq, requests_id_seq, messages_id_seq FROM anon, authenticated;
  END IF;
END $$;
