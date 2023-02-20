package endpoints

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

// irishCalendarId := "en.irish.official#holiday@group.v.calendar.google.com"
// icelandicCalendarId := "en.is.official#holiday@group.v.calendar.google.com"

func Index(context *gin.Context) {
	message := map[string]string{
		"message": "Welcome to the Bank Holiday application interface.",
	}
	context.JSON(200, message)
}

func Ping(context *gin.Context) {
	message := map[string]string{
		"message": "pong",
	}
	context.JSON(200, message)
}

func AllCountries(context *gin.Context) {
	response := []map[string]string{}
	countries := getData(staticFile{})

	for _, country := range countries {
		entry := map[string]string{
			"name":         country.Name,
			"display_name": country.DisplayName,
		}
		response = append(response, entry)
	}

	context.JSON(200, response)
}

func GetCountry(context *gin.Context) {
	parameter := Country{}
	countries := getData(staticFile{})

	if err := context.ShouldBindUri(&parameter); err != nil {
		message := map[string]string{
			"error": fmt.Sprintf("Incorrect URL: %s", err),
		}
		context.JSON(400, message)
		return
	}

	for _, country := range countries {
		if country.Name == parameter.Name {
			context.JSON(200, country)
			return
		}
	}

	message := map[string]string{
		"error": fmt.Sprintf("Country `%s` is not supported", parameter.Name),
	}
	context.JSON(404, message)
}
