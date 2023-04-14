export type BankHolidays = {
    name: string;
    display_name: string;
    holidays: IndividualHoliday[];
}

export type Country = {
    name: string;
    display_name: string;
}

export type IndividualHoliday = {
        name: string,
        date: string
    }
