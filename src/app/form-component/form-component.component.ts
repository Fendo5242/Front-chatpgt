import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../question.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponent implements OnInit {
  categories: any[] = [];
  questions: any[] = [];
  answers: { [key: number]: string } = {};

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.questionService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = parseInt(selectElement.value, 10);
    if (!isNaN(categoryId)) {
      this.getQuestionsByCategory(categoryId);
    }
  }

  getQuestionsByCategory(categoryId: number): void {
    this.questionService.getQuestionsByCategory(categoryId).subscribe(
      questions => {
        this.questions = questions.questions; // Ajusta esto según la estructura de tu respuesta API
        this.answers = {}; // Reiniciar respuestas al cambiar de categoría
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }

  onAnswerChange(questionId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.answers[questionId] = inputElement.value;
  }

  onSubmit(): void {
    const result = this.questions.map(question => {
      const answer = this.answers[question.questionID] || 'No answer';
      return `${question.textEn}: ${answer}`;
    }).join('\n');

    console.log(result);
  }
}

