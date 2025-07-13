<template>
  <div>
    <h2>Daftar Auditee</h2>
    <ul>
      <li v-for="auditee in auditees" :key="auditee.id">
        <button @click="selectAuditee(auditee.id)">{{ auditee.username }}</button>
      </li>
    </ul>
    
    <AuditResults v-if="selectedAuditeeId" :auditee-id="selectedAuditeeId" />
  </div>
</template>

<script>
import AuditResults from './AuditResults.vue';
import axios from 'axios';

export default {
  components: {
    AuditResults
  },
  data() {
    return {
      auditees: [],
      selectedAuditeeId: null
    };
  },
  mounted() {
    // Fetch auditee list on component mount
    this.getAuditees();
  },
  methods: {
    getAuditees() {
      axios.get('http://127.0.0.1:8000/api/auth/auditees')
        .then(response => {
          this.auditees = response.data;
        })
        .catch(error => {
          console.error('Failed to load auditees:', error);
        });
    },
    selectAuditee(auditeeId) {
      this.selectedAuditeeId = auditeeId;
    }
  }
};
</script>
