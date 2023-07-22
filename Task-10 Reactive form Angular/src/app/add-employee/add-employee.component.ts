import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  title = "Angular Template-driven Forms";
  employee: any = {};

  constructor() {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { name, score, email } = this.employee;

      // Validate score
      const parsedScore = parseInt(score);
      if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
        const scoreError = document.getElementById('scoreError') as HTMLElement;
        scoreError.innerText = "Please enter a number between 1 and 100";
        scoreError.classList.add('error');
        return;
      }

      // Validate email
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!emailRegex.test(email)) {
        const emailError = document.getElementById('emailError') as HTMLElement;
        emailError.innerText = "You have entered an invalid email address";
        emailError.classList.add('error');
        return;
      }

      // Save employee data
      const employeeData = { name, score, email };
      let employees: any[] = JSON.parse(localStorage.getItem('employees') || '[]');
      employees.unshift(employeeData);
      localStorage.setItem('employees', JSON.stringify(employees));

      console.log(employees);
      window.location.href = "/employee-detail";
    }
  }

  resetHandler() {
    this.employee = {};

    const scoreError = document.getElementById('scoreError') as HTMLElement;
    scoreError.innerText = '';

    const emailError = document.getElementById('emailError') as HTMLElement;
    emailError.innerText = '';
  }
}
