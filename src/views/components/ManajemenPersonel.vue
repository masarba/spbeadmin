<template>
    <div class="container-fluid p-1">
        <div class="card p-2">
            <div class="card-header text-center font-weight-bold">Daftar Penyelenggara Sistem Elektronik</div>
            <div class="row d-flex align-items-end">
                <div class="col-sm-8">
                    <div class="container p-2">
                        <button class="btn btn-icon btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#ModalPersonel">
                            <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                            <span class="btn-inner--text">Tambahkan PSE Baru</span>
                        </button>
                    </div>
                </div>
                <div class="col-sm-3 p-0">
                    <div class="container p-0">
                        <div class="form">
                            <form @submit.prevent="searchPersonel">
                                <input v-model="searchQuery" type="text" class="form-control mb-2" placeholder="Masukkan Nama Stakeholder">
                                <button type="submit" class="btn btn-sm btn-primary"><i class="ni ni-zoom-split-in"></i> Cari</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table align-items-center mb-0" v-if="filteredPersonel.length > 0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Penyelenggara Sistem Elektronik</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Alamat</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Kontak</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">PIC</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tanggal Terdaftar</th>
                            <th class="text-secondary opacity-7"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(person, index) in filteredPersonel" :key="person.id">
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">{{ index + 1 }}</span>
                            </td>
                            <td>
                                <div class="d-flex px-2 py-1">
                                    <div>
                                        <img class="avatar avatar-sm me-3" :src="person.logo" alt="user1">
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                        <h6 class="mb-0 text-xs">{{ person.name }}</h6>
                                        <p class="text-xs text-secondary mb-0">{{ person.acronym }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle" style="min-width: 200px; max-width: 300px; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">
                                <span class="text-secondary text-xs font-weight-bold">{{ person.address }}</span>
                            </td>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">Email</p>
                                <p class="text-xs text-secondary mb-3">{{ person.email }}</p>
                                <p class="text-xs font-weight-bold mb-0">Telepon</p>
                                <p class="text-xs text-secondary mb-3">{{ person.phone }}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <button class="btn btn-icon btn-sm btn-info" type="button" style="margin-right: 10px;" data-bs-toggle="modal" data-bs-target="#ModalPIC">
                                    <span class="btn-inner--icon"><i class="ni ni-settings"></i></span>
                                    <span class="btn-inner--text"> Detail</span>
                                </button>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">{{ person.registration_date }}</span>
                            </td>
                            <td class="align-middle">
                                <button class="btn btn-icon btn-sm btn-danger" type="button" style="margin-right: 10px;">
                                    <span class="btn-inner--icon"><i class="ni ni-settings"></i></span>
                                    <span class="btn-inner--text"> Edit</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    <p class="text-center">No personnel found. Please add or search for a PSE.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for adding personel -->
    <div class="modal fade" id="ModalPersonel" tabindex="-1" role="dialog" aria-labelledby="ModalPersonelLabel" aria-hidden="true">
        <!-- Add modal form content here -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "",
            personel: [], // This will hold the list of personel from the backend
        };
    },
    computed: {
        filteredPersonel() {
            if (!this.searchQuery) {
                return this.personel;
            }
            return this.personel.filter(person => 
                person.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        searchPersonel() {
            // Call to backend to fetch and filter the personel based on searchQuery
            // Example logic:
            // this.fetchPersonelData();
        },
        fetchPersonelData() {
            // Fetch the list of personel from the API and set to the personel array
            // Example: this.personel = response.data;
        }
    },
    mounted() {
        this.fetchPersonelData(); // Fetch the personel data when the component is mounted
    }
};
</script>
