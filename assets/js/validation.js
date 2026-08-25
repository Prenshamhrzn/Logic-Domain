document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  const name = document.getElementById("contactName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const company = document.getElementById("company");
  const department = document.getElementById("stateDepartment");
  const bestContactTime = document.getElementById("bestReachTime");
  const demoTime = document.getElementById("bestCallTime");
  const comments = document.getElementById("comments");

  const productCheckboxes = document.querySelectorAll('input[name="products[]"]');

  function setError(input, message) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    let feedback = input.closest(".input-group, .col-md-6, .col-12")?.querySelector(".invalid-feedback");

    if (feedback) {
      feedback.textContent = message;
    }
  }

  function setValid(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

  function validateName() {
    const value = name.value.trim();

    if (value === "") {
      setError(name, "Please enter your name.");
      return false;
    }

    if (value.length < 2) {
      setError(name, "Name must be at least 2 characters.");
      return false;
    }

    if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
      setError(name, "Please enter a valid name.");
      return false;
    }

    setValid(name);
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (value === "") {
      setError(email, "Please enter your email.");
      return false;
    }

    if (!emailPattern.test(value)) {
      setError(email, "Please enter a valid email address.");
      return false;
    }

    setValid(email);
    return true;
  }

  function validatePhone() {
    const value = phone.value.trim();

    if (value === "") {
      setError(phone, "Please enter your phone number.");
      return false;
    }

    const phonePattern = /^\+?[0-9\s\-()]{7,20}$/;

    if (!phonePattern.test(value)) {
      setError(phone, "Please enter a valid phone number.");
      return false;
    }

    const digits = value.replace(/\D/g, "");

    if (digits.length < 7 || digits.length > 15) {
      setError(phone, "Phone number must contain 7-15 digits.");
      return false;
    }

    setValid(phone);
    return true;
  }

  function validateCompany() {
    const value = company.value.trim();

    if (value === "") {
      setError(company, "Please enter your company name.");
      return false;
    }

    if (value.length < 2) {
      setError(company, "Company name must be at least 2 characters.");
      return false;
    }

    setValid(company);
    return true;
  }

  function validateDepartment() {
    if (!department.value) {
      department.classList.add("is-invalid");
      department.classList.remove("is-valid");
      return false;
    }

    department.classList.remove("is-invalid");
    department.classList.add("is-valid");

    return true;
  }

  function validateProducts() {
    const checkedProducts = document.querySelectorAll('input[name="products[]"]:checked');

    const productContainer = document.querySelector(".product-options");

    // Find or create validation message
    let feedback = productContainer.parentElement.querySelector(".product-invalid-feedback");

    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback product-invalid-feedback";
      productContainer.parentElement.appendChild(feedback);
    }

    if (checkedProducts.length === 0) {
      productContainer.classList.add("is-invalid");

      feedback.textContent = "Please select an option.";
      feedback.style.display = "block";

      return false;
    }

    productContainer.classList.remove("is-invalid");

    feedback.style.display = "none";

    return true;
  }

  function validateDateTime(input) {
    // Optional field
    if (!input.value.trim()) {
      input.classList.remove("is-invalid", "is-valid");
      return true;
    }

    // Flatpickr format:
    // m/d/Y h:i K
    const selectedDate = flatpickr.parseDate(input.value, "m/d/Y h:i K");

    if (!selectedDate || isNaN(selectedDate.getTime())) {
      setError(input, "Please select a valid date and time.");
      return false;
    }

    if (selectedDate < new Date()) {
      setError(input, "Please select a future date and time.");
      return false;
    }

    setValid(input);
    return true;
  }

  function validateComments() {
    const value = comments.value.trim();

    if (value.length > 1000) {
      setError(comments, "Comments cannot exceed 1000 characters.");

      return false;
    }

    comments.classList.remove("is-invalid");

    return true;
  }

  // ==========================================
  // MAIN VALIDATION FUNCTION
  // ==========================================

  window.validateContactForm = function () {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isCompanyValid = validateCompany();
    const isDepartmentValid = validateDepartment();
    const areProductsValid = validateProducts();
    const isContactTimeValid = validateDateTime(bestContactTime);
    const isDemoTimeValid = validateDateTime(demoTime);
    const areCommentsValid = validateComments();

    const isValid = isNameValid && isEmailValid && isPhoneValid && isCompanyValid && isDepartmentValid && areProductsValid && isContactTimeValid && isDemoTimeValid && areCommentsValid;

    if (!isValid) {
      const firstInvalid = form.querySelector(".is-invalid");

      if (firstInvalid) {
        firstInvalid.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        firstInvalid.focus();
      }

      return false;
    }

    return true;
  };

  // ==========================================
  // LIVE VALIDATION
  // ==========================================

  name.addEventListener("blur", validateName);
  email.addEventListener("blur", validateEmail);
  phone.addEventListener("blur", validatePhone);
  company.addEventListener("blur", validateCompany);

  department.addEventListener("change", validateDepartment);

  productCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", validateProducts);
  });

  bestContactTime.addEventListener("change", function () {
    validateDateTime(bestContactTime);
  });

  demoTime.addEventListener("change", function () {
    validateDateTime(demoTime);
  });

  comments.addEventListener("blur", validateComments);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("priceForm");
  const pname = document.querySelector('input[name="contact_name"]');
  const premail = document.querySelector('input[name="email"]');
  const precompany = document.querySelector('input[name="corganization_name"]');
  const organizationCheckboxes = document.querySelectorAll('input[name="org[]"]');
  const prod = document.querySelector('select[name="prod"]');

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  function setError(input, message) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    let feedback = input.parentElement.querySelector(".invalid-feedback");

    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      input.parentElement.appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.style.display = "block";
  }

  function setValid(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    const feedback = input.parentElement.querySelector(".invalid-feedback");

    if (feedback) {
      feedback.style.display = "none";
    }
  }

  function validateName() {
    const value = pname.value.trim();

    if (value === "") {
      setError(pname, "Please enter your name.");
      return false;
    }

    if (value.length < 2) {
      setError(pname, "Name must be at least 2 characters.");
      return false;
    }

    if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
      setError(pname, "Please enter a valid name.");
      return false;
    }

    setValid(pname);
    return true;
  }

  function validatePremail() {
    const value = premail.value.trim();

    const premailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (value === "") {
      setError(premail, "Please enter your email.");
      return false;
    }

    if (!premailPattern.test(value)) {
      setError(premail, "Please enter a valid email address.");
      return false;
    }

    setValid(premail);
    return true;
  }

  function validatePrecompany() {
    const value = precompany.value.trim();

    if (value === "") {
      setError(precompany, "Please enter your organization name.");
      return false;
    }

    if (value.length < 2) {
      setError(precompany, "Organization name must be at least 2 characters.");
      return false;
    }

    setValid(precompany);
    return true;
  }

  // ==========================================
  // ORGANIZATION VALIDATION
  // ==========================================

  function validateOrganization() {
    const checked = document.querySelectorAll('input[name="org[]"]:checked');

    const container = document.querySelector(".checkbox-row");

    let feedback = container.parentElement.querySelector(".organization-invalid-feedback");

    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback organization-invalid-feedback";

      container.parentElement.appendChild(feedback);
    }

    if (checked.length === 0) {
      container.classList.add("is-invalid");

      feedback.textContent = "Please select the organization type.";

      feedback.style.display = "block";

      return false;
    }

    container.classList.remove("is-invalid");

    feedback.style.display = "none";

    return true;
  }

  // ==========================================
  // AVERAGE CAPITAL PROJECTS
  // ==========================================

  function validateprod() {
    if (!prod.value) {
      prod.classList.add("is-invalid");
      prod.classList.remove("is-valid");
      return false;
    }

    prod.classList.remove("is-invalid");
    prod.classList.add("is-valid");

    return true;
  }

  // ==========================================
  // MAIN VALIDATION
  // ==========================================

  window.validatePriceForm = function () {
    const isNameValid = validateName();
    const isPremailValid = validatePremail();
    const isPrecompanyValid = validatePrecompany();
    const isOrganizationValid = validateOrganization();
    const isprodValid = validateprod();

    const isValid = isNameValid && isPremailValid && isPrephoneValid && isPrecompanyValid && isOrganizationValid && isprodValid;

    if (!isValid) {
      const firstInvalid = form.querySelector(".is-invalid");

      if (firstInvalid) {
        firstInvalid.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        firstInvalid.focus();
      }

      return false;
    }

    return true;
  };

  // ==========================================
  // LIVE VALIDATION
  // ==========================================

  organizationCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", validateOrganization);
  });

  prod.addEventListener("change", validateprod);
  pname.addEventListener("blur", validateName);
  premail.addEventListener("blur", validatePremail);
  precompany.addEventListener("blur", validatePrecompany);
});
