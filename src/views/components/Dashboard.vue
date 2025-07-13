<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesList from "./components/CategoriesList.vue";

// Import logo
import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";
</script>
<template>
  <div class="dashboard">
    <div class="header">
      <div class="title-section">
        <h1 class="dashboard-title">Selamat Datang di SPBE-SCAN Auditor</h1>
        <p class="subtitle">Sistem Informasi Audit Keamanan Siber yang membantu dalam pelaksanaan audit keamanan teknologi informasi.</p>
      </div>
      <div class="logo-section">
        <img src="https://www.pens.ac.id/wp-content/uploads/2020/12/Logo-PENS-1.png" alt="Logo Politeknik" class="logo">
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card
                title="Today's Money"
                value="$53,000"
                description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+55%</span> since yesterday"
                :icon="{
                  component: 'ni ni-money-coins',
                  background: 'bg-gradient-primary',
                  shape: 'rounded-circle',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card
                title="Today's Users"
                value="2,300"
                description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+3%</span> since last week"
                :icon="{
                  component: 'ni ni-world',
                  background: 'bg-gradient-danger',
                  shape: 'rounded-circle',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card
                title="New Clients"
                value="+3,462"
                description="<span
                  class='text-sm font-weight-bolder text-danger'
                  >-2%</span> since last quarter"
                :icon="{
                  component: 'ni ni-paper-diploma',
                  background: 'bg-gradient-success',
                  shape: 'rounded-circle',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <mini-statistics-card
                title="Sales"
                value="$103,430"
                description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+5%</span> than last month"
                :icon="{
                  component: 'ni ni-cart',
                  background: 'bg-gradient-warning',
                  shape: 'rounded-circle',
                }"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-7 mb-lg">
              <!-- line chart -->
              <div class="card z-index-2">
                <gradient-line-chart
                  id="chart-line"
                  title="Sales Overview"
                  description="<i class='fa fa-arrow-up text-success'></i>
        <span class='font-weight-bold'>4% more</span> in 2021"
                  :chart="{
                    labels: [
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ],
                    datasets: [
                      {
                        label: 'Mobile Apps',
                        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                      },
                    ],
                  }"
                />
              </div>
            </div>
            <div class="col-lg-5">
              <carousel />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-7 mb-lg-0 mb-4">
              <div class="card">
                <div class="p-3 pb-0 card-header">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-2">Sales by Country</h6>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center">
                    <tbody>
                      <tr v-for="(sale, index) in sales" :key="index">
                        <td class="w-30">
                          <div class="px-2 py-1 d-flex align-items-center">
                            <div>
                              <img :src="sale.flag" alt="Country flag" />
                            </div>
                            <div class="ms-4">
                              <p class="mb-0 text-xs font-weight-bold">
                                Country:
                              </p>
                              <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="text-center">
                            <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                            <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                          </div>
                        </td>
                        <td>
                          <div class="text-center">
                            <p class="mb-0 text-xs font-weight-bold">Value:</p>
                            <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                          </div>
                        </td>
                        <td class="text-sm align-middle">
                          <div class="text-center col">
                            <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                            <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <categories-list
                :categories="[
                  {
                    icon: {
                      component: 'ni ni-mobile-button',
                      background: 'dark',
                    },
                    label: 'Devices',
                    description: '250 in stock <strong>346+ sold</strong>',
                  },
                  {
                    icon: {
                      component: 'ni ni-tag',
                      background: 'dark',
                    },
                    label: 'Tickets',
                    description: '123 closed <strong>15 open</strong>',
                  },
                  {
                    icon: { component: 'ni ni-box-2', background: 'dark' },
                    label: 'Error logs',
                    description: '1 is active <strong>40 closed</strong>',
                  },
                  {
                    icon: { component: 'ni ni-satisfied', background: 'dark' },
                    label: 'Happy Users',
                    description: '+ 430',
                  },
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f8f9fe;
  border-radius: 15px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.title-section {
  flex: 1;
}

.dashboard-title {
  margin: 0;
  color: #2d3748;
  font-size: 24px;
  font-weight: 600;
}

.subtitle {
  margin: 8px 0 0 0;
  color: #718096;
  font-size: 14px;
}

.logo-section {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.logo {
  height: 80px;
  width: auto;
  object-fit: contain;
  display: block;
  max-width: 100%;
}

/* ... existing styles ... */
</style>
