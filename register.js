function toggleOtherHobby() {
    const hobby = document.getElementById("hobby").value;
    const otherDiv = document.getElementById("otherHobbyDiv");

    otherDiv.classList.toggle("d-none", hobby !== "Other");
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;
    const city = document.getElementById("city").value;
    const hobby = document.getElementById("hobby").value;
    const otherHobby = document.getElementById("otherHobby").value.trim();
    const error = document.getElementById("error");

    error.textContent = "";

    // Name
    if (name.length < 3) {
        error.textContent = "Name must be at least 3 characters.";
        return;
    }

    // Phone
    if (!/^[6-9]\d{9}$/.test(phone)) {
        error.textContent = "Enter a valid 10-digit Indian phone number.";
        return;
    }

    // Email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        error.textContent = "Enter a valid email address.";
        return;
    }

    // Date of Birth (18+ check)
    if (dob === "") {
        error.textContent = "Please select your date of birth.";
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 ||(monthDiff === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }

    if (age < 18) {
        error.textContent = "You must be at least 18 years old to register.";
        return;
    }

    // Password
    const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passRegex.test(password)) {
        error.textContent =
            "Password must have 8 characters, 1 uppercase, 1 number, and 1 special character.";
        return;
    }

    // City
    if (city === "") {
        error.textContent = "Please select a city.";
        return;
    }

    // Hobby
    if (hobby === "") {
        error.textContent = "Please select a hobby.";
        return;
    }

    if (hobby === "Other" && otherHobby === "") {
        error.textContent = "Please specify your hobby.";
        return;
    }

    alert("Registration Successful 🎉");
    this.reset();
    document.getElementById("otherHobbyDiv").classList.add("d-none");
});
