## Clear existing variables / lodad libraries
rm(list=ls())
library(tidyverse)
library(formattable)
library(janitor)
library(lubridate)
library(jsonlite)

## Check current Working Directory
getwd()

fname_and_path <- "C:/Users/jjbadsinclair/json_sanbox/bank_holidays_raw.csv"

dat <- read_csv(fname_and_path) %>% clean_names()
View(dat)

glimpse(dat)

dat <- dat %>% mutate(
  complete_date = as_date(paste0(date, "-", year), format="%d-%b-%Y"),
  ,day_of_the_week = wday(x=complete_date, label=TRUE, abbr=FALSE)
  ,day_of_the_year = yday(x=complete_date)
  ,today = today()
  ,date_has_passed = complete_date < today
)

df_closest_bh_date_by_country <- dat %>%
  filter(date_has_passed == FALSE) %>% 
  group_by(country) %>% 
  slice_min(complete_date) %>% 
  select(country,complete_date) %>% 
  rename(closest_bh_date = complete_date)

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

json_dat <- toJSON(list(features = names(dat), values=dat), pretty = TRUE )


con <- file("bank_holidays_processed_json.json")
writeLines(json_dat, con)
close(con)

write_csv(dat,
          "bank_holidays_processed_csv.csv")
