const DEFAULT_PRODUCTS = [
  { id: 1, name: "Seragam Putih Merah (Setelan SD/MI)", category: "seragam", price: 95000, stock: "Tersedia", icon: "👕" },
  { id: 2, name: "Buku LKS Tema Kelas 1 Semester 1", category: "buku", price: 22000, stock: "Tersedia", icon: "📚" },
  { id: 3, name: "Buku LKS Tema Kelas 4 Semester 1", category: "buku", price: 22000, stock: "Tersedia", icon: "📚" },
  { id: 4, name: "Atribut Pramuka Lengkap", category: "seragam", price: 35000, stock: "Tersedia", icon: "🏕️" },
  { id: 5, name: "Buku Tulis Garis 38 Lembar (Pack)", category: "atk", price: 28000, stock: "Tersedia", icon: "📓" },
  { id: 6, name: "Dasi & Topi Logo Madrasah", category: "seragam", price: 15000, stock: "Tersedia", icon: "🎓" },
  { id: 7, name: "Kotak Pensil Karakter", category: "atk", price: 12000, stock: "Habis", icon: "✏️" },
  { id: 8, name: "Jilbab Seragam Putih Sekolah", category: "seragam", price: 30000, stock: "Tersedia", icon: "🧕" }
];

const DEFAULT_SAVINGS = [
  { nis: "1001", name: "Ahmad Zaki", class: "Kelas 1", balance: 145000, lastUpdate: "14 Okt 2026" },
  { nis: "1002", name: "Siti Nurhaliza", class: "Kelas 2", balance: 230000, lastUpdate: "16 Okt 2026" },
  { nis: "1003", name: "Muhammad Al Fatih", class: "Kelas 3", balance: 95000, lastUpdate: "10 Okt 2026" },
  { nis: "1004", name: "Dewi Lestari", class: "Kelas 4", balance: 310000, lastUpdate: "17 Okt 2026" },
  { nis: "1005", name: "Rizky Ramadhan", class: "Kelas 5", balance: 180000, lastUpdate: "12 Okt 2026" },
  { nis: "1006", name: "Aisyah Putri", class: "Kelas 6", balance: 425000, lastUpdate: "15 Okt 2026" }
];

function getProducts() {
  const data = localStorage.getItem('mimu_products');
  return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
}

function getSavings() {
  const data = localStorage.getItem('mimu_savings');
  return data ? JSON.parse(data) : DEFAULT_SAVINGS;
}

function formatRupiah(num) {
  return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Render Produk
function renderProducts(filter = 'semua') {
  const grid = document.getElementById('productGrid');
  const products = getProducts();
  
  const filtered = filter === 'semua' ? products : products.filter(p => p.category === filter);
  
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img">${p.icon}</div>
      <div class="product-body">
        <div>
          <div class="product-category">${p.category.toUpperCase()}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-price">${formatRupiah(p.price)}</div>
        </div>
        <div class="product-footer">
          <span>Stok: <strong>${p.stock}</strong></span>
          <a href="https://wa.me/6281234567890?text=Halo%20Koperasi,%20saya%20mau%20pesan%20${encodeURIComponent(p.name)}%20harga%20${p.price}" target="_blank" class="btn btn-primary" style="padding:6px 12px; font-size:12px;">Pesan WA</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter button events
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderProducts(e.target.getAttribute('data-filter').trim());
  });
});

// Cek Tabungan
document.getElementById('btnCekTabungan').addEventListener('click', () => {
  const query = document.getElementById('nisInput').value.trim().toLowerCase();
  const resultDiv = document.getElementById('searchResult');
  
  if (!query) {
    resultDiv.innerHTML = `<p style="color:#ef4444; font-size:13px;">Masukkan NIS atau Nama siswa terlebih dahulu.</p>`;
    return;
  }
  
  const savings = getSavings();
  const found = savings.find(s => s.nis.toLowerCase() === query || s.name.toLowerCase().includes(query));
  
  if (found) {
    resultDiv.innerHTML = `
      <div class="result-card">
        <h3 style="color:var(--primary); margin-bottom:8px;">✅ Data Tabungan Ditemukan</h3>
        <p><strong>Nama Siswa:</strong> ${found.name}</p>
        <p><strong>Nomor NIS:</strong> ${found.nis}</p>
        <p><strong>Kelas:</strong> ${found.class}</p>
        <p style="font-size:18px; font-weight:800; color:#0f172a; margin:10px 0;">Saldo Tabungan: ${formatRupiah(found.balance)}</p>
        <p style="font-size:11px; color:var(--text-muted);">Terakhir diperbarui: ${found.lastUpdate} oleh Pengurus Koperasi</p>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="result-card" style="border-color:#fca5a5; background:#fef2f2;">
        <p style="color:#b91c1c; font-size:13px;">❌ Data siswa dengan kata kunci "<strong>${query}</strong>" tidak ditemukan. Pastikan NIS atau Nama sudah benar.</p>
      </div>
    `;
  }
});

// Modal Admin
const modal = document.getElementById('adminModal');
document.getElementById('btnAdminModal').addEventListener('click', () => modal.style.display = 'flex');
document.getElementById('closeModal').addEventListener('click', () => modal.style.display = 'none');

document.getElementById('btnLogin').addEventListener('click', () => {
  const pass = document.getElementById('adminPass').value;
  if (pass === 'admin123') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    alert('Berhasil masuk sebagai Admin!');
  } else {
    alert('Sandi salah! Gunakan admin123');
  }
});

document.getElementById('btnResetData').addEventListener('click', () => {
  if (confirm('Reset data produk dan tabungan ke awal?')) {
    localStorage.removeItem('mimu_products');
    localStorage.removeItem('mimu_savings');
    renderProducts();
    alert('Data berhasil direset.');
    modal.style.display = 'none';
  }
});

// Init
renderProducts();
