import { http } from "@/api";
import { BankHolidays, Country } from "@/types/index";
import { defineStore } from "pinia";

export const useCountryStore = defineStore("CountryStore", {
    state: () => ({
        bankHolidays: {} as BankHolidays,
        loading: false,
        err: "",
        countries: [] as Country[]
    }),
    actions: {
        async fetchDataForCountryList() {
            try {
                this.loading = true;
                this.countries = await http("http://localhost:8080/v1/countries");
            } catch (error) {
                if (typeof error === "string") {
                    this.err = error;
                } else if (error instanceof Error) {
                    this.err = error.message;
                }
            }
        },
        async updateBankHolidays(country: string) {
            try {
                this.loading = true;
                const search = this.countries.filter((e) => e.display_name === country)[0].name;
                const bh = await http(`http://localhost:8080/v1/countries/${search}`);
                this.bankHolidays = bh;
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
        getBankHolidays: state => state.bankHolidays
    }

});