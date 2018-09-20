import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Survey, Question, AnswerPossibility } from '../../models/survey.model';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit, OnChanges {

  questionForm: FormGroup;
  // question: String = '';
  @Input('question') question: Question;
  @Input('currentQuestionIndex') currentQuestionIndex: Number;
  currentQuestionType = '';
  @Output('questionTypeChange') questionTypeChange = new EventEmitter<String>();

  answerItems: AnswerPossibility[] = [];

  @Output('answerAdded') answerAdded = new EventEmitter<AnswerPossibility>();
  @Output('textAnswerAdded') textAnswerAdded = new EventEmitter<String>();
  questionTypes = [
    { label: 'Text', value: 'text' },
    { label: 'Single', value: 'single' },
    { label: 'Multiple', value: 'multiple' }
  ];

  constructor(private _fb: FormBuilder) {
    this.questionForm = this._fb.group({
      question: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('question:', this.question);
    if (!this.question.question) {
      this.question.question = '';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('onChanges: changes:', changes);
    if (changes.question.currentValue.questionType.length === 0) {
      this.currentQuestionType = null;
    } else {
      this.currentQuestionType = changes.question.currentValue.questionType;
    }
  }

  setQuestionType($event) {
    this.currentQuestionType = $event.value;
    this.questionTypeChange.emit(this.currentQuestionType);
  }

  addAnswerPossibility() {
    let answerPossibility: AnswerPossibility = {
      answerPossibility: ''
    };
    this.answerAdded.emit(answerPossibility);
  }

  setTextAnswer($event) {
    this.textAnswerAdded.emit($event.target.value);
  }

}
