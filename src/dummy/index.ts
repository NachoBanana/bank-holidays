import { BankHoliday } from "@/types"

// Don't judge me
export function getDummyData(): BankHoliday[] {
    const bankHolidays: BankHoliday[] = [];
    const bankH1 = new BankHoliday();
    const bankH2 = new BankHoliday();
    const bankH3 = new BankHoliday();

    bankH1.id = 1;
    bankH1.name = "1st BH";
    bankH1.description = "A great day off 1";
    bankH1.country = "Ireland";
    bankH1.country_id = "ie"
    bankH1.date = new Date();

    bankH2.id = 2;
    bankH2.name = "2nd BH";
    bankH2.description = "A great day off 2";
    bankH2.country = "UK";
    bankH2.country_id = "uk"
    bankH2.date = new Date();

    bankH3.id = 3;
    bankH3.name = "3rd BH";
    bankH3.description = "A great day off 3";
    bankH3.country = "Ireland";
    bankH3.country_id = "ie"
    bankH3.date = new Date();

    bankHolidays[0] = bankH1;
    bankHolidays[1] = bankH2;
    bankHolidays[2] = bankH3;
    return bankHolidays;
}