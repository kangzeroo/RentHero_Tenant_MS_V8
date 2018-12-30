CREATE TABLE tenants (
  tenant_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone_number TEXT,
  national_format TEXT,
  country_code TEXT,
  authenticated BOOLEAN,
  meta TEXT,
  last_login TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT tenant_uq UNIQUE (tenant_id),
  CONSTRAINT tenant_phone_uq UNIQUE (phone_number),
  CONSTRAINT tenant_email_uq UNIQUE (email)
);

CREATE TABLE tenant_favorites (
  id BIGSERIAL PRIMARY KEY,
  tenant_id TEXT REFERENCES tenants(tenant_id) ON DELETE CASCADE,
  property_id TEXT,
  meta TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT tenant_favorites_uq UNIQUE (tenant_id, property_id)
);
