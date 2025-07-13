-- Pastikan kolom auditee_id ada di tabel audit_requests
-- dan memiliki tipe data yang sama dengan users.id
-- Tambahkan indeks terlebih dahulu jika belum ada
ALTER TABLE audit_requests
ADD INDEX idx_auditee_id (auditee_id);

-- Lalu tambahkan foreign key constraint
ALTER TABLE audit_requests
ADD CONSTRAINT audit_requests_auditee_id_foreign
FOREIGN KEY (auditee_id) REFERENCES users(id)
ON DELETE SET NULL
ON UPDATE CASCADE; 