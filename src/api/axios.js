import axios from "axios";
import { CONTENT_TYPE_SIGN_IN } from "../Config";

import { PATH_CONFIGS } from "../Config";

// token

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/todos",
});

// Axious Types { POST , PUT , DELETE , GET}

export const get_SignIN = async (url, data) => {
  let config = {
    method: "post",
    url: PATH_CONFIGS.SIGN_IN + url,
    headers: CONTENT_TYPE_SIGN_IN,
    data: data,
  };

  try {
    const { data } = await axios(config);
    if (data) {
      return data;
    }

    throw new Error("Something went wrong please try again");
  } catch (err) {
    // alert("Invalid username or password from API")
    return { success: false, error: err };
  }
};

export const get_api = async (url) => {
  let config = {
    method: "get",
    url: PATH_CONFIGS.ADMIN + url,
    headers: {
      "Content-Type": PATH_CONFIGS.CONTENT_TYPE_DEFAULT,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const { data } = await axios(config);
    if (data) {
      return data;
    }

    throw new Error("Something went wrong please try again");
  } catch (err) {
    // localStorage.setItem("loginError", true)
    // setTimeout(() => {
    //     localStorage.setItem("loginError", false)
    // }, 4000)
    // alert("Invalid username or password from API")
    return { success: false, error: err };
  }
};

export const post_api = async (url, data) => {
  let hearder1 = "";
  let endpoint1 = "";
  if (url === "/upload-image") {
    endpoint1 = PATH_CONFIGS.IMAGE;
    hearder1 = PATH_CONFIGS.CONTENT_TYPE_IMAGE_URL;
  } else {
    endpoint1 = PATH_CONFIGS.ADMIN;
    hearder1 = PATH_CONFIGS.CONTENT_TYPE_DEFAULT;
  }

  var config = {
    method: "post",
    url: endpoint1 + url,
    headers: {
      "Content-Type": hearder1,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  };

  try {
    const { data } = await axios(config);
    if (data) {
      return data;
    }

    throw new Error("Something went wrong please try again");
  } catch (err) {
    return { success: false, error: err };
  }
};

export const put_api = async (url, data) => {
  var config = {
    method: "put",
    url: PATH_CONFIGS.ADMIN + url,
    headers: {
      "Content-Type": PATH_CONFIGS.CONTENT_TYPE_DEFAULT,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  };

  try {
    const { data } = await axios(config);
    if (data) {
      return data;
    }

    throw new Error("Something went wrong please try again");
  } catch (err) {
    return { success: false, error: err };
  }
};
