// validators.jsx
export const validateName = (name) => {
    return name.length > 0;  // True if name has at least one character
};

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
};

export const validatePassword = (password, confirmPassword) => {

    if (password.length < 8) {
        return "Password must be at least 8 characters.";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }

    return ""; // Return an empty string if validation passes
};

