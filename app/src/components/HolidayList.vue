<template>
  <ion-page>

    <h1>
      Upcoming Bank Holidays: {{ store.getDisplayName }}
    </h1>


    <ion-list>
      <ion-list-header :fixed="true" class="ion-text-center">
      </ion-list-header>

      <ion-grid :fixed="true" class="ion-text-center">
        <ion-row>
          <ion-col>
            <ion-title>Date</ion-title>
          </ion-col>
          <ion-col>
            <ion-title>Day of week</ion-title>
          </ion-col>
          <ion-col>
            <ion-title>Holiday</ion-title>
          </ion-col>
          <ion-col>
            <ion-title>Year</ion-title>
          </ion-col>
        </ion-row>


        <ion-row v-for="day, index in store.getHolidayList" :key="index">
          <ion-col class="ion-text-wrap">
            <ion-text>
              {{ getDateShortFormatString(day.date) }}
            </ion-text>
          </ion-col>
          <ion-col>
            {{ getDayOfWeekString(day.date) }}
          </ion-col>
          <ion-col class="ion-text-wrap">
            {{ day.name }}
          </ion-col>
          <ion-col>
            {{ getYearNumber(day.date) }}
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-list>
  </ion-page>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { useCountryStore } from "@/stores/CountryStore";
import {
  IonList,
  IonListHeader,
  IonRow,
  IonGrid,
  IonCol,
  IonText
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonList,
    IonListHeader,
    IonRow,
    IonGrid,
    IonCol,
    IonText
  },
  setup() {
    const store = useCountryStore();
    return { store };
  },
  methods: {
    getDayOfWeekString(date: string): string {
      return this.store.getDayOfWeek(new Date(date).getDay());
    },
    getDateShortFormatString(date: string): string {
      const localDate = new Date(date);
      return `${localDate.getDate()} ${this.store.getMonth(localDate.getMonth())}`;
    },
    getYearNumber(date: string): string {
      return new Date(date).getFullYear().toString();
    }
  }
});
</script>
<style scoped>
ion-col {
  line-height: 1.25;
  width: 100%;
  margin-bottom: 10px;
  border-spacing: 0;
}
h1 {
  text-align: center;
  padding: 50px;
}
</style>