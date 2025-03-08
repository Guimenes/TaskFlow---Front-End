export const authUtils = {
  // Verifica se a senha e a confirmação são iguais
  isPasswordMatching: (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  },

  // Verifica se o e-mail é válido com um domínio válido
  isValidEmail: (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  },

  // Verifica se a senha tem pelo menos 4 caracteres
  isPasswordStrong: (password: string) => {
    return password.length > 3;
  },

  // Verifica se a senha contém pelo menos uma letra maiúscula, uma minúscula e um número
  isPasswordSecure: (password: string) => {
    const secureRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return secureRegex.test(password);
  },

  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  removeToken: () => {
    localStorage.removeItem("token");
  },
};
