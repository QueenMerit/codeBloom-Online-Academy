const form = document.getElementById("verifyForm");
    const resultBox = document.getElementById("result");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const certId = document.getElementById("certificateId").value.trim();

      if (!certId) return;

      resultBox.classList.remove("hidden");
      resultBox.innerHTML = "⏳ Verifying...";

      // Functional Google Apps Script URL
      const url = `https://script.google.com/macros/s/AKfycbyG1AutOpHTgVEqSjeaCLg9CB7vJ5N1j8TP8y5DsEC3G13ym0VCEXOKZ_Zqy09oSGTN/exec?certId=${certId}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === "success") {
          resultBox.innerHTML = `
            ✅ <strong>Certificate Verified!</strong><br><br>
            <strong>Name:</strong> ${data.name}<br>
            <strong>Certificate ID:</strong> ${data.certId}<br>
            <strong>Class:</strong> ${data.class}<br>
            <strong>Year:</strong> ${data.year}
          `;
        } else {
          resultBox.innerHTML = "❌ Certificate not found. Please check your ID and try again.";
        }

      } catch (error) {
        resultBox.innerHTML = "⚠ An error occurred while verifying. Please try again later.";
        console.error(error);
      }
    });