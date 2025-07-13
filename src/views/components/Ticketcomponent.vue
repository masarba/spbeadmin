<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-4">
        <div class="search-bar mb-3">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <h5 class="mb-3">Daftar Tiket</h5>
        <div class="list-group" style="max-height: 300px; overflow-y: auto;">
          <a 
            href="#" 
            @click.prevent="setActive('Diskominfo Jawa Barat')" 
            :class="['list-group-item', 'list-group-item-action', { active: activeTicket === 'Diskominfo Jawa Barat' }]">
            <span class="star">⭐</span>
            <strong>Diskominfo Jawa Barat</strong>
            <span class="badge badge-danger badge-status">Nomor Tiket : xxxx-xxx</span>
            <p>Subject: </p>
            <small class="text-muted">May 13</small>
          </a>
          <a 
            href="#" 
            @click.prevent="setActive('BNN')" 
            :class="['list-group-item', 'list-group-item-action', { active: activeTicket === 'BNN' }]">
            <span class="star">⭐</span>
            <strong>BNN</strong>
            <span class="badge badge-info badge-status">xxxx-xxx</span>
            <p>Inquiry about license for Admin</p>
            <small class="text-muted">May 13</small>
          </a>
          <a 
            href="#" 
            @click.prevent="setActive('Pemkab Ngawi')" 
            :class="['list-group-item', 'list-group-item-action', { active: activeTicket === 'Pemkab Ngawi' }]">
            <span class="star">⭐</span>
            <strong>Pemkab Ngawi</strong>
            <span class="badge badge-warning badge-status">xxxx-xxx</span>
            <p>Bitbucket (commit Pushed) by Ritesh</p>
            <small class="text-muted">May 13</small>
          </a>
          <a 
            href="#" 
            @click.prevent="setActive('Akshay Kumar')" 
            :class="['list-group-item', 'list-group-item-action', { active: activeTicket === 'Akshay Kumar' }]">
            <span class="star">⭐</span>
            <strong>Akshay Kumar</strong>
            <span class="badge badge-info badge-status">xxxx-xxx</span>
            <p>Perspiciatis unde omnis- iste Lorem ipsum</p>
            <small class="text-muted">May 9</small>
          </a>
          <a 
            href="#" 
            @click.prevent="setActive('John Abraham')" 
            :class="['list-group-item', 'list-group-item-action', { active: activeTicket === 'John Abraham' }]">
            <span class="star">⭐</span>
            <strong>John Abraham</strong>
            <span class="badge badge-success badge-status">xxxx-xxx</span>
            <p>Lorem ipsum perspiciatis- unde omnis</p>
            <small class="text-muted">Mar 10</small>
          </a>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="card p-3">
          <h5 class="mb-4">Diskusi</h5>
          <div class="messages" style="max-height: 300px; overflow-y: auto;">
            <div v-for="msg in activeMessages" :key="msg.id" class="message mb-3" :class="{ 'sent-message': msg.sent, 'received-message': !msg.sent }">
              <strong>{{ msg.sender }}</strong>
              <p>{{ msg.text }}</p>
              <small>{{ msg.time }}</small>
            </div>
          </div>
          <div class="input-group mt-3">
            <input type="text" class="form-control message-input" placeholder="Ketik pesan anda disini..." />
            <button class="btn btn-light attachment-button" type="button">
              <i class="fas fa-paperclip"></i>
            </button>
            <button class="btn btn-primary send-button" type="button">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatApp',
  data() {
    return {
      activeTicket: null,
      tickets: {
        'Diskominfo Jawa Barat': [
          { id: 1, sender: 'Diskominfo Jawa Barat', text: 'You can send friend requests to other users to add them', time: 'Thursday, March 25th 2021 at 11:14 PM', sent: true },
          { id: 2, sender: 'TIM ITSA', text: 'to your direct message list', time: 'Thursday, March 25th 2021 at 11:14 PM', sent: false },
          { id: 3, sender: 'Diskominfo Jawa Barat', text: 'This concludes the feature tour', time: 'Thursday, March 25th 2021 at 11:29 PM', sent: true },
        ],
        'BNN': [
          { id: 1, sender: 'BNN', text: 'Pengajuan lisensi telah diterima.', time: 'Thursday, March 25th 2021 at 12:00 AM', sent: true },
          { id: 2, sender: 'Admin', text: 'Silakan tunggu proses lebih lanjut.', time: 'Thursday, March 26th 2021 at 12:30 AM', sent: false },
        ],
        'Pemkab Ngawi': [
          { id: 1, sender: 'Pemkab Ngawi', text: 'Ada pembaruan tentang proyek.', time: 'Friday, March 26th 2021 at 9:00 AM', sent: true },
        ],
        'Akshay Kumar': [
          { id: 1, sender: 'Akshay Kumar', text: 'Bagaimana perkembangan proyek kita?', time: 'Saturday, March 27th 2021 at 3:45 PM', sent: true },
          { id: 2, sender: 'Admin', text: 'Proyek sedang berjalan sesuai rencana.', time: 'Saturday, March 27th 2021 at 4:00 PM', sent: false },
        ],
        'John Abraham': [
          { id: 1, sender: 'John Abraham', text: 'Lanjutkan dengan pengujian.', time: 'Sunday, March 28th 2021 at 2:15 PM', sent: true },
        ],
      }
    };
  },
  computed: {
    activeMessages() {
      return this.tickets[this.activeTicket] || [];
    }
  },
  methods: {
    setActive(ticketName) {
      this.activeTicket = ticketName;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.search-bar input {
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.search-bar input::placeholder {
  color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  font-weight: normal;
}

.search-bar input:focus {
  border-color: #007bff;
  outline: none;
}

.messages {
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  padding: 10px;
  background-color: #f9f9f9;
}

.message {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.sent-message {
  background-color: #e0f7fa; 
  text-align: right;
}

.received-message {
  background-color: #ffe0b2; 
  text-align: left; 
}

.message:last-child {
  border-bottom: none;
}

.message-input {
  border: 1px solid #ccc;
  padding: 10px 15px; 
  height: 40px; 
}

.message-input::placeholder {
  color: rgba(0, 0, 0, 0.5); 
}

.message-input:focus {
  border-color: #007bff;
  outline: none; 
}

.send-button, .attachment-button {
  height: 40px; 
  padding: 0 15px; 
  line-height: 1; 
}

.send-button {
  border-radius: 0 20px 20px 0; 
}

.attachment-button {
  border-radius: 20px 0 0 20px; 
  background-color: transparent; 
  border: 1px solid #ccc; 
}

h5 {
  font-family: 'Arial', sans-serif;
  font-size: 1.5rem; 
  font-weight: bold; 
  color: #49395a; 
  margin-bottom: 20px; 
  text-align: left; 
}

.list-group-item {
  display: flex; 
  flex-direction: column; 
  border: none; 
  padding: 15px; 
}

.star {
  margin-right: 10px; 
}

.badge-status {
  margin-top: 5px; 
}

.list-group-item p {
  margin: 5px 0; 
}

.text-muted {
  font-size: 0.9em; 
  font-weight: bold; 
  color: #ffffff; 
  margin-top: auto; 
}
</style>