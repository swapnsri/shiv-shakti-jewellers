import CryptoJS from "crypto-js";

export const saveState = (key: string, value: any) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

/**
 * Saves an item to sessionStorage
 * @param {string} key - The key under which the state will be saved
 * @param {any} value - The value to be saved (will be stringified)
 */
export const saveStateSession = (key: string, value: any) => {
  try {
    const serializedState = JSON.stringify(value);
    sessionStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Error saving to sessionStorage", error);
  }
};

/**
 * Loads an item from localStorage
 * @param {string} key - The key of the state to retrieve
 * @returns {any} - The parsed state from localStorage or undefined if not found
 */
export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading from localStorage", error);
    return undefined;
  }
};

/**
 * Loads an item from sessionStorage
 * @param {string} key - The key of the state to retrieve
 * @returns {any} - The parsed state from sessionStorage or undefined if not found
 */
export const loadStateSession = (key: string) => {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading from sessionStorage", error);
    return undefined;
  }
};

/**
 * Removes all states from both localStorage and sessionStorage
 */
export const removeAllState = () => {
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch (error) {
    console.error("Error clearing all storage", error);
  }
};

const secretKey = CryptoJS.lib.WordArray.random(32);
export const encryptPassword = (password: string) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};

export const decryptPassword = (encryptedPassword: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const Spinner = () => {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const data = [
  {
    channel: "WhatsApp",
    connect: "9839204135",
    url: "https://wa.me/9335057978",
    iconClass: "fab fa-whatsapp",
    text: "Connect On",
  },
  {
    channel: "Facebook",
    connect: "Shiv Shakti Jewellers",
    url: "https://www.facebook.com/Ssjsln",
    iconClass: "fab fa-facebook",
    text: "Connect On",
  },
  {
    channel: "Email",
    connect: "shivshakti227795@gmail.com",
    url: "",
    iconClass: "far fa-envelope",
    text: "Email Us",
  },
  {
    channel: "Instagram",
    connect: "@ShivShakti",
    url: "",
    iconClass: "fab fa-instagram",
    text: "Connect On",
  },
  {
    channel: "Telephone",
    connect: "+919839204135",
    url: "tel:+919839204135",
    iconClass: "fas fa-phone",
    text: "Call Us",
  },
  {
    channel: "In-person",
    connect: "Visit us",
    url: "https://maps.app.goo.gl/XJCsJmogsB4CxE2JA",
    iconClass: "fa fa-map-marker-alt",
    text: "Visit Us",
  },
];
