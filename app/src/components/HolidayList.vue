<template>
  <ion-page>
    <h1>
      Upcoming bank holidays in {{ store.getDisplayName }}
    </h1>

    <h2> {{ currentDate.getFullYear() }} </h2>
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
        </ion-row>

        <ion-row v-for="days, index_two in getBankHolidaysCurrentYear()" :key="index_two">
          <ion-col class="ion-text-wrap">
            <ion-text>
              {{ getDateShortFormatString(days.date) }}
            </ion-text>
          </ion-col>
          <ion-col>
            {{ getDayOfWeekString(days.date) }}
          </ion-col>
          <ion-col class="ion-text-wrap">
            {{ days.name }}
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-list>

    <h2> {{ currentDate.getFullYear() +1 }}</h2>
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
        </ion-row>

        <ion-row v-for="days, index_two in getFutureYearsBankHolidays()" :key="index_two">
          <ion-col class="ion-text-wrap">
            <ion-text>
              {{ getDateShortFormatString(days.date) }}
            </ion-text>
          </ion-col>
          <ion-col>
            {{ getDayOfWeekString(days.date) }}
          </ion-col>
          <ion-col class="ion-text-wrap">
            {{ days.name }}
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-list>


    <h1>
      Past bank holidays in {{ store.getDisplayName }}
    </h1>

    <h2>{{ currentDate.getFullYear() -1 }}</h2>
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
        </ion-row>

        <ion-row v-for="days, index_two in getPastYearsBankHolidays()" :key="index_two">
          <ion-col class="ion-text-wrap">
            <ion-text>
              {{ getDateShortFormatString(days.date) }}
            </ion-text>
          </ion-col>
          <ion-col>
            {{ getDayOfWeekString(days.date) }}
          </ion-col>
          <ion-col class="ion-text-wrap">
            {{ days.name }}
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
  IonText,
} from "@ionic/vue";
import { IndividualHoliday } from "@/types";

export default defineComponent({
  components: {
    IonList,
    IonListHeader,
    IonRow,
    IonGrid,
    IonCol,
    IonText,
  },
  setup() {
    const store = useCountryStore();
    const currentDate = new Date();

    return { store, currentDate };
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
    },
    getBankHolidaysCurrentYear(): IndividualHoliday[] {
      return this.store.bankHolidays?.holidays?.filter((holiday) => new Date(holiday.date).getFullYear() == this.currentDate.getFullYear())
    },
    getPastYearsBankHolidays(): IndividualHoliday[] {
      const holidays = [] as IndividualHoliday[];
      for (const element of this.store.getBankHolidaysGroupedByYear.entries()) {
        if (element[0] < this.currentDate.getFullYear()) {
          holidays.push(...element[1]);
        }
      }
    
      return holidays
    },
    getFutureYearsBankHolidays(): IndividualHoliday[] {
      const holidays = [] as IndividualHoliday[];
      for (const element of this.store.getBankHolidaysGroupedByYear.entries()) {
        if (element[0] > this.currentDate.getFullYear()) {
          holidays.push(...element[1]);
        }
      }
    
      return holidays    },
  }
});
</script>

<style scoped>
ion-col {
  line-height: 1.25;
  width: 50%;
  margin-bottom: 10px;
  border-spacing: 0;
}

h1 {
  text-align: center;
  margin-top: 30px;
  padding: 50px;
}
</style>
