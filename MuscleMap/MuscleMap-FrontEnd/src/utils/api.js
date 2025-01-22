const BASE_URL = "http://127.0.0.1:5000/api";

export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to register");
    }

    return await response.json();
};