import { Component } from '@angular/core';
import { Quelquechose } from './classes/quelquechose';
import { C_Calculatrice } from './calculatrice/calculatrice.component';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'Liste de QuelqueChoses';

	editing:boolean = false;
	toggleEditing(): void {
	this.editing = !this.editing;
	}
	/*editable(text:string): string {
	return this.editing
		? "<input [(ngModel)]=chose.prenom>"
		: "<span (click)=toggleEditing()>" + text + "</span>";
	}*/

	choses:Quelquechose[] = [
		new Quelquechose('Maldives', 'Bubulle', 'intelligent', 'boulanger'),
		new Quelquechose('Bêta', 'Maxima')
	]
}