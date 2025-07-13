<script setup>
import ArgonButton from "@/components/ArgonButton.vue";
</script>
<template>
  <div class="card h-100 mb-4" style="text-align: left;">
    <div class="card-header pb-0 px-3">
      <div class="row">
        <div class="col-md-6">
          <h6 class="mb-0">Daftar Aplikasi untuk ITSA</h6>
        </div>
        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
          <small>September 2024</small>
        </div>
      </div>
    </div>

    <div class="card-body pt-4 p-3">
      <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">Terbaru </h6>
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
          <div class="d-flex align-items-center">
            <argon-button
              color="danger"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
              <i class="fa fa-hourglass-1" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column m-1">
              <h6 class="mb-1 text-dark text-sm">Sistem Informasi Kominfo</h6>
              <span class="text-xs">23 September 2024, 14:30 WIB</span>
            </div>
          </div>
          <div class="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">Belum selesai</div>
        </li>
        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
          <div class="d-flex align-items-center">
            <argon-button
              color="success"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
              <i class="fa fa-check" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column m-1">
              <h6 class="mb-1 text-dark text-sm">Pelayanan Pajak</h6>
              <span class="text-xs">25 September 2024, 15.00 WIB</span>
            </div>
          </div>
          <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">Sudah Selesai</div>
        </li>
      </ul>
        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
          <div class="d-flex align-items-center">
            <argon-button
              color="success"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center">
              <i class="fa fa-check" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column m-1">
              <h6 class="mb-1 text-dark text-sm">BPJS Ketenagakerjaan</h6>
              <span class="text-xs">15 September 2024, 08.30 WIB</span>
            </div>
          </div>
          <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">Sudah Selesai</div>
        </li>
    </div>
  </div>
</template>


<script>
export default {
    name: "JumlahAplikasi"
}
</script>
