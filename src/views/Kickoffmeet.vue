<script setup>
import AlurITSAComponent from './components/AlurITSAComponent.vue';
import { ref } from 'vue';

const kickOffDate = ref('2024-10-15 10:00:00');

const reminderSent = ref(false);

const sendEmailReminder = () => {
  fetch('/api/send-reminder', {
    method: 'POST',
    body: JSON.stringify({
      subject: 'Reminder Kick Off Meeting',
      message: `Kick Off Meeting dijadwalkan pada ${kickOffDate.value}`,
      email: 'mbintangi163@gmail.com'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Email reminder sent:', data);
      reminderSent.value = true;
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
};
</script>

<template>
    <AlurITSAComponent />
    <div class="card pb-5 p-4 m-2">
        <div class="card-body">
            <h5 class="card-title">Jadwal Kick Off Meeting</h5>
            <p class="card-text">Tanggal: {{ kickOffDate }}</p>
            <a href="Surperdok.pdf" class="btn btn-success mb-3">
                Lihat Dokumen
            </a>
            <p></p>
            <button 
                class="btn btn-primary" 
                @click="sendEmailReminder" 
                :disabled="reminderSent"
            >
                {{ reminderSent ? 'Reminder Terkirim' : 'Remind Me' }}
            </button>
            <p v-if="reminderSent" class="text-success mt-2">
                Reminder email telah dikirim.
            </p>
        </div>
    </div>
</template>
