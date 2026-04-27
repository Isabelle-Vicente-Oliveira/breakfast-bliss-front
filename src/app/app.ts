import { Component } from '@angular/core';
import { Header } from "./shared/components/header/header";
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Footer } from "./shared/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showLayout = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const hideRoutes = ['/login', '/register'];
      this.showLayout = !hideRoutes.includes(event.urlAfterRedirects);
    });
  }
}