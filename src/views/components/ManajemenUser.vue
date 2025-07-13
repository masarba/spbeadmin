<script setup>
import ManajemenPersonel from './ManajemenPersonel.vue';
import DaftarPersonelITSA from './DaftarPersonelITSA.vue';
</script>

<template>
    <div class="container-fluid p-3">
        <div class="mb-3">
            <ManajemenPersonel />
        </div>
        <div class="row">
            <div class="col-6" style="min-width: 350px;">
                <DaftarPersonelITSA />
            </div>
            <div class="col">
                <div class="col-md-auto">
                    <div class="card mb-3 p-2" style="padding-top: 3px;">
                        <div class="card-header mb-0 text-center">
                            <div class="text-sm font-weight-bold mb-0">
                                Jumlah Total Personel ITSA
                            </div>
                        </div>
                        <div class="text-center p-0" style="font-size: 72px;">
                            36
                            <i class="fas fa-users text-info"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-auto">
                    <div class="card mb-3 p-2" style="padding-top: 3px;">
                        <div class="card-header mb-0 text-center">
                            <div class="text-sm font-weight-bold mb-0">
                                Jumlah Personel Aktif ITSA
                            </div>
                        </div>
                        <div class="text-center p-0" style="font-size: 72px;">
                            26
                            <i class="fas fa-users text-danger"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="col-md-auto">
                    <div class="card mb-3 p-2" style="padding-top: 3px;">
                        <div class="card-header mb-0 text-center">
                            <div class="text-sm font-weight-bold mb-0">
                                Jumlah PSE Terdaftar
                            </div>
                        </div>
                        <div class="text-center p-0" style="font-size: 72px;">
                            50
                            <i class="fas fa-landmark text-secondary"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-auto">
                    <div class="card mb-3 p-2" style="padding-top: 3px;">
                        <div class="card-header mb-0 text-center">
                            <div class="text-sm font-weight-bold mb-0">
                                Jumlah Personel Off ITSA
                            </div>
                        </div>
                        <div class="text-center p-0" style="font-size: 72px;">
                            10
                            <i class="fas fa-users text-success"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
