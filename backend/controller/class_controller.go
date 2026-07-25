package controller

import (
	"net/http"
	"strconv"

	"class-management/models"
	services "class-management/service"

	"github.com/gin-gonic/gin"
)

type ClassController struct {
	service *services.ClassService
}

func NewClassController() *ClassController {
	return &ClassController{
		service: services.NewClassService(),
	}
}

type ClassRequest struct {
	ClassCode   string `json:"classCode" binding:"required"`
	ClassName   string `json:"className" binding:"required"`
	Teacher     string `json:"teacher" binding:"required"`
	Room        string `json:"room" binding:"required"`
	Schedule    string `json:"schedule" binding:"required"`
	MaxStudents int    `json:"maxStudents" binding:"required"`
	Status      string `json:"status"`
}

// ==========================
// GET /api/classes
// ==========================
func (cc *ClassController) ListClasses(c *gin.Context) {

	classes, err := cc.service.GetAll()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Không thể lấy danh sách lớp",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Lấy danh sách lớp thành công",
		"data":    classes,
	})
}

// ==========================
// GET /api/classes/:id
// ==========================
func (cc *ClassController) GetClass(c *gin.Context) {

	id, err := strconv.ParseUint(c.Param("id"), 10, 64)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "ID không hợp lệ",
		})
		return
	}

	class, err := cc.service.GetByID(uint(id))

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Không tìm thấy lớp",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Lấy lớp thành công",
		"data":    class,
	})
}

// ==========================
// POST /api/classes
// ==========================
func (cc *ClassController) CreateClass(c *gin.Context) {

	var req ClassRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Dữ liệu không hợp lệ",
			"error":   err.Error(),
		})

		return
	}

	class := models.Class{
		ClassCode:   req.ClassCode,
		ClassName:   req.ClassName,
		Teacher:     req.Teacher,
		Room:        req.Room,
		Schedule:    req.Schedule,
		MaxStudents: req.MaxStudents,
		Status:      req.Status,
	}

	if err := cc.service.Create(&class); err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Tạo lớp thất bại",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Tạo lớp thành công",
		"data":    class,
	})
}

// ==========================
// PUT /api/classes/:id
// ==========================
func (cc *ClassController) UpdateClass(c *gin.Context) {

	id, err := strconv.ParseUint(c.Param("id"), 10, 64)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "ID không hợp lệ",
		})

		return
	}

	class, err := cc.service.GetByID(uint(id))

	if err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"message": "Không tìm thấy lớp",
		})

		return
	}

	var req ClassRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Dữ liệu không hợp lệ",
			"error":   err.Error(),
		})

		return
	}

	class.ClassCode = req.ClassCode
	class.ClassName = req.ClassName
	class.Teacher = req.Teacher
	class.Room = req.Room
	class.Schedule = req.Schedule
	class.MaxStudents = req.MaxStudents
	class.Status = req.Status

	if err := cc.service.Update(class); err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Cập nhật thất bại",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Cập nhật lớp thành công",
		"data":    class,
	})
}

// ==========================
// DELETE /api/classes/:id
// ==========================
func (cc *ClassController) DeleteClass(c *gin.Context) {

	id, err := strconv.ParseUint(c.Param("id"), 10, 64)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "ID không hợp lệ",
		})

		return
	}

	if err := cc.service.Delete(uint(id)); err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Xóa lớp thất bại",
			"error":   err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Xóa lớp thành công",
	})
}

// ==========================
// GET /api/health
// ==========================
func (cc *ClassController) Health(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"status": "UP",
	})
}
