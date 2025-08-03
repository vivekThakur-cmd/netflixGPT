export function validateCredentials(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(email)) {
        return "Invalid email format.";
    }

    if (!passwordRegex.test(password)) {
        return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    }

    return null; // All good
}