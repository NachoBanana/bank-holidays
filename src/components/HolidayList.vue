<template>
  <ion-list>
    <ion-list-header>{{ store.getBankHolidays.display_name }}</ion-list-header>
    <ion-row v-for="day in store.getBankHolidays.holidays" :key="day">
      <ion-card>
        <ion-card-title>{{ day.name }}</ion-card-title>
        <ion-card-content> {{ day.date }} <br /> </ion-card-content>
      </ion-card>
    </ion-row>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCountryStore } from "@/stores/CountryStore";

export default defineComponent({
  setup() {
    const store = useCountryStore();
    return { store };
  },
});
</script>