<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Bank Holiday App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Bank Holiday App</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Upcoming Bank Holidays</strong>
        <p>
          <ion-list>
            <ion-row v-for="day in bankHolidays" :key="day">
              <ion-card>
                <ion-card-subtitle>{{ day.id }} </ion-card-subtitle>
                <ion-card-title>{{ day.name }}</ion-card-title>
                <ion-card-content>
                  {{ day.date?.toDateString() }} <br />
                  {{ day.description }} for {{ day.country }}
                </ion-card-content>
              </ion-card>
            </ion-row>
          </ion-list>
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { BankHoliday } from "@/types/index";
import { getDummyData } from "@/dummy";
const bankHolidays: BankHoliday[] = getDummyData(); // TODO: replace
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
