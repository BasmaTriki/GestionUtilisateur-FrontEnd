export class Category {

	constructor() { }

	public _id: string;
	public name: string;
	public description: string;
	public created_date: Date;

	isNameValid() {

		var err: any[] = [];
		var stat = true;

		if (!this.name) {
			err.push("Name is required");
			stat = false;
			return { stat, err };
		}

		if (this.name.length < 4) {
			err.push("Name Length cannot be less than 4 ");
			stat = false;
		}
		if (this.name.length > 300) {
			err.push("Name Length cannot be more than 300");
			stat = false;
		}

		return { stat, err };
	}

	isValid() {
		return this.isNameValid().stat;
	}

}