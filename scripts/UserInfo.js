export class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._name = profileName;
    this._about = profileAbout;
  }

  getUserInfo() {
    this.userData = {};
    this.userData["nameInput"] = this._name.textContent;
    this.userData["aboutInput"] = this._about.textContent;

    return this.userData;
  }

  setUserInfo(data) {
    this._name.textContent = data["nameInput"];
    this._about.textContent = data["aboutInput"];
  }
}
