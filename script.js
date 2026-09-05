/* =========================================
   CONFIGURACIÓN
========================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwgswvs6uCFCvrBLZtFAem67imZtx8ge2KI14PHCQGsva9vw_okJRmOfBIO_Mna45kA/exec";


/* =========================================
   PANTALLA DE BIENVENIDA
========================================= */

const enterButton =
    document.getElementById("enterButton");

const welcomeScreen =
    document.getElementById("welcomeScreen");

const mainContent =
    document.getElementById("mainContent");


enterButton.addEventListener("click", handleEnterParty);


function handleEnterParty() {

    // Evitar que se dispare dos veces (click + touchend)
    if (enterButton.disabled) return;

    enterButton.disabled = true;


    // 1) Disparar confeti y brillos sobre la pantalla de bienvenida
    burstConfetti(entranceEffects, 90);

    burstSparkles(entranceEffects, 24);


    // 2) Después de un instante, revelar la invitación
    setTimeout(() => {

        welcomeScreen.classList.add("hide");

        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 550);


    // 3) Limpiar el efecto de entrada una vez termina
    setTimeout(() => {

        entranceEffects.innerHTML = "";

    }, 2200);

}


const entranceEffects =
    document.getElementById("entranceEffects");


const burstColors = [

    "#ff9fd0",
    "#ff4fb0",
    "#b07bf0",
    "#c9a9f5",
    "#6fc8ff",
    "#ffffff"

];


const sparkleEmojis = [
    "✨", "💖", "⭐", "💎", "🌸"
];


function burstConfetti(container, amount) {

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.classList.add("confetti");


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            120 + Math.random() * 260;

        const burstX =
            Math.cos(angle) * distance;

        const burstY =
            Math.sin(angle) * distance;


        piece.style.setProperty(
            "--burst-x",
            burstX + "px"
        );

        piece.style.setProperty(
            "--burst-y",
            burstY + "px"
        );


        piece.style.backgroundColor =
            burstColors[
                Math.floor(
                    Math.random() * burstColors.length
                )
            ];


        piece.style.width =
            Math.random() * 8 + 6 + "px";

        piece.style.height =
            Math.random() * 8 + 6 + "px";

        piece.style.borderRadius =
            Math.random() > 0.5 ? "50%" : "2px";

        piece.style.animationDelay =
            Math.random() * 0.15 + "s";


        container.appendChild(piece);


        setTimeout(
            () => piece.remove(),
            1800
        );

    }

}


function burstSparkles(container, amount) {

    for (let i = 0; i < amount; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.classList.add("sparkle-burst");

        sparkle.textContent =
            sparkleEmojis[
                Math.floor(
                    Math.random() * sparkleEmojis.length
                )
            ];


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 220;

        const burstX =
            Math.cos(angle) * distance;

        const burstY =
            Math.sin(angle) * distance;


        sparkle.style.setProperty(
            "--burst-x",
            burstX + "px"
        );

        sparkle.style.setProperty(
            "--burst-y",
            burstY + "px"
        );

        sparkle.style.fontSize =
            Math.random() * 14 + 16 + "px";

        sparkle.style.animationDelay =
            Math.random() * 0.2 + "s";


        container.appendChild(sparkle);


        setTimeout(
            () => sparkle.remove(),
            1700
        );

    }

}


/* =========================================
   MÚSICA DE FONDO
========================================= */

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");

let audioUnlocked = false;


/* Desbloquea el audio en móviles (iOS/Safari exige que el
   primer play() ocurra directamente dentro de un gesto táctil) */

function unlockAudio() {

    if (audioUnlocked) return;

    bgMusic.volume = 0.5;

    bgMusic.play()
        .then(() => {

            audioUnlocked = true;

            musicIcon.textContent = "🔊";

            musicButton.classList.add("playing");

        })
        .catch(() => {

            audioUnlocked = false;

        });

}


function playMusic() {

    bgMusic.volume = 0.5;

    bgMusic.play()
        .then(() => {

            audioUnlocked = true;

            musicIcon.textContent = "🔊";

            musicButton.classList.add("playing");

        })
        .catch(() => {

            musicIcon.textContent = "🔇";

        });

}


function toggleMusic() {

    if (bgMusic.paused) {

        playMusic();

    } else {

        bgMusic.pause();

        musicIcon.textContent = "🔇";

        musicButton.classList.remove("playing");

    }

}


musicButton.addEventListener("click", toggleMusic);
musicButton.addEventListener("touchend", toggleMusic);

// Iniciar música al entrar a la fiesta (click y touch, para cubrir todos los navegadores móviles)
enterButton.addEventListener("click", unlockAudio);
enterButton.addEventListener("touchend", unlockAudio);
enterButton.addEventListener("touchend", handleEnterParty);

// Respaldo: si por algún motivo el audio no arrancó, se intenta
// de nuevo con el primer toque en cualquier parte de la página
document.body.addEventListener("touchend", function firstTouch() {

    if (!audioUnlocked) {

        unlockAudio();

    }

    document.body.removeEventListener("touchend", firstTouch);

});


/* =========================================
   MENÚ MÓVIL
========================================= */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.querySelector(".nav-links");


menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


/* =========================================
   CONTADOR
========================================= */

const birthdayDate =
    new Date("October 18, 2026 16:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        birthdayDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "00";

        document.getElementById("hours").textContent = "00";

        document.getElementById("minutes").textContent = "00";

        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   FORMULARIO RSVP
========================================= */

const rsvpForm =
    document.getElementById("rsvpForm");

const confirmationMessage =
    document.getElementById(
        "confirmationMessage"
    );

const confirmationText =
    document.getElementById(
        "confirmationText"
    );

const backForm =
    document.getElementById("backForm");

const submitButton =
    document.getElementById(
        "submitButton"
    );

const formStatus =
    document.getElementById(
        "formStatus"
    );


rsvpForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        /* Evitar doble envío */

        submitButton.disabled = true;

        submitButton.textContent =
            "⏳ ENVIANDO...";


        formStatus.textContent =
            "Guardando tu confirmación...";

        formStatus.className =
            "form-status loading";


        /* Obtener datos */

        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const guests =
            document
                .getElementById("guests")
                .value;


        const attendance =
            document.querySelector(
                'input[name="asistencia"]:checked'
            );


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        /* Validar asistencia */

        if (!attendance) {

            showError(
                "Por favor selecciona si asistirás."
            );

            return;
        }


        /* =====================================
           COMPROBAR URL
        ===================================== */

        if (
            !GOOGLE_SCRIPT_URL ||
            GOOGLE_SCRIPT_URL ===
                "URL_DE_TU_GOOGLE_APPS_SCRIPT"
        ) {

            showError(
                "La página todavía no está conectada a Google Sheets."
            );

            return;
        }


        /* =====================================
           CREAR DATOS
        ===================================== */

        const data = {

            nombre: name,

            personas: guests,

            asistencia: attendance.value,

            mensaje: message,

            fechaConfirmacion:
                new Date().toLocaleString(
                    "es-DO"
                )

        };


        try {

            /* =================================
               ENVIAR A GOOGLE APPS SCRIPT
            ================================= */

            await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(data)
                }
            );


            /* =================================
               MOSTRAR CONFIRMACIÓN
            ================================= */

            if (
                attendance.value === "Sí"
            ) {

                confirmationText.innerHTML =
                    `
                    ¡Nos alegra muchísimo
                    que vengas,
                    <strong>${escapeHTML(name)}</strong>! 💗
                    <br><br>

                    Tu confirmación fue registrada
                    correctamente.
                    <br><br>

                    👥 Personas:
                    <strong>${escapeHTML(guests)}</strong>
                    `;

                createConfetti();

            } else {

                confirmationText.innerHTML =
                    `
                    Gracias por avisarnos,
                    <strong>${escapeHTML(name)}</strong>. 💗
                    <br><br>

                    Tu respuesta fue registrada.
                    `;

            }


            rsvpForm.classList.add("hidden");

            confirmationMessage.classList.remove(
                "hidden"
            );


            formStatus.textContent = "";

            formStatus.className =
                "form-status";


        } catch (error) {

            console.error(error);

            showError(
                "No pudimos enviar la confirmación. Revisa tu conexión e inténtalo nuevamente."
            );

        }

    }
);


/* =========================================
   MOSTRAR ERROR
========================================= */

function showError(message) {

    formStatus.textContent =
        message;

    formStatus.className =
        "form-status error";


    submitButton.disabled = false;

    submitButton.textContent =
        "✨ ENVIAR CONFIRMACIÓN ✨";

}


/* =========================================
   SEGURIDAD
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   VOLVER AL FORMULARIO
========================================= */

backForm.addEventListener(
    "click",
    () => {

        confirmationMessage
            .classList
            .add("hidden");

        rsvpForm
            .classList
            .remove("hidden");

        submitButton.disabled =
            false;

        submitButton.textContent =
            "✨ ENVIAR CONFIRMACIÓN ✨";

    }
);


/* =========================================
   CONFETI
========================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confettiContainer"
        );


    const colors = [

        "#f7a8d0",
        "#ed4fa3",
        "#9b6bd3",
        "#ffffff",
        "#d9d9e2"

    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.classList.add(
            "confetti"
        );


        confetti.style.left =
            Math.random() * 100 +
            "vw";


        confetti.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        confetti.style.animationDelay =
            Math.random() * 1.5 +
            "s";


        confetti.style.width =
            Math.random() * 8 +
            5 +
            "px";


        confetti.style.height =
            Math.random() * 8 +
            5 +
            "px";


        confetti.style.borderRadius =
            Math.random() > 0.5
                ? "50%"
                : "2px";


        container.appendChild(
            confetti
        );


        setTimeout(
            () => confetti.remove(),
            4500
        );

    }

}


/* =========================================
   BOTÓN VOLVER ARRIBA
========================================= */

const topButton =
    document.getElementById(
        "topButton"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            topButton
                .classList
                .add("show");

        } else {

            topButton
                .classList
                .remove("show");

        }

    }
);


topButton.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================
   ANIMACIONES SCROLL
========================================= */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


document
    .querySelectorAll(
        ".detail-card, .gallery-item, .about-text, .dresscode-info"
    )
    .forEach(element => {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(element);

    });


/* =========================================
   EFECTO DEL MOUSE
========================================= */

document.addEventListener(
    "mousemove",
    event => {

        const stars =
            document.querySelectorAll(
                ".floating-star"
            );


        const x =
            event.clientX /
            window.innerWidth -
            0.5;


        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        stars.forEach(
            (star, index) => {

                const speed =
                    (index + 1) * 8;


                star.style.transform =
                    `translate(
                        ${x * speed}px,
                        ${y * speed}px
                    )`;

            }
        );

    }
);
