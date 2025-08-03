# VeeValidate for Vue 3

VeeValidate adalah library validasi form yang sangat mudah digunakan, cocok untuk Vue 3 + Vite, dan bisa mengcover semua input field Anda. Cukup install satu package saja.

## Instalasi

Jalankan perintah berikut di terminal:

npm install vee-validate@next yup

- vee-validate: library validasi utama
- yup: untuk skema validasi yang powerful dan mudah dibaca

## Analisis Field & Rekomendasi Validasi

| Field                      | Tipe     | Minimal | Maksimal | Catatan Validasi                |
|----------------------------|----------|---------|----------|---------------------------------|
| full_name                  | string   | 2       | 100      | Hanya huruf, spasi              |
| passport_no                | string   | 6       | 20       | Huruf/angka, wajib diisi        |
| nationality                | string   | 2       | 56       | Wajib diisi                     |
| gender                     | string   | 1       | 1        | 'L' atau 'P'                    |
| birth_date                 | date     | -       | -        | Wajib diisi, valid date         |
| phone_number               | string   | 8       | 20       | Angka, boleh +, wajib diisi     |
| email                      | string   | 5       | 100      | Format email, wajib diisi       |
| address_in_indonesia       | string   | 5       | 200      | Wajib diisi                     |
| flight_info                | string   | 3       | 50       | Wajib diisi                     |
| arrival_datetime           | datetime | -       | -        | Wajib diisi, valid datetime     |
| departure_city             | string   | 2       | 56       | Wajib diisi                     |
| destination_city           | string   | 2       | 56       | Wajib diisi                     |
| health_info                | string   | 0       | 200      | Opsional                        |
| emergency_contact_name     | string   | 2       | 100      | Wajib diisi                     |
| emergency_contact_phone    | string   | 8       | 20       | Angka, boleh +, wajib diisi     |
| face_photo_url (file)      | file     | -       | 2MB      | jpg/png, max 2MB, wajib         |
| vaccine_card_url (file)    | file     | -       | 2MB      | jpg/png/pdf, max 2MB, wajib     |

## Langkah Integrasi

1. Install vee-validate dan yup.
2. Ubah form di ArrivalForm.vue agar menggunakan <Form>, <Field>, dan validasi dari vee-validate.
3. Buat skema validasi dengan yup.
4. Validasi file upload di handleFileUpload.

Saya akan lanjutkan dengan patch ArrivalForm.vue agar menggunakan vee-validate dan validasi sesuai tabel di atas.
