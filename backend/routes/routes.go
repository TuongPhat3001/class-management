package routes

import (
	"class-management/controller"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	classController := controller.NewClassController()

	api := router.Group("/api")
	{
		api.GET("/health", classController.Health)

		api.GET("/classes", classController.ListClasses)
		api.GET("/classes/:id", classController.GetClass)

		api.POST("/classes", classController.CreateClass)

		api.PUT("/classes/:id", classController.UpdateClass)

		api.DELETE("/classes/:id", classController.DeleteClass)
	}
}
