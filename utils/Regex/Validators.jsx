// validators.jsx
export const validateName = (name) => {
    return name.length > 0;  // True if name has at least one character
};

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
};

export const validatePassword = (password, confirmPassword) => {

    let passwordErrors = [];

    if (password.length < 8) {
        passwordErrors.push("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
        passwordErrors.push("Passwords do not match");
    }

    if (passwordErrors.length > 0) return passwordErrors;

    return ""; // Return an empty string if validation passes
};

