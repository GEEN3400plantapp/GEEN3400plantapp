package user

import (
	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

// RESTful C.R.U API controller functions
// e.g., GET, POST, etc.

// TODO write POST method (single user)

// TODO write GET method (single user)

//getUsers responds with the list of all users as JSON
func GetUsers(users *firestore.CollectionRef) gin.HandlerFunc {
	fn := func(ctx *gin.Context) {
		// TODO write GET method
	}
	return fn
}
