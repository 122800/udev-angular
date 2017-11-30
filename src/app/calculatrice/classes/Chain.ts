import { C_Calculatrice } from '../calculatrice.component';
import { Link } from './link';

export class Chain {

	private parent:C_Calculatrice;

	private links:Link[];
	private curLink:Link;
	private firstLink:Link;

	constructor(parent:C_Calculatrice) {
		this.parent = parent;

		this.links;// just var storage
		this.curLink;// last link, currently in focus
		this.firstLink;

		this.init();
	}

	init(): void {
		this.links = [];// should free up memory as each link is no longer reachable through the DOM
		this.firstLink = this.spawnLink("0");
	}

	resolve(): void {
		let equation = this.firstLink.display(true);// clean display
		
		
		// test equation with regex for extra security! Don't trust eval()!
		// anonymous function acts as eval() but with global scope (prevent access to local variables)
		let result = Function("\
			'use strict';\
			return("+equation+");"
		)();
		
		this.parent.resolve(result);

		this.init();// effacer la chaîne
	}

	addInput(char): void {
		if(char == "CE") {
			this.init();
		} else {
			this.curLink.addInput(char);
		}
	}

	spawnLink(char): Link {
		let temp = new Link(this, char);

		this.curLink = temp;
		this.links.push(temp);

		return temp;
	}
	killLink(): void {
		// you are no longer my favorite child, I prefer your elder brother
		this.curLink = this.curLink.previous;
		this.links.pop();
	}

	display(): string {
		return this.firstLink.display();
	}
}