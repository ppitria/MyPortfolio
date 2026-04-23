/* ==========================================================================
   SIDEBAR & NAVBAR
   ========================================================================== */
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Buka/Tutup Sidebar saat hamburger diklik
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Tutup Sidebar saat area gelap (overlay) diklik
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Tutup Sidebar otomatis saat salah satu menu diklik
document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});

/* ==========================================================================
   CONTENT
   ========================================================================== */
// Inisialisasi Supabase
const supabaseUrl = "https://uaazcdwnzwcnoiskeipe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYXpjZHduendjbm9pc2tlaXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MTQ2MTcsImV4cCI6MjA4ODA5MDYxN30.fWNDN_V7z5NidkNP1dBvyy7cuWB-7GUJSI3yo9BBTHA";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

/* ==========================================================================
   PENGATURAN HALAMAN (ROUTER)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Halaman Beranda (index)
  const projectList = document.getElementById("project-list");
  if (projectList) {
    renderProjects();
  }

  // Halaman Detail Project (detail_project)
  const detailContainer = document.getElementById("project-detail-content");
  if (detailContainer) {
    renderProjectDetail();
  }

  // Halaman About bagian List Course (about)
  const listCourse = document.getElementById("list-course");
  if (listCourse) {
    renderListCourse();
  }

  // Halaman About bagian Tentang Saya (about)
  const aboutMe = document.getElementById("aboutme");
  if (aboutMe) {
    renderAboutMe();
  }
});

/* ==========================================================================
   HALAMAN BERANDA (HOME)
   ========================================================================== */
async function renderProjects() {
  const { data: projects, error } = await supabaseClient
    .from("project")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error:", error);
    return;
  }

  const container = document.getElementById("project-list");
  container.innerHTML = ""; // Hapus ikon loading

  // Looping untuk membuat Card Project
  projects.forEach((proj) => {
    const projectItem = `
      <div class="project-item">
          <img src="${proj.img_url}" alt="${proj.title}" />
          <div class="project-text">
              <h3 class="header-3">${proj.title}</h3>
              <p>${proj.short_desc}</p>
              <div class="btn-left-container">
                  <a href="detail_project.html?id=${proj.id}" class="btn-left">View Detail</a>
              </div>
          </div>
      </div>
    `;
    container.innerHTML += projectItem;
  });
}

/* ==========================================================================
   HALAMAN DETAIL PROJECT
   ========================================================================== */
async function renderProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  // Jika tidak ada ID di URL, hentikan proses
  if (!projectId) return;

  const { data: proj, error } = await supabaseClient
    .from("project")
    .select("*")
    .eq("id", projectId)
    .single();

  // Loading
  const spinner = document.querySelector(
    "#project-detail-content .loading-spinner",
  );
  if (spinner) {
    spinner.remove(); // Ini akan menghapus ikon muter-muter setelah loading selesai
  }

  // ERROR
  if (error) {
    console.error("Error ambil detail project:", error);
    document.getElementById("proj-title").innerText = "Proyek tidak ditemukan";
    return;
  }

  // Detail
  document.title = `${proj.title} | Portfolio`;
  document.getElementById("proj-title").innerText = proj.title;
  document.getElementById("proj-short-desc").innerText = proj.short_desc || "";

  document.getElementById("proj-desc").innerHTML = `
      <p>${proj.desc}</p> <br>
      <strong>Tools: ${proj.tools}</strong>
  `;

  // PDF
  document.getElementById("proj-media-container").innerHTML = `
      <iframe src="${proj.pdf_url}" width="100%" height="500px"></iframe>
      <br>
  `;

  // List Learned
  if (proj.list_learned && Array.isArray(proj.list_learned)) {
    const listHtml = proj.list_learned
      .map((point) => `<li>${point}</li>`)
      .join("");

    document.getElementById("proj-list-learned").innerHTML = `
      <br>
      <ul>
        <strong>Dari proyek ini saya belajar:</strong>
        ${listHtml}
      </ul>
  `;
  }
}

/* ==========================================================================
   HALAMAN ABOUT
   ========================================================================== */
// Bagian Tentang Saya
async function renderAboutMe() {
  const { data: abouts, error } = await supabaseClient
    .from("about")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error:", error);
    return;
  }

  const containerAbout = document.getElementById("aboutme");
  containerAbout.innerHTML = ""; // Hapus ikon loading

  abouts.forEach((ab) => {
    const aboutM = `
    <p>${ab.bio_text}</p>
    `;
    containerAbout.innerHTML += aboutM;
  });
}

// Bagian List Course
async function renderListCourse() {
  const { data: courses, error } = await supabaseClient
    .from("course")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error:", error);
    return;
  }

  const containerCourse = document.getElementById("list-course");
  containerCourse.innerHTML = ""; // Hapus ikon loading

  courses.forEach((cors) => {
    const courseItem = `

      <div class="card-course">
        <div class="img-course">
          <img src="${cors.certificate_url}" alt="${cors.course_name}" />
        </div>
        <div class="detail-course">
          <p class="name-course">${cors.course_name}</p>
          <p class="provider-course">${cors.provider}</p>
          <p class="year-course">${cors.year}</p>
        </div>
      </div>
    `;
    containerCourse.innerHTML += courseItem;
  });
}
