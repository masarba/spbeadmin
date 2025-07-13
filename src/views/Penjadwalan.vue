<script setup> 
import PenjadwalanPersonel from './components/PenjadwalanPersonel.vue';
import PersonelDaftar from './components/PersonelDaftar.vue';
import JumlahAplikasi from './components/JumlahAplikasi.vue';
</script>

<template>
<div class="container-fluid p-3">
    <div class="card p-3 mb-3 bg-gray-100">
        <div class="card-header mx-3 text-center font-weight-bold" style="font-size: 40px;">Penjadwalan</div>
        <div class="card-body">
            <div class="container-fluid p-2">
                <div class="row">
                    <PenjadwalanPersonel />
                </div>
            </div>
            <div class="row">
                <div class="col-md-7" style="text-align: left;">
                    <PersonelDaftar />
                </div>
                <div class="col-md-5">
                    <JumlahAplikasi />
                </div>
            </div>
        </div>
    </div>
</div>
</template>