import { http } from "@/api";
import { BankHolidays, Country } from "@/types/index";
import { defineStore } from "pinia";

const BACKEND_HOST = process.env.HOST_BACKEND || "localhost"
const BACKEND_PORT = process.env.PORT_BACKEND || 8080
const BACKEND_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/v1`;

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
                this.countries = await http(`${BACKEND_URL}/countries`);
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
                const bh = await http(`${BACKEND_URL}/countries/${search}`);
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
