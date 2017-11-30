export class Key {
	
	private value:string = null;

	constructor(num:string) {
		this.value = num;
	}

	get(): string {
		return this.value;
	}
}