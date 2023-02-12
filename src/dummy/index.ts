import { BankHoliday } from "@/types"
import { values } from "../../bank_holidays_data_model_parser/json_data_output/bank_holidays_processed_json.json"

export function getDummyData(filter = "Ireland"): BankHoliday[] {
    const bankHolidays: BankHoliday[] = [];
    values.filter(e => e.country.match(filter)).forEach((e, index) => bankHolidays[index] = e);

    return bankHolidays;
}