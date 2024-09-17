import { URL_BASE } from "../config/URLs";

export const login = async (data) => {
  const { user, password } = data;

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user,
      password
    })
  };

  try {
    const response = await fetch(`${URL_BASE}/login`, config);
    const result = await response.json();
    return result
  } catch (error) {
    return error;
  }
}
