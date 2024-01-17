import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('glow', [
      state('inactive', style({ boxShadow: 'none' })),
      state('active', style({ boxShadow: '0 0 10px 5px rgba(5, 247, 90, 0.7)' })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out')),
    ]),
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  itemState = 'inactive';
  currentRoute: string = '';
  itemStates: string[] = ['inactive', 'inactive', 'inactive'];

  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        console.log('Current Route:', this.currentRoute); // Log the current route for debugging
      }
    });
  }

  ngOnInit() {

  }
}
