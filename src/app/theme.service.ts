import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _isDark: boolean;

  constructor() {
    if ((this._isDark = matchMedia("(prefers-color-scheme: dark)").matches))
      document.documentElement.classList.add("dark");
  }

  get isDark(): boolean {
    return this._isDark;
  }

  toggleTheme(): void {
    this._isDark = !this._isDark;
    document.documentElement.classList.toggle("dark");
  }
}
