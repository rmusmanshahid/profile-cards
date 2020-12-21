class Profile {
	constructor(name, profession, imagePath, companyName) {
		this.profileId = Math.random() * 1000 + Math.random() * 1000 - Math.random() * Math.random();
		this.name = name;
		this.profession = profession;
		this.imagePath = imagePath;
		this.companyName = companyName;
	}
}

export default Profile;
