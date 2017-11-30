import { Value } from './value';
import { Chain } from './chain';

export class Link {

	private parent:Chain;

	private level:number;

	private keyMap:object;
	private substitute:object;
	private space:string;

	public previous:Link;
	private next:Link;
	private left:Value;
	private operator:string;

	constructor (parent:Chain, char:string, first:boolean=false) {
		this.parent = parent;

		this.level = 0;// order of operations

		this.keyMap = {
			"0123456789": "addNumber",
			",": "addDecimal",
			"±": "addNegative",
			"+-×÷": "setOperator",
			"←": "backspace"
		};// bof...
		this.substitute = {
			"+": "+",
			"-": "-",
			"×": "*",
			"÷": "/"
		};
		this.space = " ";//"&#8239;";// html thin space

		//=====//
		this.previous;
		this.next;

		this.left = new Value(this);
		this.operator;
		//=====//
		this.addInput(char);
	}
	
	addInput(char:string): void {
		let type = "";
		for(let acceptedValues in this.keyMap) {// check which function corresponds to the input
			if(acceptedValues.includes(char)) {
				type = this.keyMap[acceptedValues];
				break;
			}
		}
		switch(type) {
			case "addNumber":
			case "addDecimal":
			case "addNegative":
				if(this.operator) {// if operator has already been defined
					this.addSibling(char);
				} else {
					this.left[type](char);// call the appropriate function
				}
				break;
			case "setOperator":
				this.left.cleanup();// remove any trailing decimal point
				this[type](char);// call local setOperator
				break;
			case "backspace":
				this.backspace();
				break;
			default:
				throw "InvalidCharacter: " + char;
		}
	}

	removeOperator(): void {
		this.operator = null;
		//this.level = 0;
	}

	backspace(): void {
		if(this.operator) {
			this.removeOperator();
		} else {

			// nb. left.backspace is executed
			if(!this.left.backspace() && this.previous) {
				/*
				this.left renvoie 'false' si il ne lui reste plus rien à supprimer
				if prev == undefined, then this is the first link, nothing to delete
				*/
				
				this.previous.unsetNext();// let's ask our sibling to forget about us
				this.parent.killLink();// let's ask our parent to commit infanticide

				// ready for the garbage collector? This link should now be unreachable through the DOM...
			}
		}
	}

	setOperator(char): void {
		this.operator = char;// temporary? replace with function
		//this.level = Number("×÷".includes(char));// bof... (order of operations) (the last two have precedence) (0 or 1)
	}

	display(clean:boolean = false): string {
		if(clean) {
			this.left.cleanup();// pour l'évaluation finale

			if(!this.next) this.removeOperator();// remove trailing operator

			this.operator = this.substitute[this.operator];// replace user-friendly operators '×' and '÷' with ugly '*' and '/'
		}

		let temp = this.left.display() + (this.operator ? this.wrap(this.operator) : "");// left value ('4.3') + operator ('*')
		if(this.next) temp += this.next.display(clean);// + right value if exists ('3.01') + (etc...)
		return temp;
	}

	addSibling(char): void {
		this.next = this.parent.spawnLink(char);// pass it on to the next link
		this.next.setPrev(this);// necessary?
		/*
		it turned out to be useful... in a useless sort of way
		just to maintain the family ties instead of letting Chain do everything
		*/
	}
	setPrev(prev): void {
		this.previous = prev;
	}
	unsetNext(): void {
		this.next = null;
	}

	wrap(text:string): string {
		return this.space + text + this.space;
	}
}