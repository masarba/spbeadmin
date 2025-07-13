ALTER TABLE audit_requests
ADD CONSTRAINT audit_requests_auditee_id_foreign
FOREIGN KEY (auditee_id) REFERENCES users(id)
ON DELETE SET NULL
ON UPDATE CASCADE; 