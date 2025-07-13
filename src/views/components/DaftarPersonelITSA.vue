<template>
  <div class="card mb-3">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-2">Personel ITSA</h6>
    </div>

    <div class="card-body pt-0 p-3">
      <div class="row d-flex align-items-end">
        <div class="col-sm">
            <button class="btn btn-icon btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#TambahPersonel">
            <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
            <span class="btn-inner--text">Tambahkan Personel Baru</span>
          </button>
        </div>
        <div class="col-sm">
          <div class="form">
            <form>
              <input type="text" class="form-control mb-2" id="CariPersonel" placeholder="Masukkan Nama Personel">
              <button type="submit" class="btn btn-sm btn-primary"><i class="ni ni-zoom-split-in"></i>  Cari</button>
            </form>
          </div>
        </div>
      </div>

      <ul class="list-group">
        <li class="list-group-item border-1 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">Prameswara Sesoca</h6>
            <span class="mb-2 text-xs"> ID Personel: <span class="text-dark font-weight-bold ms-sm-2">ITSA2223</span>
            </span>
            <span class="mb-2 text-xs">Jabatan: <span class="text-dark ms-sm-2 font-weight-bold">Sandiman Ahli Utama</span>
            </span>
            <span class="text-xs">NIP: <span class="text-dark ms-sm-2 font-weight-bold">2120101739</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a
              class="btn btn-link text-danger text-gradient px-3 mb-0"
              href="javascript:;"
            >
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i
              >Edit
            </a>
          </div>
        </li>
        <li class="list-group-item border-1 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">Ahmad Izza</h6>
            <span class="mb-2 text-xs"> ID Personel: <span class="text-dark font-weight-bold ms-sm-2">ITSA2223</span>
            </span>
            <span class="mb-2 text-xs">Jabatan: <span class="text-dark ms-sm-2 font-weight-bold">Sandiman Ahli Utama</span>
            </span>
            <span class="text-xs">NIP: <span class="text-dark ms-sm-2 font-weight-bold">2120101739</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a
              class="btn btn-link text-danger text-gradient px-3 mb-0"
              href="javascript:;"
            >
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i
              >Edit
            </a>
          </div>
        </li>
        <li class="list-group-item border-` d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">Muhammad Bintang</h6>
            <span class="mb-2 text-xs"> ID Personel: <span class="text-dark font-weight-bold ms-sm-2">ITSA2223</span>
            </span>
            <span class="mb-2 text-xs">Jabatan: <span class="text-dark ms-sm-2 font-weight-bold">Sandiman Ahli Utama</span>
            </span>
            <span class="text-xs">NIP: <span class="text-dark ms-sm-2 font-weight-bold">2120101739</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a
              class="btn btn-link text-danger text-gradient px-3 mb-0"
              href="javascript:;"
            >
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i
              >Edit
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="modal fade" id="TambahPersonel" tabindex="-1" role="dialog" aria-labelledby="TambahPersonelLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="TambahPersonelLabel">Tambahkan PSE Baru</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card p-1">
                        <div class="card-header font-weight-bold text-center">TAMBAH PERSONEL ITSA</div>
                        <div class="card-body">
                            <form>
                                <label for="upfotopersonel" class="form-label">Upload Foto Personel</label>
                                <div class="custom-file mb-3">
                                    <input type="file" class="custom-file-input" id="customFileLang" lang="en">
                                </div>
                                <div class="mb-3">
                                    <label for="personel_name" class="form-label">Nama Lengkap</label>
                                    <input type="text" class="form-control" id="personel_name" aria-required="true" placeholder="Muhammad Aka">
                                </div>
                                <div class="mb-3">
                                    <label for="personel_jabatan" class="form-label">Jabatan</label>
                                    <input type="text" class="form-control" id="personel_jabatan" aria-required="true" placeholder="Muhammad Aka">
                                </div>
                                <div class="mb-3">
                                    <label for="personel_nip" class="form-label">NIP</label>
                                    <input type="text" class="form-control" id="personel_nip" aria-required="true" placeholder="Muhammad Aka">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn bg-gradient-primary">Edit</button>
                </div>
            </div>
        </div>
      </div>
</template>

<script>
export default {
    name: "DaftarpersonelITSA"
}
</script>

