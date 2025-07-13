<script setup>
import ChartITSA from './ChartITSA.vue';
import TopKerentanan from './TopKerentanan.vue';
</script>

<template>
    <div class="container-fluid p-2">
        <div class="row d-flex align-items-start">
            <div class="col-lg-8 p-1 mb-3">
                <div class="card p-1">
                    <div class="card-header font-weight-bold">Statistik ITSA</div>
                    <div class="card-body">
                        <ChartITSA />
                    </div>
                </div>
            </div>
            <div class="col-lg-4 p-1 mb-3">
                <div class="card p-1">
                    <div class="card-header font-weight-bold">Top Kerentanan</div>
                    <div class="card-body">
                        <TopKerentanan />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "StatistikITSA"
}
</script>
