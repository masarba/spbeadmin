<template>
  <div class="audit-results">
    <div class="header">
      <div class="title-section">
        <h1 class="audit-title">Hasil Audit</h1>
        <p class="subtitle">Sistem Informasi Audit Keamanan Siber yang membantu dalam pelaksanaan audit keamanan teknologi informasi.</p>
      </div>
      <div class="logo-section">
        <img src="/images/logopoltek.png" alt="Logo Politeknik" class="logo">
      </div>
    </div>
    <div class="audit-table-container">
      <table class="audit-table">
        <thead>
          <tr>
            <th>Audit ID</th>
            <th>Auditee</th>
            <th>Status</th>
            <th>File NDA</th>
            <th>Hasil Audit</th>
            <th>Pertanyaan & Jawaban</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- Data Pending -->
          <tr v-for="audit in pendingAudits" :key="'pending-'+audit.id" class="audit-row">
            <td>
              <span class="id-badge">#{{ audit.id }}</span>
            </td>
            <td>
              <div class="auditee-info">
                <span class="auditee-name">{{ audit.auditee?.username || "Tidak Diketahui" }}</span>
              </div>
            </td>
            <td>
              <span class="status-badge pending">{{ audit.status }}</span>
            </td>
            <td>
              <div class="file-actions">
                <button @click="downloadAuditeeNDA(audit)" class="btn-download">
                  <i class="fas fa-download"></i> Unduh NDA
                </button>
                <div v-if="!hasSignedNDA(audit)" class="upload-section">
                  <label class="custom-file-upload">
                    <input type="file" @change="handleFileChange($event, audit)" accept="application/pdf" />
                    <i class="fas fa-cloud-upload-alt"></i> Pilih File
                  </label>
                  <button 
                    @click="uploadSignedNDA(audit)" 
                    :disabled="!selectedFile || selectedFile.auditId !== audit.id"
                    class="btn-upload"
                  >
                    <i class="fas fa-file-signature"></i> Unggah Signed NDA
                  </button>
                </div>
                <div v-else class="file-status">
                  <i class="fas fa-check-circle text-success"></i>
                  <span>File Signed NDA telah diunggah</span>
                </div>
              </div>
            </td>
            <td>
              <div class="audit-status pending">
                <i class="fas fa-clock"></i>
                <span>Hasil audit belum tersedia</span>
              </div>
            </td>
            <td>
              <div class="qa-status pending">
                <i class="fas fa-question-circle"></i>
                <span>Belum ada pertanyaan tambahan</span>
              </div>
            </td>
            <td>
              <div class="action-buttons">
                <button @click="approveAudit(audit)" class="btn-approve">
                  <i class="fas fa-check"></i> Setujui
                </button>
                <button @click="rejectAudit(audit)" class="btn-reject">
                  <i class="fas fa-times"></i> Tolak
                </button>
              </div>
            </td>
          </tr>

          <!-- Data Answered -->
          <tr v-for="audit in answeredAudits" :key="'answered-'+audit.id" class="audit-row">
            <td>
              <span class="id-badge">#{{ audit.id }}</span>
            </td>
            <td>
              <div class="auditee-info">
                <span class="auditee-name">{{ audit.auditee?.username || "Tidak Diketahui" }}</span>
              </div>
            </td>
            <td>
              <span class="status-badge answered">{{ audit.status }}</span>
            </td>
            <td>
              <div class="file-actions">
                <button @click="downloadAuditeeNDA(audit)" class="btn-download">
                  <i class="fas fa-download"></i> Unduh NDA
                </button>
                <div v-if="audit.signed_nda" class="file-status">
                  <i class="fas fa-check-circle text-success"></i>
                  <span>File Signed NDA telah diunggah</span>
                </div>
              </div>
            </td>
            <td>
              <div v-if="audit.pdf_path" class="audit-status">
                <button @click="downloadAuditResult(audit.pdf_path)" class="btn-download">
                  <i class="fas fa-file-pdf"></i> Unduh Hasil Audit
                </button>
              </div>
              <div v-else class="audit-status pending">
                <i class="fas fa-clock"></i>
                <span>Hasil audit belum tersedia</span>
              </div>
            </td>
            <td>
              <div class="qa-section">
                <div v-if="audit.additional_answers && audit.additional_answers.length > 0">
                  <div v-for="(item, index) in audit.additional_answers" :key="index" class="qa-item">
                    <p class="question"><i class="fas fa-question"></i> {{ item.question }}</p>
                    <p class="answer"><i class="fas fa-comment"></i> {{ item.answer || 'Belum dijawab' }}</p>
                  </div>
                </div>
                <div v-else class="qa-status pending">
                  <i class="fas fa-question-circle"></i>
                  <span>Belum ada pertanyaan tambahan</span>
                </div>
              </div>
            </td>
            <td>
              <div class="action-buttons">
                <button @click="approveAudit(audit)" class="btn-approve">
                  <i class="fas fa-check"></i> Setujui
                </button>
                <button @click="rejectAudit(audit)" class="btn-reject">
                  <i class="fas fa-times"></i> Tolak
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    return {
      $q
    };
  },
  data() {
    return {
      pendingAudits: [],
      answeredAudits: [],
      additionalAnswers: [],
      selectedFile: null,
      additionalQuestions: {},
      isAuthenticated: false,
      userRole: null
    };
  },
  methods: {
    async checkAuth() {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      
      if (!token) {
        console.error("Token tidak ditemukan");
        return false;
      }

      this.isAuthenticated = true;
      this.userRole = role;
      
      // Set default axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return true;
    },
    
    async fetchPendingAudits() {
      try {
        if (!await this.checkAuth()) return;
        
        const response = await axios.get(
          "https://spbebackend-production.up.railway.app/api/auth/audit-requests/pending"
        );
        this.pendingAudits = response.data;
        console.log("Data pending audits:", response.data);
        
        // Log untuk debugging
        this.pendingAudits.forEach(audit => {
          console.log(`Audit ID ${audit.id}:`, {
            nda_document: audit.nda_document,
            signed_nda: audit.signed_nda
          });
        });
      } catch (error) {
        console.error("Gagal mengambil data audit pending:", error.response?.data || error);
        alert("Gagal mengambil data: " + (error.response?.data?.message || "Terjadi kesalahan"));
      }
    },
    async fetchAnsweredAudits() {
      try {
        const token = localStorage.getItem("token");

        // Ambil data audit yang telah dijawab
        const response1 = await axios.get(
          "https://spbebackend-production.up.railway.app/api/auth/audit-requests/answered",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Simpan data audit yang dijawab
        this.answeredAudits = response1.data;

        // Ambil jawaban tambahan untuk setiap audit
        for (let audit of this.answeredAudits) {
          // Ambil id audit
          const auditId = audit.id;

          // Ambil jawaban tambahan berdasarkan auditId
          const response2 = await axios.get(
            `https://spbebackend-production.up.railway.app/api/auth/audit-requests/${auditId}/additional-answers`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Simpan jawaban tambahan dalam audit yang sesuai
          audit.additional_answers = response2.data;
        }
      } catch (error) {
        console.error("Gagal mengambil data audit answered:", error);
        if (error.response && error.response.data) {
          console.error("Error details:", error.response.data);
        }
      }
    },
    handleFileChange(event, audit) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = { file, auditId: audit.id };
      }
    },
    async uploadSignedNDA(audit) {
      try {
        if (!await this.checkAuth()) return;

        if (!this.selectedFile || this.selectedFile.auditId !== audit.id) {
          alert("Pilih file Signed NDA yang valid.");
          return;
        }

        const formData = new FormData();
        
        // Log file yang akan dikirim
        console.log("Selected file:", this.selectedFile.file);
        
        // Pastikan file yang dipilih adalah PDF
        if (this.selectedFile.file.type !== 'application/pdf') {
          alert("File harus berformat PDF");
          return;
        }

        // Tambahkan file ke FormData dengan nama field yang benar
        formData.append("signed_nda", this.selectedFile.file, this.selectedFile.file.name);

        const token = localStorage.getItem("token");
        
        // Log FormData untuk debugging
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await axios.post(
          `https://spbebackend-production.up.railway.app/api/auth/audit-requests/${audit.id}/upload-signed-nda`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        console.log("Response upload:", response.data);
        
        if (response.data.success || response.status === 200) {
          alert("Signed NDA berhasil diunggah.");
          this.selectedFile = null;
          await this.fetchPendingAudits();
        } else {
          throw new Error(response.data.message || "Gagal mengunggah file");
        }
      } catch (error) {
        console.error("Gagal mengunggah Signed NDA:", error);
        console.log("Error response:", error.response?.data);
        
        const errorMessage = error.response?.data?.message 
          || error.response?.data?.errors?.signed_nda?.[0]
          || "Terjadi kesalahan saat mengunggah file";
          
        alert("Gagal mengunggah: " + errorMessage);
      }
    },
    async downloadAuditeeNDA(audit) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://spbebackend-production.up.railway.app/api/auth/audit-requests/${audit.id}/download-nda-auditee`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `NDA_Auditee_${audit.id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Gagal mendownload NDA auditee:", error);
        alert("Gagal mengunduh: " + (error.response?.data?.message || "Terjadi kesalahan"));
      }
    },
    async downloadAuditResult(pdfPath) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://spbebackend-production.up.railway.app/api/auth/audit-requests/${pdfPath}/download-audit-result`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `audit-result-${pdfPath}.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Gagal mengunduh file audit:", error);
        alert("Gagal mengunduh: " + (error.response?.data?.message || "Terjadi kesalahan"));
      }
    },
    async approveAudit(audit) {
      try {
        if (!await this.checkAuth()) return;
        
        // Log untuk debugging
        console.log('Data audit yang akan disetujui:', {
          id: audit.id,
          signed_nda: audit.signed_nda,
          nda_document: audit.nda_document
        });
        
        // Periksa apakah signed NDA sudah ada di database
        if (!audit.signed_nda) {
          alert('Anda harus mengunggah Signed NDA terlebih dahulu sebelum menyetujui audit.');
          return;
        }

        // Kirim request persetujuan
        const response = await axios.post(
          `https://spbebackend-production.up.railway.app/api/auth/audits/${audit.id}/approve`,
          {},
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Log response
        console.log('Response dari server:', response.data);
        
        alert(`Audit ID ${audit.id} telah disetujui.`);
        await this.fetchPendingAudits();
        await this.fetchAnsweredAudits();
        
      } catch (error) {
        console.error("Gagal menyetujui audit:", error.response?.data || error);
        console.log("Detail error:", {
          message: error.response?.data?.message,
          errors: error.response?.data?.errors
        });
        alert("Gagal menyetujui audit: " + (error.response?.data?.message || "Terjadi kesalahan"));
      }
    },
    async rejectAudit(audit) {
      try {
        if (!await this.checkAuth()) return;
        
        if (!confirm('Apakah Anda yakin ingin menolak audit ini? Data audit akan dihapus secara permanen.')) {
          return;
        }

        await axios.patch(
          `https://spbebackend-production.up.railway.app/api/auth/audit-requests/${audit.id}/reject`,
          {}
        );

        this.pendingAudits = this.pendingAudits.filter(a => a.id !== audit.id);
        this.answeredAudits = this.answeredAudits.filter(a => a.id !== audit.id);

        await this.fetchPendingAudits();
        await this.fetchAnsweredAudits();

        alert('Audit berhasil ditolak dan dihapus');
      } catch (error) {
        console.error('Gagal menolak audit:', error.response?.data || error);
        alert('Gagal menolak audit: ' + (error.response?.data?.message || "Terjadi kesalahan"));
      }
    },
    async submitAdditionalQuestions(auditId) {
      const questions = this.additionalQuestions[auditId];
      if (!questions) {
        alert("Pertanyaan tambahan tidak boleh kosong.");
        return;
      }

      try {
        await axios.post(
          `https://spbebackend-production.up.railway.app/api/auth/audit-requests/${auditId}/additional-questions`,
          { questions }
        );
        alert("Pertanyaan tambahan berhasil dikirim.");
        this.additionalQuestions[auditId] = "";
      } catch (error) {
        console.error("Gagal mengirim pertanyaan tambahan:", error);
      }
    },
  },
  async mounted() {
    if (await this.checkAuth()) {
      await this.fetchPendingAudits();
      await this.fetchAnsweredAudits();
    } else {
      alert("Anda harus login sebagai auditor untuk mengakses halaman ini");
      // Redirect to login if needed
      // this.$router.push('/login');
    }
  },
  computed: {
    hasSignedNDA() {
      return (audit) => {
        // Log untuk debugging
        console.log(`Checking NDA status for Audit ID ${audit.id}:`, {
          signed_nda: audit.signed_nda,
          nda_document: audit.nda_document,
          signed_nda_type: typeof audit.signed_nda,
          nda_document_type: typeof audit.nda_document
        });
        
        // Periksa apakah nilai tidak null dan tidak undefined
        if (audit.signed_nda === null || audit.signed_nda === undefined) {
          return false;
        }
        
        if (audit.nda_document === null || audit.nda_document === undefined) {
          return false;
        }

        // Periksa apakah ada nilai string yang valid
        const hasSignedNDA = typeof audit.signed_nda === 'string' && audit.signed_nda.trim() !== '';
        const hasNDADocument = typeof audit.nda_document === 'string' && audit.nda_document.trim() !== '';
        
        return hasSignedNDA || hasNDADocument;
      }
    }
  },
};
</script>

<style scoped>
.audit-results {
  padding: 2rem;
  background: linear-gradient(to right bottom, #ffffff, #f8f9fe);
  border-radius: 20px;
  min-height: calc(100vh - 4rem);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.header:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.title-section {
  flex: 1;
}

.audit-title {
  margin: 0;
  background: linear-gradient(45deg, #1e3c72 0%, #2a5298 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  margin: 1rem 0 0 0;
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
}

.logo-section {
  margin-left: 2rem;
}

.logo {
  height: 120px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.audit-table-container {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.audit-table-container:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.audit-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.audit-table th {
  background: linear-gradient(to right, #f8f9fa, #ffffff);
  color: #475569;
  font-size: 0.75rem;
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  border-bottom: 2px solid #e2e8f0;
}

.audit-table td {
  padding: 1.25rem 1.5rem;
  vertical-align: middle;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  font-size: 0.875rem;
}

.audit-row {
  transition: all 0.2s ease;
}

.audit-row:hover {
  background-color: #f8fafc;
  transform: translateY(-2px);
}

.id-badge {
  background: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.status-badge.pending {
  background: linear-gradient(45deg, #f2994a, #f2c94c);
  color: white;
}

.status-badge.answered {
  background: linear-gradient(45deg, #11998e, #38ef7d);
  color: white;
}

.file-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-download, .btn-upload {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn-download {
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
  color: white;
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.btn-upload {
  background: linear-gradient(45deg, #11998e, #38ef7d);
  color: white;
}

.btn-upload:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.btn-upload:disabled {
  background: linear-gradient(45deg, #cbd5e0, #e2e8f0);
  cursor: not-allowed;
  transform: none;
}

.custom-file-upload {
  display: inline-block;
  padding: 0.75rem 1rem;
  background: linear-gradient(45deg, #4b6cb7, #182848);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.custom-file-upload:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.custom-file-upload input[type="file"] {
  display: none;
}

.file-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-approve, .btn-reject {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn-approve {
  background: linear-gradient(45deg, #11998e, #38ef7d);
  color: white;
}

.btn-approve:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.btn-reject {
  background: linear-gradient(45deg, #eb3349, #f45c43);
  color: white;
}

.btn-reject:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.qa-section {
  max-width: 300px;
}

.qa-item {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.qa-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.qa-item p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.qa-item .question {
  color: #334155;
  font-weight: 600;
}

.qa-item .answer {
  color: #64748b;
}

.audit-status, .qa-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.audit-status.pending, .qa-status.pending {
  color: #f59e0b;
}

.text-success {
  color: #10b981;
}

i {
  font-size: 1rem;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
  }

  .logo-section {
    margin: 1.5rem 0 0 0;
  }

  .audit-table {
    display: block;
    overflow-x: auto;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>

