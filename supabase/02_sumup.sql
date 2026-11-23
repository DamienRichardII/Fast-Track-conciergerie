-- À exécuter UNE fois si 01_schema.sql a déjà été lancé avant l'ajout de SumUp (sans danger si relancé).

-- Paiement SumUp (montant fixé par l'admin sur la demande, statut mis à jour par SumUp).
ALTER TABLE requests ADD COLUMN IF NOT EXISTS pay_amount      NUMERIC(10,2);
ALTER TABLE requests ADD COLUMN IF NOT EXISTS pay_status      TEXT NOT NULL DEFAULT '';
ALTER TABLE requests ADD COLUMN IF NOT EXISTS pay_checkout_id TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS paid_at         TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS requests_checkout_idx ON requests(pay_checkout_id);
