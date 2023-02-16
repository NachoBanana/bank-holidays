export type BankHolidays = {
    name: string;
    display_name: string;
    holidays: [
        {
            name: string,
            date: string
        }
    ];
}

export type Country = {
    name: string;
    display_name: string;
}