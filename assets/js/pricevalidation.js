document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("priceForm");

  const pname = document.getElementById("contact_name");
  const premail = document.getElementById("email");
  const prephone = document.getElementById("phone");
  const precompany = document.getElementById("corganization_name");

  const organizationCheckboxes = document.querySelectorAll('input[name="org[]"]');

  const sizeOrg = document.querySelector('input[name="size_org"]');
  const noOrg = document.querySelector('input[name="no_org"]');
  const prod = document.querySelector('input[name="prod"]');
  const comments = document.querySelector('textarea[name="comments"]');

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
      setError(pname, "Please enter your full name.");
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

    setValid(name);
    return true;
  }

  function validatePremail() {
    const value = premail.value.trim();

    const premailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (value === "") {
      setError(premail, "Please enter your premail.");
      return false;
    }

    if (!premailPattern.test(value)) {
      setError(premail, "Please enter a valid premail address.");
      return false;
    }

    setValid(premail);
    return true;
  }

  function validatePrephone() {
    const value = prephone.value.trim();

    if (value === "") {
      setError(prephone, "Please enter your prephone number.");
      return false;
    }

    const prephonePattern = /^\+?[0-9\s\-()]{7,20}$/;

    if (!prephonePattern.test(value)) {
      setError(prephone, "Please enter a valid prephone number.");
      return false;
    }

    const digits = value.replace(/\D/g, "");

    if (digits.length < 7 || digits.length > 15) {
      setError(prephone, "Prephone number must contain 7-15 digits.");
      return false;
    }

    setValid(prephone);
    return true;
  }

  function validatePrecompany() {
    const value = precompany.value.trim();

    if (value === "") {
      setError(precompany, "Please enter your precompany name.");
      return false;
    }

    if (value.length < 2) {
      setError(precompany, "Precompany name must be at least 2 characters.");
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

      feedback.textContent = "Please select at least one organization type.";

      feedback.style.display = "block";

      return false;
    }

    container.classList.remove("is-invalid");

    feedback.style.display = "none";

    return true;
  }

  // ==========================================
  // ORGANIZATION SIZE
  // ==========================================

  function validateSizeOrg() {
    if (!sizeOrg.value) {
      sizeOrg.classList.add("is-invalid");
      sizeOrg.classList.remove("is-valid");
      return false;
    }

    sizeOrg.classList.remove("is-invalid");
    sizeOrg.classList.add("is-valid");

    return true;
  }

  // ==========================================
  // NUMBER OF USERS
  // ==========================================

  function validateNoOrg() {
    if (!noOrg.value) {
      noOrg.classList.add("is-invalid");
      noOrg.classList.remove("is-valid");
      return false;
    }

    noOrg.classList.remove("is-invalid");
    noOrg.classList.add("is-valid");

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
  // COMMENTS
  // ==========================================

  function validateComments() {
    const value = comments.value.trim();

    // Optional field
    if (value === "") {
      comments.classList.remove("is-invalid", "is-valid");
      return true;
    }

    if (value.length > 1000) {
      setError(comments, "Comments cannot exceed 1000 characters.");

      return false;
    }

    setValid(comments);

    return true;
  }

  // ==========================================
  // MAIN VALIDATION
  // ==========================================

  window.validatePriceForm = function () {
    const isNameValid = validateName();
    const isPremailValid = validatePremail();
    const isPrephoneValid = validatePrephone();
    const isPrecompanyValid = validatePrecompany();
    const isOrganizationValid = validateOrganization();
    const isSizeValid = validateSizeOrg();
    const isUsersValid = validateNoOrg();
    const isprodValid = validateprod();
    const areCommentsValid = validateComments();

    const isValid = isNameValid && isPremailValid && isPrephoneValid && isPrecompanyValid && isOrganizationValid && isSizeValid && isUsersValid && isprodValid && areCommentsValid;

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

  sizeOrg.addEventListener("blur", validateSizeOrg);

  noOrg.addEventListener("blur", validateNoOrg);

  prod.addEventListener("blur", validateprod);
  pname.addEventListener("blur", validateName);
  premail.addEventListener("blur", validatePremail);
  prephone.addEventListener("blur", validatePrephone);
  precompany.addEventListener("blur", validatePrecompany);

  comments.addEventListener("blur", validateComments);
});
