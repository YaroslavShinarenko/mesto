export class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._name = profileName;
    this._about = profileAbout;
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent };
  }

  setUserInfo(data) {
    this._name.textContent = data["nameInput"];
    this._about.textContent = data["aboutInput"];
  }
}
