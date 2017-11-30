export class Quelquechose {
	nom: string;
	prenom: string;
	description: string;
	travail: string;

	constructor(nom, prenom, description = 'ininteressant', travail = 'chômeur') {
		this.nom = nom;
		this.prenom = prenom;
		this.description = description;
		this.travail = travail;
	}
}