package pot

import (
	"log"
	"net/http"
	"potbut/datalayer/entities"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

// RESTful C.R.U API controller functions
// e.g., GET, POST, etc.

// getTemp responds with the float64 temp sens value
func GetTemp(c *gin.Context) {
	// TODO: How to retrieve specific value from JSON?
}

func WriteReading(pots *firestore.CollectionRef) gin.HandlerFunc {
	fn := func(ctx *gin.Context) { // ALWAYS return a (handler) func
		var pot entities.Pot

		// TODO use shouldBindJson to define custom error msgs
		if err := ctx.BindJSON(&pot); err != nil { // MUST bind pot entity to JSON
			ctx.JSON(http.StatusBadRequest, gin.H{"code": http.StatusBadRequest, "message": err.Error()})
			return
		}

		log.Println("moisture data sent to database", pot)

		wr, err := pots.NewDoc().Create(ctx, &pot) // create new entry in Pot collection
		if err != nil {                            // server error
			ctx.JSON(http.StatusInternalServerError, gin.H{"code": http.StatusInternalServerError, "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"created_at": wr.UpdateTime, "water": pot.Water}) // success statement
	}
	return fn
}
