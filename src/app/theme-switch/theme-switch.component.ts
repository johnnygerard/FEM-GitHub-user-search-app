import { Component } from "@angular/core";
import { ThemeService } from "../theme.service";

@Component({
  selector: "app-theme-switch",
  templateUrl: "./theme-switch.component.html",
  styleUrls: ["./theme-switch.component.scss"],
})
export class ThemeSwitchComponent {
  protected isDark: boolean;

  constructor(private theme: ThemeService) {
    this.isDark = this.theme.isDark;
  }

  protected toggleTheme() {
    this.theme.toggleTheme();
    this.isDark = !this.isDark;
  }
}
