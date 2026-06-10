CREATE DATABASE IF NOT EXISTS plasticflow;
USE plasticflow;

CREATE TABLE IF NOT EXISTS plants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'online',
  output_tons INT NOT NULL DEFAULT 0
);

INSERT INTO plants (name, status, output_tons) VALUES
  ('Houston Polymer Hub', 'online', 612),
  ('Rotterdam Petrochem', 'online', 758),
  ('Mumbai Compounding', 'warning', 412),
  ('Singapore Resins', 'online', 540),
  ('Shanghai Advanced Materials', 'online', 685),
  ('São Paulo Polymers', 'online', 498);
