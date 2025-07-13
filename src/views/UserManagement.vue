<template>
  <div class="user-management">
    <!-- Header Section -->
    <div class="header-section mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="section-title">Manajemen Pengguna</h2>
        <button class="btn btn-primary" @click="openAddModal">
          <i class="fas fa-plus me-2"></i>Tambah Pengguna
        </button>
      </div>
      <div class="search-filter mt-3">
        <div class="row">
          <div class="col-md-4">
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
              <input 
                type="text" 
                class="form-control" 
                v-model="searchQuery"
                placeholder="Cari pengguna..."
                @input="handleSearch"
              >
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="roleFilter" @change="handleFilter">
              <option value="">Semua Role</option>
              <option value="auditor">Auditor</option>
              <option value="auditee">Auditee</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>
              <div class="d-flex align-items-center">
                <div class="user-avatar me-2">
                  {{ getInitials(user.username) }}
                </div>
                <div>
                  <div class="user-name">{{ user.username }}</div>
                  <small class="text-muted">ID: {{ user.id }}</small>
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="getRoleBadgeClass(user.role)">
                {{ user.role }}
              </span>
            </td>
            <td>
              <span :class="getStatusBadgeClass(user.status)">
                {{ user.status }}
              </span>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-primary" @click="editUser(user)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(user)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && filteredUsers.length === 0" class="text-center py-5">
      <i class="fas fa-users fa-3x text-muted mb-3"></i>
      <p class="text-muted">Tidak ada pengguna yang ditemukan</p>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" ref="userModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label">Nama Lengkap</label>
                <input type="text" class="form-control" v-model="form.name" required>
                <div class="invalid-feedback" v-if="errors.name">
                  {{ errors.name[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" v-model="form.username" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="form.email" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="form.password" :required="!isEditing">
                <small class="text-muted" v-if="isEditing">Kosongkan jika tidak ingin mengubah password</small>
                <div class="invalid-feedback" v-if="errors.password">
                  {{ errors.password[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Konfirmasi Password</label>
                <input type="password" class="form-control" v-model="form.password_confirmation" :required="!isEditing">
              </div>
              <div class="mb-3">
                <label class="form-label">Role</label>
                <select class="form-select" v-model="form.role" required>
                  <option value="auditor">Auditor</option>
                  <option value="auditee">Auditee</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select class="form-select" v-model="form.status">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Batal</button>
            <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="loading">
              {{ isEditing ? 'Simpan Perubahan' : 'Tambah Pengguna' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" ref="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Konfirmasi Hapus</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            Apakah Anda yakin ingin menghapus pengguna ini?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Batal</button>
            <button type="button" class="btn btn-danger" @click="deleteUser" :disabled="loading">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { Modal } from 'bootstrap'
import { useQuasar } from 'quasar'
import AdminService from '@/http/services/AdminService'

export default {
  name: 'UserManagement',
  setup() {
    const $q = useQuasar()
    const users = ref([])
    const loading = ref(false)
    const searchQuery = ref('')
    const roleFilter = ref('')
    const isEditing = ref(false)
    const selectedUser = ref(null)
    const userModal = ref(null)
    const deleteModal = ref(null)
    const errors = ref({})
    
    const form = ref({
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'auditor',
      status: 'active'
    })

    // Computed property untuk filtered users
    const filteredUsers = computed(() => {
      let result = users.value
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(user => 
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        )
      }
      
      if (roleFilter.value) {
        result = result.filter(user => user.role === roleFilter.value)
      }
      
      return result
    })

    // Methods
    const showNotification = (message, type = 'positive') => {
      $q.notify({
        message,
        type,
        position: 'top-right',
        timeout: 2000
      })
    }

    const fetchUsers = async () => {
      try {
        loading.value = true
        const response = await AdminService.getAllUsers()
        users.value = response.data || []
      } catch (error) {
        console.error('Error fetching users:', error)
        showNotification('Gagal memuat data pengguna', 'negative')
      } finally {
        loading.value = false
      }
    }

    const openAddModal = () => {
      isEditing.value = false
      errors.value = {}
      form.value = {
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'auditor',
        status: 'active'
      }
      new Modal(userModal.value).show()
    }

    const editUser = (user) => {
      isEditing.value = true
      errors.value = {}
      selectedUser.value = user
      form.value = {
        name: user.name,
        username: user.username,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.role,
        status: user.status
      }
      new Modal(userModal.value).show()
    }

    const closeModal = () => {
      try {
        // Cara 1: Menggunakan Bootstrap Modal API
        const modalElement = userModal.value;
        const modalInstance = Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
        
        // Cara 2: Manual DOM cleanup untuk kasus Bootstrap gagal
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');
        
        if (modalElement) {
          modalElement.style.display = 'none';
          modalElement.classList.remove('show');
          modalElement.setAttribute('aria-hidden', 'true');
          modalElement.removeAttribute('aria-modal');
          modalElement.removeAttribute('role');
        }
        
        // Reset form data
        form.value = {
          name: '',
          username: '',
          email: '',
          password: '',
          password_confirmation: '',
          role: 'auditor',
          status: 'active'
        };
        errors.value = {};
      } catch (error) {
        console.error('Error closing modal:', error);
        // Fallback: Gunakan jQuery jika tersedia
        try {
          if (window.jQuery) {
            window.jQuery('#userModal').modal('hide');
          }
        } catch (e) {
          console.error('Failed to use jQuery fallback:', e);
        }
      }
    }

    const handleSubmit = async () => {
      try {
        loading.value = true;
        errors.value = {};
        
        if (isEditing.value) {
          await AdminService.updateUser(selectedUser.value.id, form.value);
          showNotification('Pengguna berhasil diperbarui');
        } else {
          await AdminService.createUser(form.value);
          showNotification('Pengguna berhasil ditambahkan');
        }
        
        // Tutup modal SEBELUM fetchUsers untuk memberikan respons UI yang lebih cepat
        closeModal();
        
        // Set timeout sejenak agar modal benar-benar tertutup
        setTimeout(() => {
          // Pembersihan tambahan untuk memastikan modal benar-benar hilang
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('padding-right');
          
          // Reload data setelah modal ditutup
          fetchUsers();
        }, 300);
      } catch (error) {
        console.error('Error saving user:', error);
        if (error.response?.data?.errors) {
          errors.value = error.response.data.errors;
        } else {
          showNotification(
            error.response?.data?.message || 'Gagal menyimpan data pengguna',
            'negative'
          );
        }
      } finally {
        loading.value = false;
      }
    }

    const confirmDelete = (user) => {
      selectedUser.value = user
      new Modal(deleteModal.value).show()
    }

    const closeDeleteModal = () => {
      new Modal(deleteModal.value).hide()
    }

    const deleteUser = async () => {
      try {
        loading.value = true
        await AdminService.deleteUser(selectedUser.value.id)
        await fetchUsers()
        closeDeleteModal()
        showNotification('Pengguna berhasil dihapus')
      } catch (error) {
        console.error('Error deleting user:', error)
        
        // Cek jika error disebabkan oleh foreign key constraint
        if (error.response?.data?.message?.includes('foreign key constraint fails') ||
            error.response?.data?.message?.includes('integrity constraint violation')) {
          closeDeleteModal()
          
          // Tampilkan pesan error informatif
          showNotification(
            'Pengguna tidak dapat dihapus karena masih terkait dengan data audit. Pertimbangkan untuk menonaktifkan pengguna sebagai alternatif.',
            'negative'
          )
          
          // Tanyakan apakah user ingin menonaktifkan pengguna sebagai alternatif
          setTimeout(() => {
            if (confirm('Anda tidak dapat menghapus pengguna ini karena masih terkait dengan data audit. Apakah Anda ingin menonaktifkan pengguna ini sebagai alternatif?')) {
              // Jika user setuju, buka dialog edit untuk menonaktifkan user
              const userToEdit = { ...selectedUser.value, status: 'inactive' }
              editUser(userToEdit)
            }
          }, 500)
        } else {
          showNotification(
            error.response?.data?.message || 'Gagal menghapus pengguna',
            'negative'
          )
        }
      } finally {
        loading.value = false
      }
    }

    const getInitials = (name) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    }

    const getRoleBadgeClass = (role) => {
      const classes = 'badge rounded-pill '
      switch (role) {
        case 'auditor':
          return classes + 'bg-primary'
        case 'auditee':
          return classes + 'bg-success'
        default:
          return classes + 'bg-secondary'
      }
    }

    const getStatusBadgeClass = (status) => {
      const classes = 'badge rounded-pill '
      switch (status) {
        case 'active':
          return classes + 'bg-success'
        case 'inactive':
          return classes + 'bg-danger'
        default:
          return classes + 'bg-secondary'
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      loading,
      searchQuery,
      roleFilter,
      filteredUsers,
      form,
      errors,
      isEditing,
      userModal,
      deleteModal,
      openAddModal,
      editUser,
      closeModal,
      handleSubmit,
      confirmDelete,
      closeDeleteModal,
      deleteUser,
      getInitials,
      getRoleBadgeClass,
      getStatusBadgeClass
    }
  }
}
</script>

<style scoped>
.user-management {
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-title {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0;
}

.search-filter {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.user-avatar {
  width: 35px;
  height: 35px;
  background: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #495057;
  font-size: 0.875rem;
}

.user-name {
  font-weight: 500;
  color: #2c3e50;
}

.table {
  margin-top: 1rem;
}

.table th {
  font-weight: 600;
  color: #495057;
}

.table td {
  vertical-align: middle;
}

.btn-group .btn {
  padding: 0.25rem 0.5rem;
}

.btn-group .btn i {
  font-size: 0.875rem;
}

.modal-content {
  border-radius: 8px;
}

.modal-header {
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.form-label {
  font-weight: 500;
  color: #495057;
}

.badge {
  font-weight: 500;
  padding: 0.5em 0.75em;
}
</style> 