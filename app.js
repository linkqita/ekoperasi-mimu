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
  { id: 1, nis: "1001", name: "Ahmad Zaki", class: "Kelas 1", balance: 145000, lastUpdate: "14 Okt 2026" },
  { id: 2, nis: "1002", name: "Siti Nurhaliza", class: "Kelas 2", balance: 230000, lastUpdate: "16 Okt 2026" },
  { id: 3, nis: "1003", name: "Muhammad Al Fatih", class: "Kelas 3", balance: 95000, lastUpdate: "10 Okt 2026" },
  { id: 4, nis: "1004", name: "Dewi Lestari", class: "Kelas 4", balance: 310000, lastUpdate: "17 Okt 2026" },
  { id: 5, nis: "1005", name: "Rizky Ramadhan", class: "Kelas 5", balance: 180000, lastUpdate: "12 Okt 2026" },
  { id: 6, nis: "1006", name: "Aisyah Putri", class: "Kelas 6", balance: 425000, lastUpdate: "15 Okt 2026" }
];

const DEFAULT_SETTINGS = {
  whatsapp: "6281234567890",
  address: "Komplek MI Miftahul Ulum Kebotohan, Kec. Suradadi, Kab. Tegal",
  jam1: "Senin – Kamis: 07.30 - 13.00 WIB",
  jam2: "Jumat – Sabtu: 07.30 - 11.00 WIB",
  email: "koperasi.mimu@gmail.com"
};

function getProducts() {
  const data = localStorage.getItem('mimu_products');
  return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
}
function saveProducts(arr) { localStorage.setItem('mimu_products', JSON.stringify(arr)); }

function getSavings() {
  const data = localStorage.getItem('mimu_savings');
  return data ? JSON.parse(data) : DEFAULT_SAVINGS;
}
function saveSavings(arr) { localStorage.setItem('mimu_savings', JSON.stringify(arr)); }

function getSettings() {
  const data = localStorage.getItem('mimu_settings');
  return data ? JSON.parse(data) : DEFAULT_SETTINGS;
}
function saveSettingsObj(obj) { localStorage.setItem('mimu_settings', JSON.stringify(obj)); }

function formatRupiah(num) {
  return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Inisialisasi Tampilan Dinamis Berdasarkan Settings
function applySettings() {
  const s = getSettings();
  
  // WhatsApp Hero & Kontak
  const waBtn = document.getElementById('heroWaBtn');
  if (waBtn) {
    waBtn.href = `https://wa.me/${s.whatsapp}?text=Halo%20Koperasi%20MIMU%20Kebotohan,%20saya%20mau%20tanya...`;
  }
  
  const infoJam1 = document.getElementById('infoJam1');
  const infoJam2 = document.getElementById('infoJam2');
  if (infoJam1) infoJam1.textContent = s.jam1;
  if (infoJam2) infoJam2.textContent = s.jam2;

  const infoAlamat = document.getElementById('infoAlamat');
  const infoWaText = document.getElementById('infoWaText');
  const infoEmail = document.getElementById('infoEmail');
  if (infoAlamat) infoAlamat.innerHTML = `📍 <strong>Lokasi:</strong> ${s.address}`;
  if (infoWaText) infoWaText.innerHTML = `📱 <strong>WhatsApp:</strong> +${s.whatsapp.replace(/(\d{2})(\d{3})(\d{4})(\d+)/, '$1 $2-$3-$4')}`;
  if (infoEmail) infoEmail.innerHTML = `✉️ <strong>Email:</strong> ${s.email}`;
}

// Render Katalog Produk
function renderProducts(filter = 'semua') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  const products = getProducts();
  const s = getSettings();
  const filtered = filter === 'semua' ? products : products.filter(p => p.category === filter);
  
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img">${p.icon || '📦'}</div>
      <div class="product-body">
        <div>
          <div class="product-category">${p.category.toUpperCase()}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-price">${formatRupiah(p.price)}</div>
        </div>
        <div class="product-footer">
          <span>Stok: <strong>${p.stock}</strong></span>
          <a href="https://wa.me/${s.whatsapp}?text=Halo%20Koperasi,%20saya%20mau%20pesan%20${encodeURIComponent(p.name)}%20harga%20${p.price}" target="_blank" class="btn btn-primary" style="padding:6px 12px; font-size:12px;">Pesan WA</a>
        </div>
      </div>
    </div>
  `).join('');
}

window.filterCat = function(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
};

// Cek Tabungan
window.cekTabungan = function() {
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
        <p style="font-size:11px; color:var(--text-muted);">Terakhir diperbarui: ${found.lastUpdate || 'Baru saja'}</p>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="result-card" style="border-color:#fca5a5; background:#fef2f2;">
        <p style="color:#b91c1c; font-size:13px;">❌ Data siswa dengan kata kunci "<strong>${query}</strong>" tidak ditemukan.</p>
      </div>
    `;
  }
};

// Modal Admin Global Functions
window.openAdminModal = function() {
  document.getElementById('adminModal').style.display = 'flex';
};

window.closeAdminModal = function() {
  document.getElementById('adminModal').style.display = 'none';
};

window.doLogin = function() {
  const pass = document.getElementById('adminPass').value;
  if (pass === 'admin123') {
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminLists();
    loadSettingsForm();
  } else {
    alert('Sandi salah! Gunakan admin123');
  }
};

window.doLogout = function() {
  document.getElementById('loginView').style.display = 'block';
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('adminPass').value = '';
};

window.switchTab = function(tab) {
  const p = document.getElementById('adminTabProducts');
  const s = document.getElementById('adminTabSavings');
  const set = document.getElementById('adminTabSettings');
  
  p.style.display = tab === 'products' ? 'block' : 'none';
  s.style.display = tab === 'savings' ? 'block' : 'none';
  set.style.display = tab === 'settings' ? 'block' : 'none';

  document.getElementById('tabBtnProducts').className = tab === 'products' ? 'btn btn-primary' : 'btn btn-outline';
  document.getElementById('tabBtnSavings').className = tab === 'savings' ? 'btn btn-primary' : 'btn btn-outline';
  document.getElementById('tabBtnSettings').className = tab === 'settings' ? 'btn btn-primary' : 'btn btn-outline';

  ['tabBtnProducts', 'tabBtnSavings', 'tabBtnSettings'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.classList.contains('btn-primary')) {
      el.style.color = 'var(--text)';
      el.style.borderColor = 'var(--border)';
    }
  });
};

// Load settings to form
function loadSettingsForm() {
  const s = getSettings();
  document.getElementById('setCabinWa').value = s.whatsapp;
  document.getElementById('setAddress').value = s.address;
  document.getElementById('setJam1').value = s.jam1;
  document.getElementById('setJam2').value = s.jam2;
  document.getElementById('setEmail').value = s.email;
}

window.saveSettings = function(e) {
  e.preventDefault();
  const s = {
    whatsapp: document.getElementById('setCabinWa').value.trim(),
    address: document.getElementById('setAddress').value.trim(),
    jam1: document.getElementById('setJam1').value.trim(),
    jam2: document.getElementById('setJam2').value.trim(),
    email: document.getElementById('setEmail').value.trim()
  };
  saveSettingsObj(s);
  applySettings();
  renderProducts();
  alert('Pengaturan madrasah berhasil disimpan!');
};

// Render Admin Lists
function renderAdminLists() {
  const prodList = document.getElementById('adminProductList');
  const products = getProducts();
  prodList.innerHTML = products.length ? products.map(p => `
    <div class="admin-item">
      <div><strong>${p.icon || '📦'} ${p.name}</strong> (${p.category}) - ${formatRupiah(p.price)} [${p.stock}]</div>
      <div class="admin-item-actions">
        <button onclick="editProduct(${p.id})">Edit</button>
        <button class="del" onclick="deleteProduct(${p.id})">Hapus</button>
      </div>
    </div>
  `).join('') : '<p style="padding:10px; font-size:12px;">Belum ada produk.</p>';

  const savList = document.getElementById('adminSavingsList');
  const savings = getSavings();
  savList.innerHTML = savings.length ? savings.map(s => `
    <div class="admin-item">
      <div><strong>${s.nis} - ${s.name}</strong> (${s.class}) : <strong>${formatRupiah(s.balance)}</strong></div>
      <div class="admin-item-actions">
        <button onclick="editSavings(${s.id})">Edit</button>
        <button class="del" onclick="deleteSavings(${s.id})">Hapus</button>
      </div>
    </div>
  `).join('') : '<p style="padding:10px; font-size:12px;">Belum ada data tabungan.</p>';
}

// Submit Produk
window.saveProductItem = function(e) {
  e.preventDefault();
  const id = document.getElementById('prodId').value;
  const name = document.getElementById('prodName').value;
  const category = document.getElementById('prodCategory').value;
  const price = parseInt(document.getElementById('prodPrice').value);
  const stock = document.getElementById('prodStock').value;
  const icon = document.getElementById('prodIcon').value;

  let products = getProducts();
  if (id) {
    products = products.map(p => p.id == id ? { ...p, name, category, price, stock, icon } : p);
  } else {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({ id: newId, name, category, price, stock, icon });
  }
  saveProducts(products);
  renderProducts();
  renderAdminLists();
  e.target.reset();
  document.getElementById('prodId').value = '';
  alert('Produk berhasil disimpan!');
};

window.editProduct = function(id) {
  const p = getProducts().find(x => x.id == id);
  if (!p) return;
  document.getElementById('prodId').value = p.id;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodStock').value = p.stock;
  document.getElementById('prodIcon').value = p.icon || '📦';
};

window.deleteProduct = function(id) {
  if (confirm('Hapus produk ini?')) {
    let products = getProducts().filter(x => x.id != id);
    saveProducts(products);
    renderProducts();
    renderAdminLists();
  }
};

// Submit Tabungan
window.saveSavingsItem = function(e) {
  e.preventDefault();
  const nis = document.getElementById('savNis').value;
  const name = document.getElementById('savName').value;
  const sClass = document.getElementById('savClass').value;
  const balance = parseInt(document.getElementById('savBalance').value);
  const today = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

  let savings = getSavings();
  const existing = savings.find(s => s.nis === nis);
  if (existing) {
    savings = savings.map(s => s.nis === nis ? { ...s, name, class: sClass, balance, lastUpdate: today } : s);
  } else {
    const newId = savings.length ? Math.max(...savings.map(s => s.id || 1)) + 1 : 1;
    savings.push({ id: newId, nis, name, class: sClass, balance, lastUpdate: today });
  }
  saveSavings(savings);
  renderAdminLists();
  e.target.reset();
  alert('Data tabungan berhasil disimpan!');
};

window.editSavings = function(id) {
  const s = getSavings().find(x => x.id == id);
  if (!s) return;
  document.getElementById('savNis').value = s.nis;
  document.getElementById('savName').value = s.name;
  document.getElementById('savClass').value = s.class;
  document.getElementById('savBalance').value = s.balance;
};

window.deleteSavings = function(id) {
  if (confirm('Hapus data tabungan siswa ini?')) {
    let savings = getSavings().filter(x => x.id != id);
    saveSavings(savings);
    renderAdminLists();
  }
};

window.resetAllData = function() {
  if (confirm('Reset seluruh produk, tabungan, dan pengaturan ke data bawaan?')) {
    localStorage.removeItem('mimu_products');
    localStorage.removeItem('mimu_savings');
    localStorage.removeItem('mimu_settings');
    applySettings();
    renderProducts();
    renderAdminLists();
    alert('Data berhasil direset.');
  }
};

// Init
applySettings();
renderProducts();
