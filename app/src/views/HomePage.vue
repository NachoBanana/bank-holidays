<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bank Holiday App yo</ion-title>
        <CountrySelect />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <strong>Upcoming Bank Holidays</strong>
        <p>
          <holiday-list />
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import CountrySelect from "@/components/CountrySelect.vue";
import HolidayList from "@/components/HolidayList.vue";
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    CountrySelect,
    HolidayList
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
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

#past {
  color: #ad0101;
  background-color: aqua;
}

#present {
  color: #df0f0f;
  background-color: aqua;
}

#future {
  color: #df0f0f;
  background-color: aqua;
}
</style>
