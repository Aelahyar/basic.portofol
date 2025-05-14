let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*="' + id + '"]').classList.add('active')
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Contact
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // stop default form submission

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("https://formspree.io/f/xanoaydo", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for contacting me.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
            form.reset();
        } else {
            const data = await response.json();
            throw new Error(data.error || "Something went wrong.");
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message || 'Message failed to send.',
            confirmButtonColor: '#d33'
        });
    }
});