package services

import (
	"class-management/models"
	"class-management/repository"
)

type ClassService struct {
	repo *repository.ClassRepository
}

func NewClassService() *ClassService {
	return &ClassService{
		repo: repository.NewClassRepository(),
	}
}

func (s *ClassService) GetAll() ([]models.Class, error) {
	return s.repo.GetAll()
}

func (s *ClassService) GetByID(id uint) (*models.Class, error) {
	return s.repo.GetByID(id)
}

func (s *ClassService) Create(class *models.Class) error {

	if class.Status == "" {
		class.Status = "Open"
	}

	return s.repo.Create(class)
}

func (s *ClassService) Update(class *models.Class) error {
	return s.repo.Update(class)
}

// Xóa
func (s *ClassService) Delete(id uint) error {
	return s.repo.Delete(id)
}
