import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicio/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbard',
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css']
})
export class NavbardComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false; // Nueva variable para almacenar si el usuario tiene rol "USER"
  userName: string = '';  // Nueva variable para almacenar el nombre del usuario

  constructor(private authService: AuthService, private router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url.split('#')[1];
        if (url) {
          this.scrollToSection(url);
        }
      }
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    // Obtener el rol del usuario actual
    this.authService.getRole().subscribe(role => {
      this.isAdmin = role === 'ADMIN'; // Verificar si el rol es 'admin'
      this.isUser = role === 'USER'; // Verificar si el rol es 'user'
    });

    // Obtener el nombre del usuario actual
    this.authService.getUserName().subscribe(userName => {
      this.userName = userName;  // Almacenar el nombre del usuario
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  navigateToProfile(): void {
    if (this.isAdmin) {
      this.router.navigate(['/admin/perfil']);
    } else {
      this.router.navigate(['/user/perfil']);
    }
  }

  scrollToSection(section: string): void {
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  navigateAndScroll(section: string): void {
    if (this.router.url === '/home') {
      this.scrollToSection(section);
    } else {
      this.router.navigate(['/home'], { fragment: section });
    }
  }
}
