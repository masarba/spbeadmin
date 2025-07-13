<script setup>
import AlurITSAComponent from './components/AlurITSAComponent.vue';
</script>

<template>
    <AlurITSAComponent />
    <div class="card pb-5 p-4 m-2">
        <div class="card-body">
            <h5 class="card-title">Verifikasi Perbaikan</h5>
            <p class="card-text">Status: Sudah Diproses</p>
            <p class="card-text">Berikut kami kirimkan hasil verifikasi perbaikan</p>
            <a href="Surperdok.pdf" class="btn btn-success variant-gradient" @click="viewpdf">
                    <!-- ini akan diisi file pdf, namun belum bisa -->
                    Lihat Dokumen
            </a>
        </div>
    </div>
</template>