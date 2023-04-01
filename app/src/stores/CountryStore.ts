import { http } from "@/api";
import { BankHolidays, Country, IndividualHoliday } from "@/types/index";
import { defineStore } from "pinia";

export const useCountryStore = defineStore("CountryStore", {
    state: () => ({
        bankHolidays: {} as BankHolidays,
        loading: false,
        err: "",
        countries: [] as Country[],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
    }),
    actions: {
        async fetchDataForCountryList() {
            this.loading = true;
            this.countries = await http("http://localhost:8080/v1/countries")
                .then((item) => item)
                .catch((error) => {
                    if (typeof error === "string") {
                        this.err = error;
                    } else if (error instanceof Error) {
                        this.err = error.message;
                    }
                });
        },
        async updateBankHolidays(country: string) {
            this.loading = true;
            const search = this.countries.filter((e) => e.display_name === country)[0].name;
            await http(`http://localhost:8080/v1/countries/${search}`)
                .then((item: BankHolidays) => {
                    item.holidays = item.holidays.sort((a, b) => {
                        const aDate = new Date(a.date);
                        const bDate = new Date(b.date);
                        if (aDate < bDate) return -1;
                        if (aDate > bDate) return 1;
                        return 0;
                    });
                    this.bankHolidays = item;
                })
                .catch((error) => {
                    if (typeof error === "string") {
                        this.err = error;
                    } else if (error instanceof Error) {
                        this.err = error.message;
                    }
                })
                .finally(() => { this.loading = false });
        }
    },
    getters: {
        getCountries: state => state.countries,
        getLoading: state => state.loading,
        getError: state => state.err,
        getBankHolidays: state => state.bankHolidays,
        getHolidayList: state => state.bankHolidays.holidays,
        getDayOfWeek: state => {
            return (day: number) => state.dayNames[day];
        },
        getMonth: state => {
            return (month: number) => state.monthNames[month];
        },
        getDisplayName: state => state.bankHolidays.display_name,
        get2023HolidayList: state => state.bankHolidays?.holidays?.filter(function (u: any) {
            console.log(u)
            return (u.date.startsWith("2023"))
        }),
        getBankHolidaysGroupedByYear: state => {
            const groupedHolidays = new Map<number, IndividualHoliday[]>();
            state.bankHolidays?.holidays?.forEach((holiday) => {
              const year = new Date(holiday.date).getFullYear();
              const currentGroupedHoliday = groupedHolidays.get(year);
              currentGroupedHoliday?.push(holiday);
              groupedHolidays.set(year, currentGroupedHoliday || [holiday]);
            });
      
            return groupedHolidays;
          },
    }

});