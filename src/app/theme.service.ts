import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private dark = false;

  constructor() {}

  toggleTheme() {
    this.dark = !this.dark;
    document.documentElement.classList.toggle("dark");
  }
}
