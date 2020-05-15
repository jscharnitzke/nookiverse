package data

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"sort"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
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
	DoorDeco             bool          `json:"doorDeco"`
	VFX                  bool          `json:"vfx"`
	VFXType              string        `json:"vfxType"`
	WindowType           string        `json:"windowType"`
	WindowColor          string        `json:"windowColor"`
	PaneType             string        `json:"paneType"`
	CurtainType          string        `json:"curtainType"`
	CurtainColor         string        `json:"curtainColor"`
	CeilingType          string        `json:"ceilingType"`
	Customizeable        bool          `json:"customize"`
	Uses                 int           `json:"uses"`
	StackSize            int           `json:"stackSize"`
	SeasonalAvailability string        `json:"seasonalAvailability"`
	Style                string        `json:"style"`
	PrimaryShape         string        `json:"primaryShape"`
	SecondaryShape       string        `json:"secondaryShape"`
	Type                 string        `json:"type"`
	Museum               string        `json:"museum"`
	SourceSheet          string        `json:"category"`
	RealArtworkTitle     string        `json:"realArtworkTitle"`
	Artist               string        `json:"artist"`
	MuseumDescription    string        `json:"museumDescription"`
}

// An ItemVariant is a specific instance of an Item
type ItemVariant struct {
	ImagePath      string   `json:"image"`
	Variation      string   `json:"variation"`
	Filename       string   `json:"filename"`
	VariantID      string   `json:"variantId"`
	UniqueEntryID  string   `json:"uniqueEntryId"`
	Colors         []string `json:"colors"`
	Pattern        string   `json:"pattern"`
	BodyCustomize  bool     `json:"bodyCustomize"`
	BodyTitle      string   `json:"bodyTitle"`
	Source         []string `json:"source"`
	InternalID     int      `json:"internalId"`
	BuyPrice       int      `json:"buy"`
	SellPrice      int      `json:"sell"`
	Themes         []string `json:"themes"`
	ClosetImage    string   `json:"closetImage"`
	StorageImage   string   `json:"storageImage"`
	LabelThemes    []string `json:"labelThemes"`
	FramedImage    string   `json:"framedImage"`
	InventoryImage string   `json:"inventoryImage"`
	Genuine        bool     `json:"genuine"`
	HighResTexture string   `json:"highResTexture"`
}

// ImportItems imports items into Firestore from a JSON file
func ImportItems(jsonFilePath string) {
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
		var mappedVariants []map[string]interface{}

		for _, variant := range item.Variants {
			mappedVariants = append(mappedVariants, map[string]interface{}{
				"imagePath":      variant.ImagePath,
				"variation":      variant.Variation,
				"filename":       variant.Filename,
				"variantId":      variant.VariantID,
				"uniqueEntryId":  variant.UniqueEntryID,
				"colors":         variant.Colors,
				"pattern":        variant.Pattern,
				"bodyCustomize":  variant.BodyCustomize,
				"bodyTitle":      variant.BodyTitle,
				"source":         variant.Source,
				"internalId":     variant.InternalID,
				"buyPrice":       variant.BuyPrice,
				"sellPrice":      variant.SellPrice,
				"themes":         variant.Themes,
				"closetImage":    variant.ClosetImage,
				"storageImage":   variant.StorageImage,
				"labelThemes":    variant.LabelThemes,
				"framedImage":    variant.FramedImage,
				"inventoryImage": variant.InventoryImage,
				"genuine":        variant.Genuine,
				"highResTexture": variant.HighResTexture,
			})
		}

		_, err := client.Collection("items").Doc(item.Name).Set(ctx, map[string]interface{}{
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
			"variants":             mappedVariants,
		}, firestore.MergeAll)

		if err != nil {
			log.Fatalln(err)
		}

		log.Printf("%v imported\n", item.Name)
	}
}

// ListItemCategories lists all unique item categories in Firestore
func ListItemCategories() {
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

	items := client.Collection("items").Documents(ctx)

	if items == nil {
		fmt.Println("No items fetched")
		return
	}

	var itemCategoryMap = make(map[string]int)

	for {
		doc, err := items.Next()
		if err == iterator.Done {
			break
		}

		if err != nil {
			fmt.Println(err)
		}

		category, err := doc.DataAt("category")

		itemCategoryMap[category.(string)] = 1
	}

	var itemCategories []string

	for key := range itemCategoryMap {
		itemCategories = append(itemCategories, key)
	}

	sort.Strings(itemCategories)

	for _, category := range itemCategories {
		fmt.Println(category)
	}
}
