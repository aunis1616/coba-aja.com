const rightPanel = document.getElementById('rightPanel');
const coverContent = document.getElementById('coverContent');

// Saat scroll, kontrol visibilitas cover
rightPanel.addEventListener('scroll', () => {
  if (rightPanel.scrollTop < 50) {
    coverContent.style.opacity = 1;
    coverContent.style.pointerEvents = 'auto';
  } else {
    coverContent.style.opacity = 0;
    coverContent.style.pointerEvents = 'none';
  }
});

// Tombol open invitation scroll ke bawah dan aktifkan scroll
function openInvitation() {
  rightPanel.style.overflowY = 'auto'; // aktifkan scroll
  rightPanel.scrollTo({top: coverContent.offsetHeight, behavior: 'smooth'});
}

// RSVP
const form = document.getElementById('rsvpForm');
const listUcapan = document.getElementById('listUcapan');
const ucapanCount = document.getElementById('ucapanCount');

let jumlahUcapan = 0;

// fungsi bikin avatar dari nama
function buatAvatar(nama) {
  return nama
    .split(" ")
    .map(k => k[0])
    .join("")
    .substring(0,2)
    .toUpperCase();
}

// fungsi waktu sekarang
function waktuSekarang() {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('namaTamu').value;
  const telp = document.getElementById('noTelp').value;
  const hubungan = document.getElementById('hubungan').value;
  const hadir = document.getElementById('kehadiran').value;
  const ucapan = document.getElementById('ucapan').value;

  const div = document.createElement('div');
  div.classList.add('ucapan-item');
  div.innerHTML = `
    <div class="ucapan-avatar">${buatAvatar(nama)}</div>
    <div class="ucapan-body">
      <h4>
        ${nama}
        ${hadir === "Hadir" 
          ? '<i class="fa-solid fa-circle-check hadir-icon"></i>' 
          : '<i class="fa-solid fa-circle-xmark tidak-hadir-icon"></i>'}
      </h4>
      <p class="isi-ucapan">${ucapan}</p>
      <p class="detail-ucapan">
        <i class="fa-solid fa-phone"></i> ${telp}<br>
        <i class="fa-solid fa-user"></i> ${hubungan}
      </p>
      <div class="ucapan-meta">${waktuSekarang()}</div>
    </div>
  `;

  listUcapan.prepend(div);

  jumlahUcapan++;
  ucapanCount.textContent = jumlahUcapan;

  form.reset();

  // trigger animasi scroll untuk ucapan baru
  observer.observe(div);
});

let slideIndex = 0;
const slides = document.querySelectorAll("#slideshow > div:not(#slideshow-overlay)");

function showSlides() {
  slides.forEach((slide, i) => {
    slide.style.opacity = (i === slideIndex) ? "1" : "0";
  });
  slideIndex = (slideIndex + 1) % slides.length;
  setTimeout(showSlides, 4000); // ganti setiap 4 detik
}

showSlides();

// Countdown
const targetDate = new Date("Dec 26, 2025 00:00:00").getTime();

const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000*60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if(distance < 0){
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "<p>Acara Telah Dimulai!</p>";
  }
}, 1000);

 // Musik
    document.addEventListener('DOMContentLoaded', function () {
      const audio = document.getElementById("musik");
      const tombolMusik = document.getElementById("tombolMusik");
      const ikonMusik = tombolMusik.querySelector("i");

      // Fungsi toggle play/pause
      function toggleMusik() {
        if (audio.paused) {
          audio.play();
          // saat musik jalan, tampilkan ikon musik
          ikonMusik.classList.remove("fa-volume-mute");
          ikonMusik.classList.add("fa-music");
        } else {
          audio.pause();
          // saat pause, tampilkan ikon play
          ikonMusik.classList.remove("fa-music");
          ikonMusik.classList.add("fa-volume-mute");
        }
      }

      tombolMusik.addEventListener("click", toggleMusik);

      // Fungsi mulai musik otomatis setelah interaksi pertama
      function mulaiMusik() {
        audio.play();
        ikonMusik.classList.remove("fa-play");
        ikonMusik.classList.add("fa-pause");

        document.removeEventListener("click", mulaiMusik);
        document.removeEventListener("touchstart", mulaiMusik);
      }

      document.addEventListener("click", mulaiMusik);
      document.addEventListener("touchstart", mulaiMusik);
    });

//Animasi Gallery
const galleryItems = document.querySelectorAll('.gallery-animate');

const galleryObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('show');
      }, index * 800); // delay 200ms tiap gambar
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

galleryItems.forEach(item => galleryObserver.observe(item));

// Animasi Love Story
const storyItems = document.querySelectorAll('.story-animate');

const storyObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('show');
      }, index * 800); // delay 500ms per item
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

storyItems.forEach(item => storyObserver.observe(item));

// Observer untuk animasi RSVP
const rsvpCard = document.querySelector('.rsvp-animate');

const rsvpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); 
      rsvpObserver.unobserve(entry.target); // biar animasi sekali aja
    }
  });
}, { threshold: 0.10 });

if (rsvpCard) {
  rsvpObserver.observe(rsvpCard);
}

//Animasi Gift


// Animasi scroll (agar konten di panel right muncul)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

// Animasi scroll
function jalankanAnimasiScroll() {
  const scrollElements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    root: rightPanel,
    threshold: 0.1
  });

  scrollElements.forEach(el => observer.observe(el));
}

jalankanAnimasiScroll();
