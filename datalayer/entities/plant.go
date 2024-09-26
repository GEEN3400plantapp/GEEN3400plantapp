package entities

// User-defined data for each type of plant that they have
type Plant struct {
	UserID    string `firestore:"userid,omitempty"`
	PlantName string `firestore:"plantname,omitempty"`

	// UniqueThresh   bool    `firestore:"uniquethresh,omitempty"` //whether user has set their own threshholds
	// OverLightUser  float64 `firestore:"overlightuser,omitempty"`
	// PerfLightUser  float64 `firestore:"perflightuser,omitempty"`
	// UnderLightUser float64 `firestore:"underlightuser,omitempty"`
	// OverTempUser   float64 `firestore:"overtempuser,omitempty"`
	// PerfTempUser   float64 `firestore:"perftempuser,omitempty"`
	// UnderTempUser  float64 `firestore:"undertempuser,omitempty"`
	// OverMoistUser  float64 `firestore:"overmoistuser,omitempty"`
	// PerfMoistUser  float64 `firestore:"perfmoistuser,omitempty"`
	// UnderMoistUser float64 `firestore:"undermoistuser,omitempty"`
}
