export const storageUtils = {
  setItem: (key: string, item: string) => {
    localStorage.setItem(`${key}`, item);
  },

  getItem: (item: string) => {
    return localStorage.getItem(`${item}`);
  },

  removeItem: (item: string) => {
    localStorage.removeItem(`${item}`);
  },
};
