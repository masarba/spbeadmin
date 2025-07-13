<template>
<div class="card p-1">
    <div class="card-header font-weight-bold text-center">IDENTITAS PSE</div>
    <div class="card-body">
        <form>
            <label for="uplogo" class="form-label">Upload Logo PSE</label>
            <div class="custom-file mb-3">
                <input type="file" class="custom-file-input" id="customFileLang" lang="en">
            </div>
            <div class="mb-3">
                <label for="pse_name" class="form-label">Nama Instansi</label>
                <input type="text" class="form-control" id="pse_name" aria-required="true" placeholder="Badan Siber dan Sandi Negara">
            </div>
            <div class="mb-3">
                <label for="akronim" class="form-label">Akronim</label>
                <input type="text" class="form-control" id="akronim" aria-required="true" placeholder="BSSN">
            </div>
            <div class="mb-3">
                <label for="alamat" class="form-label">Alamat</label>
                <textarea id="alamat" type="text" class="form-control"  aria-required="true" placeholder="Gedung, Jl. Ir. H. Juanda 1 Jl. Dr. Wahidin Raya No.1 Lt.9, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710"></textarea>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" aria-required="true" placeholder="admin@bssn.go.id">
            </div>
            <div class="mb-3">
                <label for="phone_pse" class="form-label">Telepon</label>
                <input type="text" class="form-control" id="phone_pse" aria-required="true" placeholder="03513355511">
            </div>
        </form>
    </div>
    <div class="card-header font-weight-bold text-center">IDENTITAS PIC</div>
    <div class="card-body">
        <form>
            <label for="upktp" class="form-label">Upload Foto KTP</label>
            <div class="custom-file mb-3">
                <input type="file" class="custom-file-input" id="upktp" lang="en">
            </div>
            <div class="mb-3">
                <label for="pic_name" class="form-label">Nama Lengkap</label>
                <input type="text" class="form-control" id="pic_name" aria-required="true" placeholder="Badan Siber dan Sandi Negara">
            </div>
            <div class="mb-3">
                <label for="nik" class="form-label">NIK</label>
                <input type="text" class="form-control" id="nik" aria-required="true" placeholder="BSSN">
            </div>
            <div class="mb-3">
                <label for="nip" class="form-label">NIP</label>
                <input type="text" class="form-control" id="nip" aria-required="true" placeholder="BSSN">
            </div>
            <div class="mb-3">
                <label for="jabatan" class="form-label">Jabatan</label>
                <input type="text" class="form-control" id="jabatan" aria-required="true" placeholder="admin@bssn.go.id">
            </div>
            <div class="mb-3">
                <label for="phone_pse" class="form-label">Telepon</label>
                <input type="text" class="form-control" id="phone_pse" aria-required="true" placeholder="03513355511">
            </div>
        </form>
    </div>
</div>
</template>
                