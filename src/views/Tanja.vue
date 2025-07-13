<script setup>
import AlurITSAComponent from './components/AlurITSAComponent.vue';
</script>

<template>
    <AlurITSAComponent />
    <div class="card pb-5 p-4 m-2">
        <div class="card-body">
            <h5 class="card-title">Tanya Jawab</h5>
            <p class="card-text">Status: Belum Terlaksana</p>
            <p class="card-text">Tanggal Sesi Tanya Jawab: 1 Oktober 2024</p>
            <a href="Surperdok.pdf" class="btn btn-success variant-gradient" @click="viewpdf">
                    <!-- ini akan diisi file pdf, namun belum bisa -->
                    Dokumen Undangan
            </a>
        </div>
    </div>
</template>