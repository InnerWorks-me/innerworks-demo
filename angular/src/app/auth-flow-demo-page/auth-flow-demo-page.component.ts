import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InnerworksAuth } from '@innerworks-me/iw-auth-sdk';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-flow-demo-page',
  templateUrl: './auth-flow-demo-page.component.html',
  styleUrls: ['./auth-flow-demo-page.component.css']
})
export class AuthFlowDemoPageComponent implements OnInit, AfterViewInit {
  innerworksAuth: InnerworksAuth | null = null;

  @ViewChild('buttonContainer', { static: false }) buttonContainerRef!: ElementRef;

  ngOnInit(): void {
    this.innerworksAuth = new InnerworksAuth(
      environment.AUTH_PROJECT_ID,
      `${environment.BASE_URL}/auth-flow-demo/callback`
    );
  }

  ngAfterViewInit(): void {
    if (this.innerworksAuth && this.buttonContainerRef) {
      const button = this.innerworksAuth.getInnerworksSignInButton();
      this.buttonContainerRef.nativeElement.appendChild(button);
    }
  }
}
