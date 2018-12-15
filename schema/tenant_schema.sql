
CREATE TABLE tenants (
  tenant_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  email TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT tenant_uq UNIQUE (tenant_id),
  CONSTRAINT tenant_phone_uq UNIQUE (phone),
  CONSTRAINT tenant_email_uq UNIQUE (email)
);
