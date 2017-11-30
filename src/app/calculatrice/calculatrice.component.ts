import { Component, OnInit } from '@angular/core';

import { Key } from './classes/Key';
import { Chain } from './classes/Chain';

@Component({
	selector: 'app-calculatrice',
	templateUrl: './calculatrice.component.html',
	styleUrls: ['./calculatrice.component.css']
})
export class C_Calculatrice implements OnInit {

	private visible:boolean = false;

	private keys:Key[] = [];
	private keys_aside:Key[] = [];

	private chain:Chain;
	private equation:string = "0";

	constructor() {
		this.chain = new Chain(this);
	}

	ngOnInit() {
		for (let i=0; i < 10; i++) {
			this.keys.push(new Key(String(i)));
		}

		let symbols = ",±←=";
		for(let char of symbols) {
			this.keys.push(new Key(char));
		}
		this.keys.push(new Key("CE"));

		let aside = "+-×÷";
		for(let char of aside) {
			this.keys_aside.push(new Key(char));
		}
	}

	clicked(key:Key): void {
		let char:string = key.get();
		if(char == "=") {
			this.chain.resolve();
		} else {
			this.chain.addInput(char);
			this.updateDisplay();
		}
	}

	resolve(eq:string): void {
		this.equation = eq;
	}
	updateDisplay(): void {
		this.equation = this.chain.display();
	}
}