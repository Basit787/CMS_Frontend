const persistRoot = "user";

export default class SessionDetails {
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem(persistRoot))?.state?.loginData;
  }

  static getAccessToken() {
    const token = JSON.parse(localStorage.getItem(persistRoot))?.state
      ?.loginData?.token;
    return token;
  }

  static removedLocalStorageData(data) {
    const removedData = JSON.parse(localStorage.removeItem(data));
    return removedData;
  }

  static clearStoredData() {
    localStorage.clear();
  }
}
