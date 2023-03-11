package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	endpoints "github.com/NachoBanana/bank-holiday-backend-go/cmd"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

const PORT uint16 = 8080
const FRONTEND_DIR string = "./dist"

func main() {
	router := gin.Default()
	defaultCors := cors.Default()
	staticMiddleware := static.Serve("/", static.LocalFile(FRONTEND_DIR, true))

	// Mount middleware
	router.Use(defaultCors)
	router.Use(staticMiddleware)

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
