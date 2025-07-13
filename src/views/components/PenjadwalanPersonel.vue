<template>
    <div class="card mb-3 p-2">
        <div class="row d-flex justify-content-start align-items-end p-1 mx-1">
            <div class="col-sm-8">
                <button class="btn btn-icon btn-primary" type="button">
                <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                <span class="btn-inner--text">Tambahkan Aplikasi ITSA Baru</span>
                </button>
            </div>
            <div class="col-sm-3 p-0">
                <div class="container p-0">
                    <div class="form">
                        <form>
                        <input type="text" class="form-control mb-2" id="CariStakeholder" placeholder="Masukkan Stakeholder">
                        <button type="submit" class="btn btn-sm btn-primary"><i class="ni ni-zoom-split-in"></i>  Cari</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table align-items-center">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" class="sort" data-sort="id_dok_koor">No NDA</th>
                        <th scope="col" class="sort" data-sort="stakeholder">Stakeholder</th>
                        <th scope="col" class="sort" data-sort="aplikasi">Jumlah Aplikasi</th>
                        <th scope="col" class="sort" data-sort="tanggalmulai">Tanggal Mulai</th>
                        <th scope="col" class="sort" data-sort="tanggalselesai">Tanggal Selesai</th>
                        <th scope="col" class="sort" data-sort="status">Progres</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody class="list">
                    <tr>
                        <td class="text-sm">FF1123456</td>
                        <td class="text-sm">Kementrian Keuangan</td>
                        <td class="text-sm">3</td>
                        <td class="text-sm">25 September 2024</td>
                        <td class="text-sm">30 September 2024</td>
                        <td class="text-sm">Kick Off Meeting</td>
                        <td class="text-sm" style="text-align: center;"><button type="button" class="btn btn-info btn-sm text-sm mt-1">Detail</button></td>
                    </tr>
                    <tr>
                        <td class="text-sm">AABC1234</td>
                        <td class="text-sm">Kementrian Perhubungan</td>
                        <td class="text-sm">5</td>
                        <td class="text-sm">25 September 2024</td>
                        <td class="text-sm">30 September 2024</td>
                        <td class="text-sm">Kick Off Meeting</td>
                        <td class="text-sm" style="text-align: center;"><button type="button" class="btn btn-info btn-sm text-sm mt-1">Detail</button></td>
                    </tr>
                    <tr>
                        <td class="text-sm">FF1123456</td>
                        <td class="text-sm">Kementrian Kesehatan</td>
                        <td class="text-sm">2</td>
                        <td class="text-sm">25 September 2024</td>
                        <td class="text-sm">30 September 2024</td>
                        <td class="text-sm">Kick Off Meeting</td>
                        <td class="text-sm" style="text-align: center;"><button type="button" class="btn btn-info btn-sm mt-1">Detail</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "PenjadwalanPersonel"
}
</script>
