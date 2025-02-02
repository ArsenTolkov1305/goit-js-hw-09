const form = document.querySelector(".feedback-form");
const textarea = form.querySelector("textarea");
const feedbackInput = document.querySelector('input[name="email"]');
const STORAGE_KEY = "feedback-form-state";

let formData = { email: "", message: "" };

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
};

form.addEventListener("input", (event) => {
  formData[event.target.name] = event.target.value.trim();
  saveToLocalStorage();
});

textarea.addEventListener("focus", () => {
  textarea.placeholder = "Type area";
});

textarea.addEventListener("blur", () => {
  textarea.placeholder = "";
});

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

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});

loadFromLocalStorage();
