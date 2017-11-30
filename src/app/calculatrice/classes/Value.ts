import { Link } from './link';

export class Value {

	private parent:Link;
	private 
	private digits:string;
	private decimals:string;

	private negative:boolean;
	private decimalPoint:boolean;

	constructor(parent:Link) {
		this.parent = parent;

		this.digits = "0";
		this.decimals = "";

		this.negative = false;
		this.decimalPoint = false;
	}

	addNumber(char:string): void {
		if(this.decimalPoint) {
			this.decimals += char;
		} else {
			this.digits = this.numberify(this.digits + char);
		}
	}
	addDecimal(unneeded:string): void {
		this.decimalPoint = true;
	}
	addNegative(unneeded:string): void {
		this.negative = !this.negative;
	}

	backspace(): boolean {
		
		// decimals
		
		if(this.decimals.length > 0) {// remove decimal points
			this.decimals = this.decimals.slice(0, -1);// cut out last character
		} else if(this.decimalPoint) {
			this.decimalPoint = false;
		} else {

		// digits

			if(this.digits.length > 1) {// otherwise remove digits
				this.digits = this.digits.slice(0, -1)
			} else if(this.digits != "0") {
				this.digits = "0";
			} else {
				return false;// nothing to remove! gotta delete the link
			}
		}

		// yup
		return true;// successfully removed one char
	}

	resolve(): number {
		this.cleanup();
		return Number(this.display());
	}
	display(): string {
		return (this.negative ? "-" : "") + this.digits + (this.decimalPoint ? ("." + this.decimals) : "");
	}
	cleanup(): void {
		if(this.decimals) this.decimals = this.cutZero(this.decimals);// remove any trailing zeroes unless string is empty
		this.decimalPoint = Boolean(this.decimals);// empty string evaluates to false, therefore erase decimal point
		
		if(!this.decimalPoint && this.digits == "0") {// negative 0 (-0) is no good
			this.negative = false;
		}
		/*if(this.decimalPoint) {
			this.decimals = String(Number(this.decimals));// nope this would turn 0.001 into 0.1 (Number(001) => 1)
		}*/
	}

	cutZero(string:string): string {
		let i = string.length - 1;
		while(string[i] == "0") {
			//string = string.slice(0, -1);// cut out last character
			i--;
		}
		string = string.slice(0, i+1);// cut everything at once instead of one '0' at a time, probably more efficient (not that it matters)
		return string;
	}
	numberify(string:string): string {
		return String(Number(string));// let's be cheap
	}
}