import { Component } from '@angular/core';
import { Header } from "../../shared/components/header/header";
import { SectionCards } from "../../shared/components/section-cards/section-cards";

@Component({
  selector: 'app-home',
  imports: [Header, SectionCards],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
