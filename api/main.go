package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	endpoints "github.com/NachoBanana/bank-holiday-backend-go/cmd"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/sync/errgroup"
)

const PORT_API uint16 = 8080
const PORT_FRONTEND uint16 = 8081
const FRONTEND_DIR string = "./dist"

func makeApiRouter() http.Handler {
	router := gin.Default()
	defaultCors := cors.Default()

	// Mount middleware
	router.Use(defaultCors)

	// Group endpoints
	baseGroup := router.Group("/v1/")
	{
		baseGroup.GET("/", endpoints.Index)
		baseGroup.GET("/ping", endpoints.Ping)
		baseGroup.GET("/countries", endpoints.AllCountries)
		baseGroup.GET("/countries/:country", endpoints.GetCountry)
	}

	return router
}

func makeFrontendRouter() http.Handler {
	router := gin.Default()
	defaultCors := cors.Default()

	// Mount middleware
	router.Use(defaultCors)

	router.StaticFS("/", gin.Dir(FRONTEND_DIR, true))

	return router
}

func main() {
	goGroup := errgroup.Group{}

	apiRouter := makeApiRouter()
	frontendRouter := makeFrontendRouter()

	api := &http.Server{
		Addr:         fmt.Sprintf(":%d", PORT_API),
		Handler:      apiRouter,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	frontend := &http.Server{
		Addr:         fmt.Sprintf(":%d", PORT_FRONTEND),
		Handler:      frontendRouter,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	goGroup.Go(func() error {
		return api.ListenAndServe()
	})
	goGroup.Go(func() error {
		return frontend.ListenAndServe()
	})

	if err := goGroup.Wait(); err != nil {
		log.Fatal(err)
	}
}
