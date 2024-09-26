package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"path"
	"potbut/datalayer/controllers/plant"
	"potbut/datalayer/controllers/pot"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

func getFirebaseApp() (*firebase.App, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}
	if project, exists := os.LookupEnv("GOOGLE_CLOUD_PROJECT"); exists {
		ctx := context.Background()
		conf := &firebase.Config{ProjectID: project}
		app, err := firebase.NewApp(ctx, conf)
		return app, err
	}
	sa := option.WithCredentialsFile(path.Join(home, "potbut-d8c82-firebase-adminsdk-8rgls-2054b45578.json"))
	return firebase.NewApp(context.Background(), nil, sa)

}

func main() {
	app, err := getFirebaseApp()

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FIREBASE CLIENT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//service account
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	// create Firestore client
	client, err := app.Firestore(context.Background())
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	defer client.Close() // close client when main() returns (i.e., app off)

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HANDLER CALLS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// TODO define custom middleware (output custom error message to user)
	router := gin.Default() // default logging and recovery
	router.POST("/plants", plant.CreatePlant(client.Collection("Plants")))
	router.POST("/pot", pot.WriteReading(client.Collection("Pots")))
	router.GET("/", indexHandler)

	port := os.Getenv("PORT")

	if port == "" {
		port = "50080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	router.Run("localhost:" + port) //starts the server, 8080 was being used
}

func indexHandler(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Hello, World!")
}
