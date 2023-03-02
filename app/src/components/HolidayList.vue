<template>
  <ion-list>
    <ion-list-header>{{ store.getBankHolidays.display_name }}</ion-list-header>
    
    <ion-grid>
      <ion-row v-for="day in store.getBankHolidays.holidays" :key="day">
        <ion-col>
          <ion-title>
            <ion-text>
              {{ day.name }}
            </ion-text>
          </ion-title>
        </ion-col>
        <ion-col>
          <ion-title>
            <ion-text>
              {{ day.date }}
            </ion-text>
          </ion-title>
        </ion-col>
        <ion-col>
          <ion-title>
            <ion-text>
              Day Of The Week
            </ion-text>
          </ion-title>
        </ion-col>

        <!-- <ion-item>
          <ion-label>{{ day.name }} </ion-label>
          <ion-label> {{ day.date }}</ion-label> 
          <ion-label>{{ day.name }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ day.date }} </ion-label>
        </ion-item> -->
      </ion-row>
    </ion-grid>
  </ion-list>
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
  }
});
</script>