-- Fast Track Conciergerie — REMISE À ZÉRO. Supprime DÉFINITIVEMENT les 4 tables du site et leurs données.
-- N'affecte aucune autre table. À exécuter AVANT 01_schema.sql, uniquement sur le projet Fast Track.
DROP TABLE IF EXISTS requests CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS users CASCADE;
