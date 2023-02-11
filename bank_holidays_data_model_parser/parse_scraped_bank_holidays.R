## Clear existing variables / lodad libraries
rm(list=ls())
library(tidyverse)
library(formattable)
library(janitor)
library(lubridate)
library(jsonlite)

## Check current Working Directory
getwd()

## Read in the raw (scraped) data file
fname_and_path <- "./raw_bh_data/bank_holidays_raw.csv"

dat <- read_csv(fname_and_path) %>% clean_names()
View(dat)

glimpse(dat)

# For each bank holiday - calculate if the date has passed already
dat <- dat %>% mutate(
  complete_date = as_date(paste0(date, "-", year), format="%d-%b-%Y")
dat <- dat %>% mutate(
  complete_date = as_date(paste0(date, "-", year), format="%d-%b-%Y"),
)

# Calculate the next upcoming bank holiday - for each country
df_closest_bh_date_by_country <- dat %>%
  filter(date_has_passed == FALSE) %>% 
  group_by(country) %>% 
  slice_min(complete_date) %>% 
  select(country,complete_date) %>% 
dat <-
  left_join(
    x = dat
    ,y = df_closest_bh_date_by_country
    ,by = "country"
  )

## Create a Boolean representation of the closest data-set
dat <-
  left_join(
    x = dat
    ,y = df_closest_bh_date_by_country,
    ,by = "country"
  )

dat <- dat %>%
  mutate(
    is_closest_bh_date = complete_date == closest_bh_date
  )

# Convert data to JSON format
json_dat <- toJSON(list(features = names(dat), values=dat), pretty = TRUE )

# write JSON file to disk
con <- file("./json_data_output/bank_holidays_processed_json.json")
writeLines(json_dat, con)
close(con)


# write data to disk in CSV format
write_csv(dat,
          "./csv_data_output/bank_holidays_processed_csv.csv")
json_dat <- toJSON(list(features = names(dat), values=dat), pretty = TRUE )


con <- file("bank_holidays_processed_json.json")
writeLines(json_dat, con)
close(con)

write_csv(dat,
          "bank_holidays_processed_csv.csv")
