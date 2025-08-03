<template>

  <div class="p-6 max-w-4xl mx-auto">
    <button @click="$router.push('/dashboard')" class="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded flex items-center">
      <span class="material-icons mr-2">arrow_back</span> Kembali ke Dashboard
    </button>
    <h1 class="text-2xl font-bold mb-4">Detail Kedatangan</h1>

    <!-- Error message now handled by SweetAlert2 -->

    <div v-if="arrival" class="border p-4 rounded bg-white">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <table class="min-w-full table-auto border-collapse">
            <tbody>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Nama</td>
                <td class="py-2">{{ arrival.full_name }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Paspor</td>
                <td class="py-2">{{ arrival.passport_no }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Kebangsaan</td>
                <td class="py-2">{{ arrival.nationality }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Jenis Kelamin</td>
                <td class="py-2">{{ arrival.gender }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Tanggal Lahir</td>
                <td class="py-2">{{ formatDate(arrival.birth_date) }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">No. Telepon</td>
                <td class="py-2">{{ arrival.phone_number }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Email</td>
                <td class="py-2">{{ arrival.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Alamat di Indonesia</td>
                <td class="py-2">{{ arrival.address_in_indonesia }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Info Penerbangan</td>
                <td class="py-2">{{ arrival.flight_info }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Tanggal Kedatangan</td>
                <td class="py-2">{{ formatDateTime(arrival.arrival_datetime) }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Kota Keberangkatan</td>
                <td class="py-2">{{ arrival.departure_city }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Kota Tujuan</td>
                <td class="py-2">{{ arrival.destination_city }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Kesehatan</td>
                <td class="py-2">{{ arrival.health_info }}</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Kontak Darurat</td>
                <td class="py-2">{{ arrival.emergency_contact_name }} ({{ arrival.emergency_contact_phone }})</td>
              </tr>
              <tr>
                <td class="font-semibold py-2 pr-4 text-gray-600">Status</td>
                <td class="py-2"><span :class="statusColor(arrival.status)">{{ arrival.status }}</span></td>
              </tr>
              <tr v-if="arrival.approved_by_name">
                <td class="font-semibold py-2 pr-4 text-gray-600">Disetujui oleh</td>
                <td class="py-2">{{ arrival.approved_by_name }} ({{ formatDateTime(arrival.approved_at) }})</td>
              </tr>
              <tr v-if="arrival.rejected_by_name">
                <td class="font-semibold py-2 pr-4 text-gray-600">Ditolak oleh</td>
                <td class="py-2">{{ arrival.rejected_by_name }} ({{ formatDateTime(arrival.rejected_at) }})</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-col items-center justify-start min-w-[180px] mt-6 md:mt-0">
          <div v-if="arrival.face_photo_url" class="mb-4">
            <img
              :src="facePhotoSrc"
              alt="Foto Wajah"
              class="w-40 h-40 object-cover rounded border shadow"
              @error="onFacePhotoError"
            />
          </div>
          <div v-if="arrival.vaccine_card_url">
            <a :href="getPhotoUrl(arrival.vaccine_card_url)" target="_blank" class="text-blue-600 underline">Lihat Kartu Vaksin</a>
          </div>
        </div>
      </div>
      <div class="mt-6 flex space-x-4">
        <button
          class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          @click="approveArrival"
          :disabled="arrival.status === 'approved' || arrival.status === 'pending'"
        >Approve</button>
        <button
          class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          @click="rejectArrival"
          :disabled="arrival.status === 'rejected' || arrival.status === 'pending'"
        >Reject</button>
      </div>
    </div>

    <!-- Loading handled by SweetAlert2 -->
  </div>
</template>

<script>


import api, { base_url } from "../services/api";
import Swal from "sweetalert2";
import { purify } from "../utils/purify";

export default {
  name: "ArrivalDetail",
  data() {
    return {
      arrival: null,
      loading: false,
      error: null,
      facePhotoSrc: '',
    };
  },
  mounted() {
    // Blokir akses jika device mobile
    if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      import('sweetalert2').then(({ default: Swal }) => {
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
      });
      return;
    }
    this.fetchArrival();
  },
  methods: {
    async fetchArrival() {
      this.loading = true;
      Swal.fire({
        allowOutsideClick: false,
        showConfirmButton: false,
        background: 'transparent',
        didOpen: () => Swal.showLoading()
      });
      try {
        const id = this.$route.params.id;
        const res = await api.get(`/api/arrivals/${id}`);
        // ...log dihapus demi keamanan...
        this.arrival = res.data.data;
        // Set foto wajah, fallback jika kosong
        if (this.arrival && this.arrival.face_photo_url) {
          this.facePhotoSrc = this.getPhotoUrl(this.arrival.face_photo_url);
        } else {
          this.facePhotoSrc = require('@/assets/default-face.png');
        }
      } catch (err) {
        let msg = "Gagal memuat detail kedatangan. Silakan coba lagi nanti.";
        if (err.response && (err.response.status === 404)) {
          msg = "Data kedatangan tidak ditemukan.";
        } else if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          msg = "Sesi Anda telah berakhir. Silakan login kembali.";
        } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
          msg = "Koneksi ke server timeout. Silakan cek koneksi internet Anda.";
        }
        Swal.fire({
          icon: 'error',
          title: 'Gagal memuat data',
          text: msg
        });
      } finally {
        this.loading = false;
        Swal.close();
      }
    },
    statusColor(status) {
      if (status === "approved") return "text-green-600";
      if (status === "rejected") return "text-red-600";
      return "text-yellow-600";
    },
    formatDate(dateStr) {
      if (!dateStr) return "-";
      const d = new Date(dateStr);
      return d.toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' });
    },
    formatDateTime(dateStr) {
      if (!dateStr) return "-";
      const d = new Date(dateStr);
      return d.toLocaleString("id-ID", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    },
    getPhotoUrl(path) {
      if (!path) return "";
      if (path.startsWith("http")) return path;
      // fallback ke base_url dari api.js
      return base_url.replace(/\/$/, '') + path;
    },
    async approveArrival() {
      try {
        const res = await api.post(
            `/api/arrivals/${this.arrival.id}/approve`,
            {},
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
        );
        // ...log dihapus demi keamanan...
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Kedatangan berhasil disetujui.'
        });
      } catch (err) {
        // ...log error dihapus demi keamanan...
        this.arrival = null; // Clear arrival data on error
        let msg = "Proses approve gagal. Silakan coba lagi atau hubungi admin.";
        if (err.response && err.response.status === 409) {
          msg = "Kedatangan ini sudah diproses sebelumnya.";
        } else if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          msg = "Sesi Anda telah berakhir. Silakan login kembali.";
        } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
          msg = "Koneksi ke server timeout. Silakan cek koneksi internet Anda.";
        }
        Swal.fire({
          icon: 'error',
          title: 'Gagal menyetujui kedatangan',
          text: msg
        });
      }
    },
    async rejectArrival() {
      try {
        const res = await api.post(
            `/api/arrivals/${this.arrival.id}/reject`,
            {},
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
        );
        // ...log dihapus demi keamanan...
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Kedatangan berhasil ditolak.'
        });
      } catch (err) {
        // ...log error dihapus demi keamanan...
        this.arrival = null; // Clear arrival data on error
        let msg = "Proses reject gagal. Silakan coba lagi atau hubungi admin.";
        if (err.response && err.response.status === 409) {
          msg = "Kedatangan ini sudah diproses sebelumnya.";
        } else if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          msg = "Sesi Anda telah berakhir. Silakan login kembali.";
        } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
          msg = "Koneksi ke server timeout. Silakan cek koneksi internet Anda.";
        }
        Swal.fire({
          icon: 'error',
          title: 'Gagal menolak kedatangan',
          text: msg
        });
      }
    },
  },
};
</script>
