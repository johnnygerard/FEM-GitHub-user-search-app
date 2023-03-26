import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _isDark: boolean;
  private readonly THEME_KEY = "isDark";
  private readonly THEME_CLASS = "dark";

  constructor() {
    // Restore user theme from local storage if present otherwise use browser/system theme
    this._isDark = localStorage[this.THEME_KEY]
      ? JSON.parse(localStorage[this.THEME_KEY])
      : matchMedia("(prefers-color-scheme: dark)").matches;

    // Apply theme
    if (this._isDark) document.documentElement.classList.add(this.THEME_CLASS);
  }

  get isDark(): boolean {
    return this._isDark;
  }

  // Toggle app theme between light and dark
  toggleTheme(): void {
    this._isDark = !this._isDark;
    document.documentElement.classList.toggle(this.THEME_CLASS);

    // Persist user theme setting in localStorage
    try {
      localStorage[this.THEME_KEY] = this._isDark.toString();
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError")
        console.error(e);
      else throw e;
    }
  }
}
