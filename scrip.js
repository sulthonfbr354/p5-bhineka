document.addEventListener("DOMContentLoaded", function () {
    const overlays = document.querySelectorAll(".overlay");
    const galleryItems = document.querySelectorAll(".gallery li a");

    /* === 1. Efek Hover Zoom di Galeri === */
    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            this.querySelector("img").style.transform = "scale(1.1)";
            this.style.transition = "transform 0.3s ease-in-out";
        });

        item.addEventListener("mouseleave", function () {
            this.querySelector("img").style.transform = "scale(1)";
        });
    });

    /* === 2. Efek Hover Zoom di Overlay Gambar === */
    overlays.forEach(overlay => {
        const img = overlay.querySelector("img");

        img.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05)";
            this.style.transition = "transform 0.3s ease-in-out";
        });

        img.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });

        const nextBtn = overlay.querySelector(".next");
        const prevBtn = overlay.querySelector(".prev");
        const closeBtn = overlay.querySelector(".close");

        /* === 3. Fungsi Menampilkan Overlay === */
        function showOverlay(overlay) {
            overlay.style.opacity = "1";
            overlay.style.visibility = "visible";
            document.body.style.overflow = "hidden";
        }

        /* === 4. Fungsi Menutup Overlay === */
        function hideOverlay(overlay) {
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.style.visibility = "hidden";
                document.body.style.overflow = "auto";
            }, 500);
        }

        /* === 5. Efek Slide Kartu Saat Klik Next/Prev === */
        function changeImage(direction) {
            const currentId = overlay.id;
            let newId = direction === "next"
                ? nextBtn.getAttribute("href").substring(1)
                : prevBtn.getAttribute("href").substring(1);

            const newOverlay = document.getElementById(newId);
            if (newOverlay) {
                const newImg = newOverlay.querySelector("img");

                // Tambahkan efek geser kartu
                img.classList.add(direction === "next" ? "slide-left" : "slide-right");
                newImg.classList.add(direction === "next" ? "new-slide-left" : "new-slide-right");

                setTimeout(() => {
                    hideOverlay(overlay);

                    setTimeout(() => {
                        window.location.hash = `#${newId}`;
                        setTimeout(() => {
                            newImg.classList.remove("new-slide-left", "new-slide-right");
                            img.classList.remove("slide-left", "slide-right");
                        }, 600);
                    }, 300);
                }, 300);
            }
        }

        /* === 6. Event Klik Tombol Next & Prev === */
        if (nextBtn) {
            nextBtn.addEventListener("click", function (event) {
                event.preventDefault();
                changeImage("next");
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function (event) {
                event.preventDefault();
                changeImage("prev");
            });
        }

        /* === 7. Event Klik Tombol Close === */
        if (closeBtn) {
            closeBtn.addEventListener("click", function (event) {
                event.preventDefault();
                hideOverlay(overlay);
                history.pushState("", document.title, window.location.pathname);
            });
        }

        /* === 8. Tampilkan Overlay Jika URL Berubah === */
        window.addEventListener("hashchange", function () {
            const hash = window.location.hash.substring(1);
            const targetOverlay = document.getElementById(hash);

            if (targetOverlay) {
                showOverlay(targetOverlay);
            } else {
                overlays.forEach(hideOverlay);
            }
        });
    });

    console.log("All Effects Restored Successfully!");
});
  