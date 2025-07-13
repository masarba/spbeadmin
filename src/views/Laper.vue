<script setup>
import AlurITSAComponent from './components/AlurITSAComponent.vue';
import { ref } from 'vue';

const file = ref(null);
const uploadDate = ref(null);

const validateFile = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile.type !== 'application/pdf') {
        alert("Hanya file PDF yang diperbolehkan.");
        event.target.value = '';
        return;
    }

    file.value = uploadedFile;

    const currentDate = new Date();
    uploadDate.value = `${currentDate.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}, ${currentDate.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })} WIB`;
};
</script>

<template>
    <AlurITSAComponent />
    <div class="card pb-5 p-4 m-2">
        <div class="card-body">
            <h5 class="card-title">
                {{ file ? "Status Surat Permohonan Perbaikan" : "Upload Surat Permohonan Perbaikan" }}
            </h5>
            <p></p>
            <p v-if="file">File yang dipilih: {{ file.name }}</p>
            <p v-if="uploadDate">Tanggal Upload: {{ uploadDate }}</p>
            <p v-if="file" class="text-success">File Telah Di-Upload</p>
            <form enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="file-upload" class="btn btn-info" v-if="!file">
                        <i class="fas fa-cloud-upload-alt"></i> Upload Surat Permohonan Perbaikan
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="application/pdf"
                        class="d-none"
                        @change="validateFile"
                    />
                </div>
            </form>
        </div>
    </div>
</template>