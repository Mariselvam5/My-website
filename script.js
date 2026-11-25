function showMessage() {
    alert("Welcome to KINGDOME ACADEMY!");
}
function submitForm(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill all the fields.");
        return;
    }

    alert("Thank you " + name + "! Your message has been submitted.");

}
async function enrollStudent(event) {

    event.preventDefault();

    let name = document.getElementById("studentName").value;
    let email = document.getElementById("studentEmail").value;
    let phone = document.getElementById("studentPhone").value;
    let course = document.getElementById("course").value;

    if (!name || !email || !phone || !course) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/enroll", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                course: course
            })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
        } else {
            alert("Something went wrong");
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}