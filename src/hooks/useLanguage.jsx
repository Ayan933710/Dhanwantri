import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'dairyguard-language';

export const LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी',
  kn: 'ಕನ್ನಡ',
};

const TRANSLATIONS = {
  en: {
    language: 'Language',
    dark: 'Dark',
    light: 'Light',
    addAnimal: 'Add animal',
    newHerdRecord: 'New herd record',
    animalType: 'Animal type',
    name: 'Name',
    animalId: 'Animal ID',
    breed: 'Breed',
    age: 'Age (years)',
    ownerId: 'Owner ID',
    cancel: 'Cancel',
    addToHerd: 'Add to herd',
    duplicateId: 'That animal ID is already in use. Choose another one.',
    highRiskBoard: 'High Risk Board',
    animalsFlagged: 'animals flagged',
    animal: 'Animal',
    species: 'Species',
    risk: 'Risk',
    score: 'Score',
    rumination: 'Rumination Δ',
    view: 'View',
    login: 'Log in',
    signup: 'Sign up',
    phone: 'Phone number',
    uniqueId: 'Unique ID',
    identifier: 'Sign in with',
    identifierPlaceholder: 'Enter your phone number',
    uniqueIdPlaceholder: 'Enter your unique ID',
    password: 'Password',
    fullName: 'Full name',
    signIn: 'Sign in to DairyGuard',
    createAccount: 'Create DairyGuard account',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    logIn: 'Log in',
    signUp: 'Sign up',
    enterPlatform: 'Enter Platform',
    mainPage: 'Main Page',
    herdOverview: 'Herd Overview',
    analytics: 'Analytics',
    predictions: 'Predictions',
    history: 'History',
    animals: 'Animals',
  },
  hi: {
    language: 'भाषा',
    dark: 'डार्क',
    light: 'लाइट',
    addAnimal: 'पशु जोड़ें',
    newHerdRecord: 'नया झुंड रिकॉर्ड',
    animalType: 'पशु का प्रकार',
    name: 'नाम',
    animalId: 'पशु आईडी',
    breed: 'नस्ल',
    age: 'आयु (वर्ष)',
    ownerId: 'मालिक आईडी',
    cancel: 'रद्द करें',
    addToHerd: 'झुंड में जोड़ें',
    duplicateId: 'यह पशु आईडी पहले से उपयोग में है। दूसरी आईडी चुनें।',
    highRiskBoard: 'उच्च जोखिम बोर्ड',
    animalsFlagged: 'पशु चिह्नित',
    animal: 'पशु',
    species: 'प्रजाति',
    risk: 'जोखिम',
    score: 'स्कोर',
    rumination: 'जुगाली Δ',
    view: 'देखें',
    login: 'लॉग इन',
    signup: 'साइन अप',
    phone: 'फ़ोन नंबर',
    uniqueId: 'यूनिक आईडी',
    identifier: 'इसके साथ साइन इन करें',
    identifierPlaceholder: 'अपना फ़ोन नंबर दर्ज करें',
    uniqueIdPlaceholder: 'अपनी यूनिक आईडी दर्ज करें',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    signIn: 'DairyGuard में साइन इन करें',
    createAccount: 'DairyGuard अकाउंट बनाएं',
    switchToLight: 'लाइट मोड पर जाएं',
    switchToDark: 'डार्क मोड पर जाएं',
    logIn: 'लॉग इन',
    signUp: 'साइन अप',
    enterPlatform: 'प्लेटफ़ॉर्म खोलें',
    mainPage: 'मुख्य पृष्ठ',
    herdOverview: 'झुंड का अवलोकन',
    analytics: 'विश्लेषण',
    predictions: 'पूर्वानुमान',
    history: 'इतिहास',
    animals: 'पशु',
  },
  kn: {
    language: 'ಭಾಷೆ',
    dark: 'ಡಾರ್ಕ್',
    light: 'ಲೈಟ್',
    addAnimal: 'ಪ್ರಾಣಿಯನ್ನು ಸೇರಿಸಿ',
    newHerdRecord: 'ಹೊಸ ಹಿಂಡು ದಾಖಲೆ',
    animalType: 'ಪ್ರಾಣಿಯ ಪ್ರಕಾರ',
    name: 'ಹೆಸರು',
    animalId: 'ಪ್ರಾಣಿ ಐಡಿ',
    breed: 'ತಳಿ',
    age: 'ವಯಸ್ಸು (ವರ್ಷಗಳು)',
    ownerId: 'ಮಾಲೀಕರ ಐಡಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    addToHerd: 'ಹಿಂಡಿಗೆ ಸೇರಿಸಿ',
    duplicateId: 'ಈ ಪ್ರಾಣಿ ಐಡಿ ಈಗಾಗಲೇ ಬಳಕೆಯಲ್ಲಿದೆ. ಬೇರೆ ಐಡಿ ಆಯ್ಕೆಮಾಡಿ.',
    highRiskBoard: 'ಹೆಚ್ಚಿನ ಅಪಾಯ ಫಲಕ',
    animalsFlagged: 'ಪ್ರಾಣಿಗಳಿಗೆ ಗುರುತು',
    animal: 'ಪ್ರಾಣಿ',
    species: 'ಪ್ರಭೇದ',
    risk: 'ಅಪಾಯ',
    score: 'ಸ್ಕೋರ್',
    rumination: 'ಮೆಲುಕು Δ',
    view: 'ವೀಕ್ಷಿಸಿ',
    login: 'ಲಾಗ್ ಇನ್',
    signup: 'ಸೈನ್ ಅಪ್',
    phone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    uniqueId: 'ಯೂನಿಕ್ ಐಡಿ',
    identifier: 'ಇದರೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    identifierPlaceholder: 'ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    uniqueIdPlaceholder: 'ನಿಮ್ಮ ಯೂನಿಕ್ ಐಡಿ ನಮೂದಿಸಿ',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    fullName: 'ಪೂರ್ಣ ಹೆಸರು',
    signIn: 'DairyGuard ಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    createAccount: 'DairyGuard ಖಾತೆ ರಚಿಸಿ',
    switchToLight: 'ಲೈಟ್ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ',
    switchToDark: 'ಡಾರ್ಕ್ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ',
    logIn: 'ಲಾಗ್ ಇನ್',
    signUp: 'ಸೈನ್ ಅಪ್',
    enterPlatform: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ತೆರೆಯಿರಿ',
    mainPage: 'ಮುಖ್ಯ ಪುಟ',
    herdOverview: 'ಹಿಂಡು ಅವಲೋಕನ',
    analytics: 'ವಿಶ್ಲೇಷಣೆ',
    predictions: 'ಮುನ್ಸೂಚನೆಗಳು',
    history: 'ಇತಿಹಾಸ',
    animals: 'ಪ್ರಾಣಿಗಳು',
  },
};

function getInitialLanguage() {
  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return savedLanguage && LANGUAGES[savedLanguage] ? savedLanguage : 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  function t(key) {
    return TRANSLATIONS[language][key] ?? TRANSLATIONS.en[key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
