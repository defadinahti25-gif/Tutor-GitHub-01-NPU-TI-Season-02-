const container = document.getElementById('ascii-container');

// Memuat teks dari file ascii_art.js
container.textContent = myAsciiArt;

// Setting posisi awal (di tengah layar)
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
container.style.left = currentX + 'px';
container.style.top = currentY + 'px';

// Konfigurasi sensitivitas
const avoidanceRadius = 150; // Seberapa dekat mouse sebelum ASCII kabur
const escapeSpeed = 25;      // Kecepatan loncatan saat menghindar

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Mendapatkan posisi tengah dari elemen ASCII
    const rect = container.getBoundingClientRect();
    const asciiCenterX = rect.left + rect.width / 2;
    const asciiCenterY = rect.top + rect.height / 2;

    // Menghitung jarak antara mouse dan elemen (menggunakan Teorema Pythagoras)
    const dx = asciiCenterX - mouseX;
    const dy = asciiCenterY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Jika mouse masuk ke dalam radius sensitivitas
    if (distance < avoidanceRadius) {
        // Hitung sudut dorongan menjauh dari mouse
        const angle = Math.atan2(dy, dx);
        
        // Pindahkan posisi saat ini ke arah sebaliknya
        currentX += Math.cos(angle) * escapeSpeed;
        currentY += Math.sin(angle) * escapeSpeed;

        // Menjaga agar ASCII tidak terlempar keluar dari layar browser
        currentX = Math.max(0, Math.min(window.innerWidth - rect.width, currentX));
        currentY = Math.max(0, Math.min(window.innerHeight - rect.height, currentY));

        // Terapkan posisi baru ke CSS
        container.style.left = currentX + 'px';
        container.style.top = currentY + 'px';
    }
});