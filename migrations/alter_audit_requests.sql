-- Periksa dan pastikan bahwa kolom auditee_id memiliki indeks
-- Jika tidak memiliki indeks, tambahkan indeks terlebih dahulu
ALTER TABLE audit_requests
ADD INDEX idx_auditee_id (auditee_id);

-- Coba tambahkan foreign key constraint baru
-- Jika constraint sudah ada, MySQL akan menampilkan error
-- yang perlu diselesaikan secara manual
ALTER TABLE audit_requests
ADD CONSTRAINT audit_requests_auditee_id_foreign
FOREIGN KEY (auditee_id) REFERENCES users(id)
ON DELETE SET NULL
ON UPDATE CASCADE; 