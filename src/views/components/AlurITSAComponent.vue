<template>
    <div class="card pb-5 p-3 m-1 justify-content-center">
        <h5 class="mb-2">Progress Timeline ITSA </h5>
        <div class="card-body px-0 pt-0 pb-2">Berikut Progress Timeline ITSA milik anda: </div>
        <div class="container">
        <div class="row justify-content-md-center p-1">
            
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Surper">
                    <i class="fa fa-solid fa-file-text text-success mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Lihat Status Surat Permohonan" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Surat Permohonan</span>
                </div>
            </div>
            
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Surja">
                    <i class="ni ni-email-83 text-success mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Lihat Status Surat Jawaban" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Surat Jawaban</span>
                </div>
            </div>
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Dokkoor">
                    <i class="ni ni-single-copy-04 text-success mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Kirim Dokumen Koordinasi" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Dokumen Koordinasi</span>
                </div>
            </div>
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Ndastat">
                    <i class="ni ni-ruler-pencil text-success mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Kirim NDA" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">NDA</span>
                </div>
            </div>
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Kickoffmeet">
                    <i class="fa fa-solid fa-users text-success mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Periksa Jadwal Kick Off Meeting" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Kick Off Meeting</span>
                </div>
            </div>
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Pitsa">
                    <i class="fa fa-solid fa-tasks mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Proses ITSA" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Proses ITSA</span>
                </div>
            </div>
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Tanja">
                    <i class="ni ni-chat-round mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Tanya Jawab" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Tanya Jawab</span>
                </div>
            </div>
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Penlap">
                    <i class="ni ni-delivery-fast mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Lihat Dokumen Penyerahan Laporan" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Penyerahan Laporan</span>
                </div>
            </div>
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Laper">
                    <i class="ni ni-bulb-61 mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Periksa Laporan Perbaikan" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Laporan Perbaikan</span>
                </div>
            </div>
            <div class="col text-center m-1">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <RouterLink to="/Verper">
                    <i class="fa fa-solid fa-check-square-o mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Periksa Verifikasi Perbaikan" style="cursor: pointer;"></i> 
                    </RouterLink>
                    <span style="font-size:x-small;">Verifikasi Perbaikan</span>
                </div>
            </div>
        </div>
        </div>
        <div class="card-body p-2">
            <div class="progress-wrapper">
                <div class="progress-info"></div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%; background-color: #c1ce2d;" ></div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AlurITSAComponent'
}
</script>

<style scoped>
@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
}
</style>