// app.js - logika Mini Resto App

const formMenu = document.getElementById("formMenu");
const menuList = document.getElementById("menuList");
const orderList = document.getElementById("orderList");
const totalHarga = document.getElementById("totalHarga");

// 🌟 Data menu awal (3 Menu Estetik)
let menuData = [
  {
    nama: "Toast Senja Caramel",
    harga: 35000,
    deskripsi: "Roti brioche tebal dipanggang renyah, disajikan dengan irisan stroberi, es krim vanilla, dan siraman saus karamel asin.",
    foto: "https://i.pinimg.com/1200x/5c/f7/7b/5cf77b6c797fed372b916ffa57f5b83b.jpg",
  },
  {
    nama: "Iced Latte Aroma Pagi",
    harga: 28000,
    deskripsi: "Espresso *single origin* dipadukan susu segar dan sentuhan sirup karamel/vanilla, es batu kristal.",
    foto: "https://i.pinimg.com/1200x/18/7f/f5/187ff551ac91def515b6ef832a42a1c6.jpg",
  },
  {
    nama: "Rice Bowl 'Midnight' Truffle",
    harga: 55000,
    deskripsi: "Nasi hangat dengan daging sapi *tender* yang diasinkan, topping telur mata sapi, dan aroma minyak truffle mewah.",
    foto: "https://i.pinimg.com/736x/b3/19/f3/b319f311dcf41a202f0600e809cb441d.jpg",
  },
];
let pesanan = [];

// Fungsi format angka ke format Rupiah pakai titik ribuan (selalu 3 digit di belakang nol)
function formatRupiah(angka) {
  return angka.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
  });
}

formMenu.addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const harga = parseInt(document.getElementById("harga").value);
  const deskripsi = document.getElementById("deskripsi").value;
  // Gunakan foto placeholder yang lebih aesthetic
  const foto =
    document.getElementById("foto").value || "https://via.placeholder.com/150?text=Menu+Baru";

  menuData.push({ nama, harga, deskripsi, foto });
  renderMenu();

  formMenu.reset();
});

function renderMenu() {
  menuList.innerHTML = "";
  menuData.forEach((menu, index) => {
    const card = document.createElement("div");
    // Penambahan styling estetik pada card
    card.className =
      "bg-white rounded-xl shadow-lg p-4 text-black flex flex-col transform hover:scale-[1.01] transition duration-300 ease-in-out cursor-pointer border border-gray-100"; 
      
    // Warna harga disesuaikan dengan skema warna estetik
    const priceColor = index % 3 === 0 ? "text-pink-600" : (index % 3 === 1 ? "text-blue-700" : "text-green-700"); 

    card.innerHTML = `
<img src="${menu.foto}" alt="${menu.nama}" class="w-full h-40 object-cover rounded-lg mb-3 shadow-md">
<h3 class="text-xl font-bold text-amber-900 mt-1">${menu.nama}</h3>
<p class="text-sm text-gray-600 flex-grow italic mb-3">${menu.deskripsi}</p>
<p class="font-extrabold ${priceColor} mt-2 text-2xl">Rp ${formatRupiah(
      menu.harga
    )}</p>
<button class="bg-amber-700 text-white rounded p-2 mt-3 hover:bg-amber-800 transition duration-150">
✨ Tambah ke Pesanan
</button>
`;

    const btnPesan = card.querySelector("button");
    btnPesan.addEventListener("click", () => tambahPesanan(index));

    menuList.appendChild(card);
  });
}

function tambahPesanan(index) {
  const itemBaru = {
    nama: menuData[index].nama,
    harga: menuData[index].harga,
  };
  pesanan.push(itemBaru);
  renderPesanan();
}

function renderPesanan() {
  orderList.innerHTML = "";
  let total = 0;

  pesanan.forEach((item, i) => {
    total += item.harga;

    const li = document.createElement("li");
    // Styling daftar pesanan lebih rapi
    li.className = "flex justify-between items-center py-2 border-b border-amber-100 last:border-b-0";

    li.innerHTML = `
<span>**${item.nama}** - Rp ${formatRupiah(item.harga)}</span>
<button class="bg-orange-600 text-white text-xs rounded px-2 py-1 hover:bg-orange-700 transition duration-150">❌ Hapus</button>
`;

    li.querySelector("button").addEventListener("click", () => {
      pesanan.splice(i, 1);
      renderPesanan();
    });

    orderList.appendChild(li);
  });

  totalHarga.textContent = `💰 Total Pesanan: Rp ${formatRupiah(total)}`;
}

// Fungsi inisialisasi: Panggil renderMenu() untuk menampilkan menu tetap saat aplikasi dimuat
function init() {
  renderMenu();
}

// Panggil init
init();