import apiPublic from "./apiPublic.js";
import { setAccessToken, clearAccessToken } from "./authService.js";

export const registerUser = async (userData) => {
    const response = await apiPublic.post("/user", userData);
    return response.data;
};

export const authPassword = async (authData) => {
    const response = await apiPublic.post("/auth_password", authData)
    setAccessToken(response.data.accessToken);
    return response.data
}

export const logout = async () => {
    try {
        clearAccessToken()
        await apiPublic.post("/logout")
    } catch (error) {
        console.error("Error cerrando sesión:", error);
    }
};