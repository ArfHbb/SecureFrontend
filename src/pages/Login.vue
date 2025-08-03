<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center relative">
    <div v-if="isBlocked" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 class="text-2xl font-bold mb-4 text-red-600">Terlalu Banyak Percobaan Login</h2>
        <p class="mb-4">Anda telah melebihi batas percobaan login.<br>Silakan tunggu <b>{{ blockCountdown }}</b> sebelum mencoba lagi.</p>
        <div class="text-4xl font-mono text-blue-700">{{ blockCountdown }}</div>
      </div>
    </div>
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8" :class="{ 'opacity-40 pointer-events-none': isBlocked }">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
              alt="Logo Imigrasi"
              class="w-16 h-16"
          />
        </div>
        <h1 class="text-2xl font-bold text-gray-800">Login Petugas Imigrasi</h1>
        <p class="text-gray-500 mt-2">
          Masuk ke dashboard internal untuk verifikasi data kedatangan
        </p>
      </div>

      <form @submit.prevent="login" class="space-y-6" autocomplete="off">

        <div>
          <label for="email" class="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
              id="email"
              type="text"
              v-model="username"
              class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Masukkan email"
              minlength="5"
              maxlength="50"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <div class="relative flex items-center">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              placeholder="Masukkan password"
            />
            <button type="button"
              @click="togglePassword"
              tabindex="-1"
              class="absolute right-3 top-0 h-full flex items-center text-gray-500 focus:outline-none"
              aria-label="Tampilkan/sembunyikan password"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.121-2.121A9.969 9.969 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.714-4.253 1.929-5.879M4.222 4.222l15.556 15.556" /></svg>
            </button>
          </div>
        </div>

        <!-- Honeypot field, hidden from users -->
        <div style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;">
          <label for="website">Website</label>
          <input id="website" type="text" v-model="honeypot" autocomplete="off" tabindex="-1" />
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
            :disabled="!username || !password"
            :class="{'opacity-50 cursor-not-allowed': !username || !password}"
        >
          Masuk
        </button>
      </form>

      <!-- Error message now handled by SweetAlert2 -->

      <div class="mt-6 text-center text-sm text-gray-500">
        © 2025 Sistem Imigrasi Kedatangan
      </div>
    </div>
  </div>
</template>

<script>



import api, { base_url } from "../services/api";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      honeypot: "",
      error: null,
      showPassword: false,
      passwordTimer: null,
      isBlocked: false,
      blockCountdown: '',
      blockTimer: null,
    };
  },
  mounted() {
    this.checkBlock();
    // Blokir akses jika device mobile
    if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      Swal.fire({
        icon: 'warning',
        title: 'Akses Ditolak',
        html: '<b>Aplikasi ini hanya dapat diakses melalui komputer atau iPad.<br>Silakan gunakan perangkat yang didukung.</b>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        backdrop: true,
        customClass: {
          popup: 'swal2-popup swal2-large-popup'
        }
      });
      return;
    }
    // Deteksi lokasi user via ipapi.co
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code !== 'ID') {
          Swal.fire({
            icon: 'warning',
            title: 'Akses Ditolak',
            html: '<b>Maaf, aplikasi ini hanya dapat diakses dari wilayah Indonesia.<br>Silakan hubungi admin jika Anda membutuhkan akses.</b>',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            backdrop: true,
            customClass: {
              popup: 'swal2-popup swal2-large-popup'
            }
          });
        }
      })
      .catch(() => {});
  },
  methods: {
    checkBlock() {
      // Cek status blokir dari localStorage
      const blockUntil = parseInt(localStorage.getItem('login_block_until') || '0', 10);
      if (blockUntil && Date.now() < blockUntil) {
        this.isBlocked = true;
        this.startBlockCountdown(blockUntil);
      } else {
        this.isBlocked = false;
        localStorage.removeItem('login_block_until');
        localStorage.removeItem('login_attempts');
      }
    },
    startBlockCountdown(blockUntil) {
      const update = () => {
        const now = Date.now();
        let ms = blockUntil - now;
        if (ms < 0) ms = 0;
        const min = Math.floor(ms / 60000);
        const sec = Math.floor((ms % 60000) / 1000);
        this.blockCountdown = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        if (ms > 0) {
          this.blockTimer = setTimeout(update, 1000);
        } else {
          this.isBlocked = false;
          localStorage.removeItem('login_block_until');
          localStorage.removeItem('login_attempts');
        }
      };
      update();
    },
    togglePassword() {
      if (!this.showPassword) {
        this.showPassword = true;
        if (this.passwordTimer) clearTimeout(this.passwordTimer);
        this.passwordTimer = setTimeout(() => {
          this.showPassword = false;
        }, 20000); // 20 detik
      } else {
        this.showPassword = false;
        if (this.passwordTimer) clearTimeout(this.passwordTimer);
      }
    },
    async login() {
      if (this.isBlocked) return;
      // Cek blokir sebelum submit
      const blockUntil = parseInt(localStorage.getItem('login_block_until') || '0', 10);
      if (blockUntil && Date.now() < blockUntil) {
        this.isBlocked = true;
        this.startBlockCountdown(blockUntil);
        return;
      }
      // Honeypot check: if filled, block login
      if (this.honeypot && this.honeypot.trim() !== "") {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Akses tidak diizinkan.",
        });
        return;
      }
      try {
        // Cek dan update percobaan gagal
        let attempts = JSON.parse(localStorage.getItem('login_attempts') || '[]');
        const now = Date.now();
        // Hapus percobaan yang lebih dari 15 menit lalu
        attempts = attempts.filter(ts => now - ts < 15 * 60 * 1000);
        // POST ke API eksternal
        const res = await fetch(`${base_url}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.username,
            password: this.password
          })
        });
        const result = await res.json();
        if (res.ok && result.success && result.data && result.data.access_token) {
          localStorage.setItem("token", result.data.access_token);
          localStorage.setItem("login_time", Date.now().toString()); // simpan waktu login
          // Reset percobaan gagal
          localStorage.removeItem('login_attempts');
          localStorage.removeItem('login_block_until');
          await Swal.fire({
            icon: "success",
            title: "Login Berhasil",
            text: result.message || "Selamat datang di dashboard!",
            timer: 1500,
            showConfirmButton: false
          });
          this.$router.push("/dashboard");
        } else {
          // Tambah percobaan gagal
          attempts.push(now);
          localStorage.setItem('login_attempts', JSON.stringify(attempts));
          if (attempts.length >= 5) {
            // Blokir 5 menit
            const blockUntil = now + 5 * 60 * 1000;
            localStorage.setItem('login_block_until', blockUntil.toString());
            this.isBlocked = true;
            this.startBlockCountdown(blockUntil);
            Swal.fire({
              icon: 'error',
              title: 'Terlalu Banyak Percobaan',
              text: 'Anda telah melebihi batas percobaan login. Silakan tunggu 5 menit.',
              showConfirmButton: false,
              timer: 2000
            });
            return;
          }
          Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: result.message || "Email atau password salah. Silakan coba lagi.",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Terjadi kesalahan saat login. Silakan cek koneksi internet Anda.",
        });
      }
    },
  },
};
</script>

<style>
body {
  font-family: "Lato", sans-serif;
}

.bg-gradient {
  background: linear-gradient(135deg, #007bff 0%, #00a6ff 100%);
}
</style>
