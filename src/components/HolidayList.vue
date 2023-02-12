<template>
  <ion-list>
    <ion-row v-for="day in store.getBankHolidayList" :key="day">
      <ion-card>
        <ion-card-subtitle>{{ day.country }} </ion-card-subtitle>
        <ion-card-title>{{ day.bank_holiday }}</ion-card-title>
        <ion-card-content>
          {{ day.date }} <br />
          {{ day.year }} for {{ day.country }}
        </ion-card-content>
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