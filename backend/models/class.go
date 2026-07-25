package models

import "time"

type Class struct {
	ID uint `gorm:"primaryKey" json:"id"`

	ClassCode   string `gorm:"size:20;unique;not null" json:"classCode"`
	ClassName   string `gorm:"size:100;not null" json:"className"`
	Teacher     string `gorm:"size:100;not null" json:"teacher"`
	Room        string `gorm:"size:50;not null" json:"room"`
	Schedule    string `gorm:"size:100;not null" json:"schedule"`
	MaxStudents int    `gorm:"not null" json:"maxStudents"`
	Status      string `gorm:"size:20;default:'Open'" json:"status"`

	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
