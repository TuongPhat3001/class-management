package config

import (
	"fmt"
	"log"
	"os"

	"class-management/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	username := getEnv("DB_USER", "root")
	password := getEnv("DB_PASSWORD", "")
	databaseName := getEnv("DB_NAME", "class_management")
	host := getEnv("DB_HOST", "localhost")
	port := getEnv("DB_PORT", "3306")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		username, password, host, port, databaseName)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	DB = db
	fmt.Println("Database connected successfully!")
}

func AutoMigrateDB() {
	if DB == nil {
		log.Fatal("Database is not connected")
	}

	if err := DB.AutoMigrate(

		&models.Class{},
	); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
}

func getEnv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
