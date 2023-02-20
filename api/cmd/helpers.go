package endpoints

import (
	"encoding/json"
	"log"
	"os"
)

const DATA_FILE string = "./data/holidays.json"

type Country struct {
	Name        string    `uri:"country" binding:"required"`
	DisplayName string    `json:"display_name"`
	Holidays    []Holiday `json:"holidays"`
}

type Holiday struct {
	Name string `json:"name"`
	Date string `json:"date"`
}

func getData(getter dataGetter) []Country {
	countries := getter.getData()

	return countries
}

type dataGetter interface {
	getData() []Country
}

type staticFile struct{}

func (file staticFile) getData() []Country {
	countries := []Country{}

	data, err := os.ReadFile(DATA_FILE)
	if err != nil {
		log.Fatalf("Failed to read file: %s", DATA_FILE)
	}

	if err := json.Unmarshal(data, &countries); err != nil {
		log.Fatalf("ERROR: Failed to unmarshal the file content: %v", err)
	}

	return countries
}
