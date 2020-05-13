package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

// An Item is an Animal Crossing item
type Item struct {
	Category             string        `json:"sourceSheet"`
	Name                 string        `json:"name"`
	PatternTitle         string        `json:"patternTitle"`
	DIY                  bool          `json:"diy"`
	PatternCustomize     bool          `json:"patternCustomize"`
	Size                 string        `json:"size"`
	SourceNotes          string        `json:"sourceNotes"`
	Version              string        `json:"version"`
	Interact             string        `json:"interact"`
	Tag                  string        `json:"tag"`
	SpeakerType          string        `json:"speakerType"`
	LightingType         string        `json:"lightingType"`
	Catalog              string        `json:"catalog"`
	Set                  string        `json:"set"`
	Series               string        `json:"series"`
	CustomizationKitCost int           `json:"customizationKitCost"`
	Variants             []ItemVariant `json:"variants"`
}

// An ItemVariant is a specific instance of an Item
type ItemVariant struct {
	ImagePath     string   `json:"image"`
	Variation     string   `json:"variation"`
	Filename      string   `json:"filename"`
	VariantID     string   `json:"variantId"`
	UniqueEntryID string   `json:"uniqueEntryId"`
	Colors        []string `json:"colors"`
	Pattern       string   `json:"pattern"`
	BodyCustomize bool     `json:"bodyCustomize"`
	BodyTitle     string   `json:"bodyTitle"`
	Source        []string `json:"source"`
	InternalID    int      `json:"internalId"`
	BuyPrice      int      `json:"buy"`
	SellPrice     int      `json:"sell"`
	Themes        []string `json:"themes"`
}

func main() {
	// Use a service account
	jsonFilePath := os.Args[1]

	jsonFile, err := ioutil.ReadFile(jsonFilePath)
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Printf("Successfully opened %v\n", jsonFilePath)

	var items []Item
	json.Unmarshal(jsonFile, &items)

	ctx := context.Background()
	sa := option.WithCredentialsFile("./serviceAccount.json")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}

	defer client.Close()

	for _, item := range items {
		_, _, err := client.Collection("items").Add(ctx, map[string]interface{}{
			"name":                 item.Name,
			"category":             item.Category,
			"patternTitle":         item.PatternTitle,
			"diy":                  item.DIY,
			"patternCustomize":     item.PatternCustomize,
			"size":                 item.Size,
			"sourceNotes":          item.SourceNotes,
			"version":              item.Version,
			"interact":             item.Interact,
			"tag":                  item.Tag,
			"speakerType":          item.SpeakerType,
			"lightingType":         item.LightingType,
			"catalog":              item.Catalog,
			"set":                  item.Set,
			"series":               item.Series,
			"customizationKitCost": item.CustomizationKitCost,
			"variants":             item.Variants,
		})

		if err != nil {
			log.Fatalln(err)
		}

		log.Printf("%v imported\n", item.Name)
	}
}
