import { http } from "@/api";
import { BankHolidays, Country } from "@/types/index";
import { defineStore } from "pinia";

const HOST_API = process.env.VUE_APP_HOST_API || "localhost";
const PORT_API = process.env.VUE_APP_PORT_API || 8080;
const API_ADDRESS = `http://${HOST_API}:${PORT_API}/v1`;

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
                this.countries = await http(`${API_ADDRESS}/countries`);
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
                const bh = await http(`${API_ADDRESS}/countries/${search}`);
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
