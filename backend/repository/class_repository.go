package repository

import (
	"class-management/config"
	"class-management/models"
)

type ClassRepository struct{}

func NewClassRepository() *ClassRepository {
	return &ClassRepository{}
}

func (r *ClassRepository) GetAll() ([]models.Class, error) {
	var classes []models.Class
	err := config.DB.Order("id DESC").Find(&classes).Error
	return classes, err
}

func (r *ClassRepository) GetByID(id uint) (*models.Class, error) {
	var class models.Class

	if err := config.DB.First(&class, id).Error; err != nil {
		return nil, err
	}

	return &class, nil
}

func (r *ClassRepository) Create(class *models.Class) error {
	return config.DB.Create(class).Error
}

func (r *ClassRepository) Update(class *models.Class) error {
	return config.DB.Save(class).Error
}

func (r *ClassRepository) Delete(id uint) error {
	return config.DB.Delete(&models.Class{}, id).Error
}
