import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InnerworksMetrics } from '@innerworks-me/iw-auth-sdk';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-frontend-flow-demo-page',
  templateUrl: './frontend-flow-demo-page.component.html',
  styleUrls: ['./frontend-flow-demo-page.component.css']
})
export class FrontendFlowDemoPageComponent implements AfterViewInit {
  userName: string = '';
  password: string = '';
  innerworksMetrics: InnerworksMetrics | null = null;
  authError: string | null = null;
  authSuccess: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    console.log('Initializing InnerworksMetrics with project ID:', environment.FRONTEND_FLOW_PROJECT_ID);
    this.innerworksMetrics = new InnerworksMetrics(environment.FRONTEND_FLOW_PROJECT_ID, '#signin-button');
    console.log('InnerworksMetrics initialized:', this.innerworksMetrics);
  }  

  async handleSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      const id = this.mockAuthenticator(username, password);

      if (id) {
        this.authError = null;
        if (this.innerworksMetrics) {
          const metricsSendSuccess = await this.innerworksMetrics.send(id);
          if (metricsSendSuccess) {
            this.authSuccess = true;
          } else {
            this.authError = "Error when sending innerworks metrics";
          }
        } else {
          this.authError = "Innerworks SDK is not defined";
        }
      } else {
        this.authError = "Username or Password Incorrect";
      }
    }
  }

  mockAuthenticator(username: string, password: string): string | null {
    if (username === "test-username" && password === "password") {
      return "mock-user-id";
    }
    return null;
  }
}
