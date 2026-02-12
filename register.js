// Password toggle
document.getElementById("showPassword").addEventListener("change", function () {
    const pass = document.getElementById("password");
    pass.type = this.checked ? "text" : "password";
});

// Live validation
document.getElementById("name").addEventListener("input", function () {
    this.classList.toggle("is-invalid", this.value.trim().length < 3);
});

document.getElementById("phone").addEventListener("input", function () {
    this.classList.toggle("is-invalid", !/^[6-9]\d{9}$/.test(this.value));
});

document.getElementById("email").addEventListener("input", function () {
    this.classList.toggle("is-invalid", !/^\S+@\S+\.\S+$/.test(this.value));
});

document.getElementById("password").addEventListener("input", function () {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    this.classList.toggle("is-invalid", !regex.test(this.value));
});

document.getElementById("dob").addEventListener("change", function () {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }

    this.classList.toggle("is-invalid", age < 18);
});

// Add custom hobby
document.getElementById("addHobbyBtn").addEventListener("click", function () {
    const input = document.getElementById("customHobbyInput");
    const value = input.value.trim();
    if (value === "") return;

    const container = document.getElementById("hobbyContainer");

    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
        <input class="form-check-input hobby-checkbox" type="checkbox" value="${value}" checked>
        <label class="form-check-label">${value}</label>
    `;

    container.appendChild(div);
    input.value = "";
});

// Submit + Store in sessionStorage
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value;

    const hobbies = Array.from(
        document.querySelectorAll(".hobby-checkbox:checked")
    ).map(cb => cb.value);

    if (hobbies.length === 0) {
        document.getElementById("hobbyError").classList.remove("d-none");
        return;
    }

    document.getElementById("hobbyError").classList.add("d-none");

    const userData = {
        name,
        phone,
        email,
        dob,
        password,
        address,
        city,
        hobbies
    };

    // Store as string
    sessionStorage.setItem("userData", JSON.stringify(userData));

    alert("Registration Successful & Data Stored in Session");

    this.reset();
});
