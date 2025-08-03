

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
      <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">Pendaftaran Kedatangan Wisatawan Mancanegara</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium">Nama Lengkap</label>
            <input v-model="form.full_name" type="text" class="input-tw" pattern="^[A-Za-zÀ-ÿ ']+$" title="Nama hanya boleh huruf dan spasi" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Nomor Paspor</label>
            <input v-model="form.passport_no" type="text" class="input-tw" pattern="^[A-Za-z0-9]+$" title="Nomor paspor hanya huruf dan angka, tanpa spasi/simbol" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Kebangsaan</label>
            <select v-model="form.nationality" class="input-tw">
              <option value="">Pilih Negara</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cabo Verde">Cabo Verde</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Central African Republic">Central African Republic</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="East Timor">East Timor</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Eswatini">Eswatini</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Greece">Greece</option>
              <option value="Grenada">Grenada</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-Bissau">Guinea-Bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Honduras">Honduras</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mexico">Mexico</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="North Korea">North Korea</option>
              <option value="North Macedonia">North Macedonia</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestine">Palestine</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Qatar">Qatar</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Korea">South Korea</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Togo">Togo</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City">Vatican City</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">Jenis Kelamin</label>
            <select v-model="form.gender" class="input-tw">
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">Tanggal Lahir</label>
            <input v-model="form.birth_date" type="date" class="input-tw" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Nomor Telepon</label>
            <input v-model="form.phone_number" type="tel" class="input-tw" pattern="^[+0-9]{8,20}$" title="Nomor telepon hanya angka dan +, 8-20 digit" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Email</label>
            <input v-model="form.email" type="email" class="input-tw" />
          </div>
          <div class="md:col-span-2">
            <label class="block mb-1 font-medium">Alamat tinggal di Indonesia</label>
            <textarea v-model="form.address_in_indonesia" class="input-tw" minlength="5" maxlength="200"></textarea>
          </div>
          <div>
            <label class="block mb-1 font-medium">Maskapai & Nomor Penerbangan</label>
            <input v-model="form.flight_info" type="text" class="input-tw" minlength="3" maxlength="50" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Tanggal & Jam Kedatangan</label>
            <input v-model="form.arrival_datetime" type="datetime-local" class="input-tw" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Kota Asal Keberangkatan</label>
            <input v-model="form.departure_city" type="text" class="input-tw" pattern="^[A-Za-zÀ-ÿ .'-]+$" title="Kota hanya boleh huruf dan spasi" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Tujuan di Indonesia</label>
            <input v-model="form.destination_city" type="text" class="input-tw" pattern="^[A-Za-zÀ-ÿ .'-]+$" title="Kota hanya boleh huruf dan spasi" />
          </div>
          <div class="md:col-span-2">
            <label class="block mb-1 font-medium">Riwayat Kesehatan</label>
            <textarea v-model="form.health_info" class="input-tw" maxlength="200"></textarea>
          </div>
          <div>
            <label class="block mb-1 font-medium">Nama Kontak Darurat</label>
            <input v-model="form.emergency_contact_name" type="text" class="input-tw" pattern="^[A-Za-zÀ-ÿ ']+$" title="Nama hanya boleh huruf dan spasi" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Nomor Kontak Darurat</label>
            <input v-model="form.emergency_contact_phone" type="tel" class="input-tw" pattern="^[+0-9]{8,20}$" title="Nomor telepon hanya angka dan +, 8-20 digit" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Foto Wajah</label>
            <input type="file" @change="handleFileUpload('face_photo_url', $event)" class="input-tw" />
          </div>
          <div>
            <label class="block mb-1 font-medium">Kartu Vaksin</label>
            <input type="file" @change="handleFileUpload('vaccine_card_url', $event)" class="input-tw" />
          </div>
        </div>
        <button
          type="submit"
          class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading || !allFieldsFilled"
        >
          <span v-if="loading">Mengirim...</span>
          <span v-else>Kirim Pendaftaran</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input-tw {
  @apply border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition;
}
</style>


<script>
import api from "../services/api";
import Swal from "sweetalert2";

export default {
  name: "ArrivalForm",
  data() {
    return {
      form: {
        full_name: "",
        passport_no: "",
        nationality: "",
        gender: "",
        birth_date: "",
        phone_number: "",
        email: "",
        address_in_indonesia: "",
        flight_info: "",
        arrival_datetime: "",
        departure_city: "",
        destination_city: "",
        health_info: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        face_photo_url: null,
        vaccine_card_url: null
      },
      loading: false
    };
  },
  computed: {
    allFieldsFilled() {
      const f = this.form;
      // Semua field wajib diisi
      return (
        !!f.full_name &&
        !!f.passport_no &&
        !!f.nationality &&
        !!f.gender &&
        !!f.birth_date &&
        !!f.phone_number &&
        !!f.email &&
        !!f.address_in_indonesia &&
        !!f.flight_info &&
        !!f.arrival_datetime &&
        !!f.departure_city &&
        !!f.destination_city &&
        !!f.health_info &&
        !!f.emergency_contact_name &&
        !!f.emergency_contact_phone &&
        !!f.face_photo_url &&
        !!f.vaccine_card_url
      );
    }
  },
  methods: {
    handleFileUpload(field, event) {
      const file = event.target.files[0];
      if (!file) return;
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (field === 'face_photo_url') {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          Swal.fire({
            icon: 'error',
            title: 'Format file tidak didukung',
            text: 'Hanya file gambar (JPG, JPEG, PNG, GIF, WEBP) yang diperbolehkan untuk foto wajah.'
          });
          event.target.value = '';
          return;
        }
        if (file.size > maxSize) {
          Swal.fire({
            icon: 'error',
            title: 'File terlalu besar',
            text: 'Ukuran maksimal foto wajah adalah 2MB.'
          });
          event.target.value = '';
          return;
        }
      }
      if (field === 'vaccine_card_url') {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          Swal.fire({
            icon: 'error',
            title: 'Format file tidak didukung',
            text: 'Kartu vaksin hanya boleh gambar (JPG, JPEG, PNG, GIF, WEBP) atau PDF.'
          });
          event.target.value = '';
          return;
        }
        if (file.size > maxSize) {
          Swal.fire({
            icon: 'error',
            title: 'File terlalu besar',
            text: 'Ukuran maksimal kartu vaksin adalah 2MB.'
          });
          event.target.value = '';
          return;
        }
      }
      // Rename file with field and timestamp
      const ext = file.name.split('.').pop();
      const now = new Date();
      const pad = n => n.toString().padStart(2, '0');
      const timestamp = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
      const newName = `${field}_${timestamp}.${ext}`;
      const renamedFile = new File([file], newName, { type: file.type });
      this.form[field] = renamedFile;
    },
    async submitForm() {
      // Custom required validation with SweetAlert
      const f = this.form;
      // Nama
      if (!f.full_name || !/^[A-Za-zÀ-ÿ ']+$/.test(f.full_name)) {
        Swal.fire({icon:'warning',title:'Nama wajib diisi','text':'Nama hanya boleh huruf dan spasi'}).then(() => {
          this.$el.querySelector('input[v-model="form.full_name"]').focus();
        });
        return;
      }
      // Paspor
      if (!f.passport_no || !/^[A-Za-z0-9]+$/.test(f.passport_no)) {
        Swal.fire({icon:'warning',title:'Nomor paspor wajib diisi','text':'Nomor paspor hanya huruf dan angka'}); return;
      }
      // Kebangsaan
      if (!f.nationality || !/^[A-Za-zÀ-ÿ .'-]+$/.test(f.nationality)) {
        Swal.fire({icon:'warning',title:'Kebangsaan wajib diisi','text':'Kebangsaan hanya boleh huruf dan spasi'}); return;
      }
      // Gender
      if (!f.gender) {
        Swal.fire({icon:'warning',title:'Jenis kelamin wajib dipilih'}); return;
      }
      // Tanggal lahir
      if (!f.birth_date) {
        Swal.fire({icon:'warning',title:'Tanggal lahir wajib diisi'}); return;
      }
      // Telepon
      if (!f.phone_number || !/^[+0-9]{8,20}$/.test(f.phone_number)) {
        Swal.fire({icon:'warning',title:'Nomor telepon wajib diisi','text':'Nomor telepon hanya angka dan +, 8-20 digit'}); return;
      }
      // Email
      if (!f.email || !/^\S+@\S+\.\S+$/.test(f.email)) {
        Swal.fire({icon:'warning',title:'Email wajib diisi','text':'Format email tidak valid'}); return;
      }
      // Alamat
      if (!f.address_in_indonesia || f.address_in_indonesia.length < 5 || f.address_in_indonesia.length > 200) {
        Swal.fire({icon:'warning',title:'Alamat wajib diisi','text':'Alamat minimal 5 karakter, maksimal 200'}); return;
      }
      // Flight info
      if (!f.flight_info || f.flight_info.length < 3 || f.flight_info.length > 50) {
        Swal.fire({icon:'warning',title:'Info penerbangan wajib diisi','text':'Minimal 3 karakter, maksimal 50'}); return;
      }
      // Datetime
      if (!f.arrival_datetime) {
        Swal.fire({icon:'warning',title:'Tanggal & jam kedatangan wajib diisi'}); return;
      }
      // Kota asal
      if (!f.departure_city || !/^[A-Za-zÀ-ÿ .'-]+$/.test(f.departure_city)) {
        Swal.fire({icon:'warning',title:'Kota asal wajib diisi','text':'Kota hanya boleh huruf dan spasi'}); return;
      }
      // Kota tujuan
      if (!f.destination_city || !/^[A-Za-zÀ-ÿ .'-]+$/.test(f.destination_city)) {
        Swal.fire({icon:'warning',title:'Kota tujuan wajib diisi','text':'Kota hanya boleh huruf dan spasi'}); return;
      }
      // Nama kontak darurat
      if (!f.emergency_contact_name || !/^[A-Za-zÀ-ÿ ']+$/.test(f.emergency_contact_name)) {
        Swal.fire({icon:'warning',title:'Nama kontak darurat wajib diisi','text':'Nama hanya boleh huruf dan spasi'}); return;
      }
      // Telepon kontak darurat
      if (!f.emergency_contact_phone || !/^[+0-9]{8,20}$/.test(f.emergency_contact_phone)) {
        Swal.fire({icon:'warning',title:'Nomor kontak darurat wajib diisi','text':'Nomor telepon hanya angka dan +, 8-20 digit'}); return;
      }
      // Foto wajah
      if (!f.face_photo_url) {
        Swal.fire({icon:'warning',title:'Foto wajah wajib diupload'}); return;
      }
      // Kartu vaksin
      if (!f.vaccine_card_url) {
        Swal.fire({icon:'warning',title:'Kartu vaksin wajib diupload'}); return;
      }
      this.loading = true;
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      try {
        await api.post("/api/arrival", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data kedatangan berhasil dikirim!'
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengirim data',
          text: 'Terjadi kesalahan saat mengirim data. Silakan cek kembali isian Anda atau coba beberapa saat lagi.'
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

