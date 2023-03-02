<template>
  <ion-list>
    <ion-item>
      <ion-select
        interface="popover"
        @ionChange="newCountrySelected($event.detail.value)"
        placeholder="Select a country"
      >
        <ion-select-option
          v-for="({ display_name }, index) in store.getCountries"
          :key="index"
          >{{ display_name }}</ion-select-option
        >
      </ion-select>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/vue";
import { defineComponent } from "vue";
import { useCountryStore } from "@/stores/CountryStore";

export default defineComponent({
  components: { IonItem, IonList, IonSelect, IonSelectOption },
  methods: {
    newCountrySelected(value: string) {
      this.store.updateBankHolidays(value);
    },
  },
  mounted() {
    this.store.fetchDataForCountryList();
  },
  setup() {
    const store = useCountryStore();
    return { store };
  },
});
</script>