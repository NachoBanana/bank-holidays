package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	endpoints "github.com/NachoBanana/bank-holiday-backend-go/cmd"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	var PORT uint16 = getPort()
	var ALLOWED_ORIGINS []string = getAllowedOrigins()

	router := gin.Default()
	customCors := cors.New(cors.Config{
		AllowOrigins:     ALLOWED_ORIGINS,
		AllowWildcard:    true,
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Mount middleware
	router.Use(customCors)

	// Group endpoints
	baseGroup := router.Group("/v1/")
	{
		baseGroup.GET("/", endpoints.Index)
		baseGroup.GET("/ping", endpoints.Ping)
		baseGroup.GET("/countries", endpoints.AllCountries)
		baseGroup.GET("/countries/:country", endpoints.GetCountry)
	}

	// Build server
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", PORT),
		Handler:      router,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// Launch the server
	log.Fatal(server.ListenAndServe())
}

func getPort() uint16 {
	var port uint16 = 8080

	if value := os.Getenv("PORT"); value != "" {
		if portUint, err := strconv.ParseUint(value, 10, 16); err == nil {
			port = uint16(portUint)
		}
	}

	return port
}

func getAllowedOrigins() []string {
	var allowedOrigins []string

	if frontendUrl := os.Getenv("FRONTEND_URL"); frontendUrl != "" {
		allowedOrigins = append(allowedOrigins, frontendUrl)
	} else {
		allowedOrigins = append(allowedOrigins, "http://localhost:*")
	}

	return allowedOrigins
}
