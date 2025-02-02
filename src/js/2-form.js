const form = document.querySelector(".feedback-form");
const textarea = form.querySelector("textarea");
const feedbackInput = document.querySelector('input[name="email"]');
const STORAGE_KEY = "feedback-form-state";

// Початковий об'єкт formData
let formData = { email: "", message: "" };

// Функція для збереження даних у локальне сховище
const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Завантаження даних з локального сховища
const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
};

// Збереження змін у локальне сховище
form.addEventListener("input", (event) => {
  formData[event.target.name] = event.target.value.trim();
  saveToLocalStorage();
});

// Події focus та blur для textarea
textarea.addEventListener("focus", () => {
  textarea.placeholder = "Type area";
});

textarea.addEventListener("blur", () => {
  textarea.placeholder = "";
});

// Події focus та blur для email input
feedbackInput.addEventListener("focus", () => {
  feedbackInput.placeholder = "Type area";
});

feedbackInput.addEventListener("blur", () => {
  feedbackInput.placeholder = "";
});

// Обробник події submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log("Form Data Submitted:", formData);

  // Очищення локального сховища, об'єкта formData і форми
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});

// Завантаження даних при старті
loadFromLocalStorage();
