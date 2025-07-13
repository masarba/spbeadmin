<script setup>
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';
const labels = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const data = {
    labels: labels,
    datasets:[{
        label: "Jumlah ITSA 2024",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [5, 10, 5, 2, 20, 30, 45, 20, 48, 12, 16, 34]    
    }]
}
const config = {
    type: 'bar',
    data: data,
    options:{}
}
onMounted(()=> {
    new Chart(document.getElementById('myChart'),config);
})
</script>

<template>
    <div>
        <canvas id="myChart" width="auto" height="auto"></canvas>
    </div>
</template>