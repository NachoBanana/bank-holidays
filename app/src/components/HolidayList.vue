<template>
  <ion-page>
    <ion-list>
      <ion-list-header>{{ store.getBankHolidays.display_name }}</ion-list-header>
      
      <ion-grid :fixed="true" class="ion-text-center">
        <ion-row v-for="day in store.getBankHolidays.holidays" :key="day">
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
import { IonGrid, IonCol, IonText } from "@ionic/vue";

export default defineComponent({
  setup() {
    const store = useCountryStore();
    return { store };
  },
  components: {
    IonGrid,
    IonCol,
    IonText
  },
  methods: {
    getDayOfWeekString(date: string): string {
      const day = new Date(date).getDay();

      let dayOfWeek = "";
      switch(day) {
        case 0: {
          dayOfWeek = "Sunday";
          break; 
        }
        case 1: {
          dayOfWeek = "Monday";
          break;
        }
        case 2: {
          dayOfWeek = "Tuesday";
          break;
        }
        case 3: {
          dayOfWeek = "Wednesday";
          break;
        }
        case 4: {
          dayOfWeek = "Thursday";
          break;
        }
        case 5: {
          dayOfWeek = "Friday";
          break;
        }
        case 6: {
          dayOfWeek = "Saturday";
          break;
        }
      }
      return dayOfWeek;
    },
    getDateShortFormatString(date: string): string {
      const dayNumber = new Date(date).getDate();
      const monthNumber = new Date(date).getMonth();
      // const yearNumber = new Date(date).getFullYear();

      let monthName = "";
      switch(monthNumber) {
        case 0: {
          monthName = "January";
          break; 
        }
        case 1: {
          monthName = "Februrary";
          break;
        }
        case 2: {
          monthName = "March";
          break;
        }
        case 3: {
          monthName = "April";
          break;
        }
        case 4: {
          monthName = "May";
          break;
        }
        case 5: {
          monthName = "June";
          break;
        }
        case 6: {
          monthName = "July";
          break;
        }
        case 7: {
          monthName = "August";
          break;
        }
        case 8: {
          monthName = "September";
          break;
        }
        case 9: {
          monthName = "October";
          break;
        }
        case 10: {
          monthName = "November";
          break;
        }
        case 11: {
          monthName = "December";
          break;
        }
      }

      // const dateShortFormat = `${dayNumber} ${monthName} ${yearNumber}`
      const dateShortFormat = `${dayNumber} ${monthName}`

      return dateShortFormat;
    }
    ,getYearNumber(date: string): string {
      const yearNumber = new Date(date).getFullYear()

      const yearNumberAsString = `${yearNumber}`

      return yearNumberAsString;
    }
  }
});
</script>


<style scoped>
  ion-col {
    line-height: 1.25;
    width: 100%;
    margin-bottom: 20px;
    border-spacing: 0;
  }
</style>