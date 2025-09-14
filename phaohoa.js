function startFireworks(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Không thể lấy context của canvas!");
        return;
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = (Math.random() * canvas.height) / 2;
        const colors = ["#ff0", "#f0f", "#0ff", "#f00", "#0f0"];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                alpha: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.01;
            if (p.alpha <= 0) particles.splice(i, 1);
            else {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        if (Math.random() < 0.05) createFirework();
        requestAnimationFrame(update);
    }

    update();
}

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const hbdText = document.getElementById("hbdText");
    const cake = document.querySelector(".cake");
    const audio = document.getElementById("custom-audio"); // audio music.mp3
    const canvas = document.getElementById("fireworks");

    try {
        // Hiển thị chữ chúc mừng
        setTimeout(() => {
            hbdText.classList.remove("hidden");
            console.log("Hiển thị chữ chúc mừng");
        }, 0);

        // Hiển thị slider
        setTimeout(() => {
            slider.classList.remove("hidden");
            console.log("Hiển thị slider");
        }, 200);

        // Hiển thị bánh
        setTimeout(() => {
            cake.classList.remove("hidden");
            console.log("Hiển thị bánh");
        }, 400);

        // 🎵 Chờ người dùng chạm màn hình mới phát nhạc
        if (audio) {
            const playMusic = () => {
                audio.play().catch(err => {
                    console.error("Không phát được music.mp3:", err);
                });
                // bỏ listener sau khi phát 1 lần
                document.removeEventListener("click", playMusic);
                document.removeEventListener("touchstart", playMusic);
            };
            document.addEventListener("click", playMusic);
            document.addEventListener("touchstart", playMusic);
        }

        // Bắt đầu pháo hoa
        if (typeof startFireworks === "function") {
            startFireworks(canvas);
            console.log("Bắt đầu pháo hoa");
        } else {
            console.error("Hàm startFireworks không tồn tại.");
        }
    } catch (error) {
        console.error("Lỗi khi chạy hiệu ứng:", error);
    }
});
