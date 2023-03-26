import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _isDark = false;

  get isDark() {
    return this._isDark;
  }

  toggleTheme() {
    this._isDark = !this._isDark;
    document.documentElement.classList.toggle("dark");
  }
}
