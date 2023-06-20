export const PATH_CONFIGS = {
  // configs
  ADMIN: "https://someUrl.com:3000/api",
  SIGN_IN: "https://someUrl.com:8443/oauth2",
  IMAGE: "https://someUrl.com:3000/api",

  // headers
  CONTENT_TYPE_DEFAULT: "application/json",
  CONTENT_TYPE_IMAGE_URL: "multipart/form-data",
};

export const CONTENT_TYPE_SIGN_IN = {
  Authorization:
    // "Basic d2doamVoZkEzSWFXa2xWZndib0NCendEMjBZYTp2QTl6Q1JOS28xbEVwaHdTd3dhMFl1czZSMkFh",
    "Basic d21kOTdHc21iak9ra2ZLRERLUDBzek5GQWFJYTpoT0dmX0REbl9nWHdidFgwbnRSZ1ZiZ3BSdm9h",
  "Content-Type": "application/x-www-form-urlencoded",
};

//token
export const AuthToken = `Bearer ${localStorage.getItem("token")}`;
