const canvas = document.getElementById('ascii-canvas');

// Konfigurasi
const radius = 50; // Jarak jangkauan mouse untuk menghilangkan teks

// 1. Pecah string mentah menjadi grid <span>
function initAscii() {
    const lines = rawAscii.split('\n');
    canvas.innerHTML = ''; // Bersihkan

    lines.forEach(line => {
        const lineDiv = document.createElement('div');
        // Pecah baris menjadi karakter
        line.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Gunakan spasi khusus HTML
            span.className = 'char';
            lineDiv.appendChild(span);
        });
        canvas.appendChild(lineDiv);
    });
}

// 2. Logika Deteksi Mouse
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const chars = document.querySelectorAll('.char');

    chars.forEach(span => {
        // Mendapatkan posisi koordinat tiap karakter di layar
        const rect = span.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        // Hitung jarak menggunakan Pythagoras
        const dist = Math.sqrt(Math.pow(mouseX - charX, 2) + Math.pow(mouseY - charY, 2));

        if (dist < radius) {
            span.classList.add('hidden');
        } else {
            // Opsional: hapus baris ini jika ingin efek hapus permanen
            span.classList.remove('hidden'); 
        }
    });
});

// Jalankan inisialisasi
initAscii();