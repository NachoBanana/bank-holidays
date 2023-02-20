package main

import (
	"fmt"

	endpoints "github.com/NachoBanana/bank-holiday-backend-go/cmd"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const PORT uint16 = 8080

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	baseGroup := router.Group("/v1/")
	{
		baseGroup.GET("/", endpoints.Index)
		baseGroup.GET("/ping", endpoints.Ping)
		baseGroup.GET("/countries", endpoints.AllCountries)
		baseGroup.GET("/countries/:country", endpoints.GetCountry)
	}

	address := fmt.Sprintf(":%d", PORT)
	router.Run(address)
}
