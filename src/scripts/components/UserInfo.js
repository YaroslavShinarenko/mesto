export class UserInfo {
  constructor(data) {
    this._name = data.profileName;
    this._about = data.profileAbout;
    this._avatar = data.profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getUserData(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data["name-input"];
    this._about.textContent = data["about-input"];
  }

  setUserAvatar(data) {
    this._avatar.src = data["new-avatar-link-input"];
  }
}
