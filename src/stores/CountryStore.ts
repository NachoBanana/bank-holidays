import { http } from "@/api";
import { getDummyData } from "@/dummy";
import { defineStore } from "pinia";

export const useCountryStore = defineStore("CountryStore", {
    state: () => ({
        bankHolidayList: getDummyData(),
        loading: false,
        err: "",
        countries: []
    }),
    actions: {
        async fetchDataForCountryList() {
            try {
                this.loading = true;
                const { countries } = await http("http://localhost:8080/countries");
                this.countries = countries;
            } catch (error) {
                if (typeof error === "string") {
                    this.err = error;
                } else if (error instanceof Error) {
                    this.err = error.message;
                }
            }
        },
        async updateCountry(country: string) {
            try {
                this.loading = true;
                const bh = await getDummyData(country);
                this.bankHolidayList = bh;
            } catch (error) {
                if (typeof error === "string") {
                    this.err = error;
                } else if (error instanceof Error) {
                    this.err = error.message;
                }
            } finally {
                this.loading = false;
            }
        }
    },
    getters: {
        getCountries: state => state.countries,
        getLoading: state => state.loading,
        getError: state => state.err,
        getBankHolidayList: state => state.bankHolidayList
    }

});