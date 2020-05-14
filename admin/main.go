package main

import (
	"fmt"
	"nookiverse/data"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Invalid arguments. Valid choices are: 'update' | 'list'")
		return
	}

	action := os.Args[1]

	switch action {
	case "update":
		if len(os.Args) < 3 {
			fmt.Println("Invalid update options. Valid choices are: 'items'")
			return
		}

		options := os.Args[2]
		update(options)
	case "list":
		if len(os.Args) < 3 {
			fmt.Println("Invalid list options. Valid choices are: 'itemCategories'")
			return
		}

		list(os.Args[2])
	default:
		fmt.Println("Invalid option")

	}
}

func update(dataType string) {
	switch dataType {
	case "items":
		if len(os.Args) < 4 {
			fmt.Println("Path to JSON file is missing")
			return
		}

		jsonFilePath := os.Args[3]
		data.ImportItems(jsonFilePath)
	default:
		fmt.Println("Invalid update type")
	}
}

func list(dataType string) {
	switch dataType {
	case "itemCategories":
		data.ListItemCategories()
	default:
		fmt.Println("Invalid list type")
	}
}
