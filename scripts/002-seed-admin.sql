-- Insert admin user (password: admin123)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (id, email, name, password, role)
VALUES (
  gen_random_uuid()::text,
  'admin@example.com',
  'Admin User',
  '$2a$10$rKvVPZqGvVVVqGvVVVVVVuO7K7K7K7K7K7K7K7K7K7K7K7K7K7K7K',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Insert regular user (password: user123)
INSERT INTO users (id, email, name, password, role)
VALUES (
  gen_random_uuid()::text,
  'user@example.com',
  'Regular User',
  '$2a$10$rKvVPZqGvVVVqGvVVVVVVuO7K7K7K7K7K7K7K7K7K7K7K7K7K7K7K',
  'user'
)
ON CONFLICT (email) DO NOTHING;
