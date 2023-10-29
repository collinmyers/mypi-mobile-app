// validators.js
export const validateName = (name, setName) => {
    const nameRegex = /^[a-zA-Z]+$/;

    if (!nameRegex.test(name)) {
        setName("");
    }
};

export const validateEmail = (email, setEmail) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(email)) {
        setEmail("");
    }
};

export const validatePassword = (password, confirmPassword, setPassword, setConfirmPassword) => {
    
    if (password.length < 8) {
        setPassword("");
    }
    
    if (password !== confirmPassword) {
        setPassword("");
        setConfirmPassword("");
    }
};
