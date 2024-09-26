package plant

import (
	"log"
	"net/http"
	"potbut/datalayer/entities"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

// RESTful C.R.U API controller functions
// e.g., GET, POST, etc.

// input: target endpoint
// output: handler function (POST)
func CreatePlant(plants *firestore.CollectionRef) gin.HandlerFunc {
	fn := func(ctx *gin.Context) { // ALWAYS return a (handler) func
		var plant entities.Plant 

		// TODO use shouldBindJson to define custom error msgs
		if err := ctx.BindJSON(&plant); err != nil {  // MUST bind plant entity to JSON 
			ctx.JSON(http.StatusBadRequest, gin.H{"code": http.StatusBadRequest, "message": err.Error()})
			return
		}

		log.Println("created plant", plant)

		wr, err := plants.NewDoc().Create(ctx, &plant) // create new entry in Plants collection
		if err != nil { // server error
			ctx.JSON(http.StatusInternalServerError, gin.H{"code": http.StatusInternalServerError, "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"created_at": wr.UpdateTime, "id": plant.UserID, "name": plant.PlantName}) // success statement
	}
	return fn
}
