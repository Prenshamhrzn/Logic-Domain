document.getElementById("newsletters").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  // Show loading popup
  Swal.fire({
    title: "Submitting Request...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      htmlContainer: "custom-swal-text",
    },
    didOpen: () => {
      Swal.showLoading();

      const popup = Swal.getPopup();
      const loader = popup.querySelector(".swal2-loader");
      const title = Swal.getTitle();

      popup.insertBefore(loader, title);

      loader.classList.add("custom-swal-loader");
    },
  });

  try {
    const response = await fetch("mail/sendNewsletterMail.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    Swal.close();

    if (result.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        // text: result.message,
        html: result.message,
        confirmButtonText: "OK",
        customClass: {
          htmlContainer: "custom-swal-text",
          confirmButton: "custom-swal-button",
        },
      }).then(() => {
        window.location.reload();
      });

      e.target.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: result.message,
      });
    }
  } catch (error) {
    Swal.close();

    Swal.fire({
      icon: "error",
      title: "Connection Error",
      text: "Unable to submit your request. Please try again later.",
    });

    console.error(error);
  }
});
