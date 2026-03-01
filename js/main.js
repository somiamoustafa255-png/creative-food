const rowBody = document.getElementById("rowBody");
const btns = document.querySelectorAll(".nav-link");
const loading = document.getElementById("loading");

// دالة فتح/قفل الـ sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");

  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("expanded");
}

// دالة جلب الوجبات من الـ API
async function getMeals(query = "pizza") {
  try {
    loading.classList.remove("d-none");

    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    let data = await response.json();
    let meals = data.recipes;

    display(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    rowBody.innerHTML = `<div class="col-12 text-center text-danger">
      <h4>⚠️ حصل خطأ في تحميل البيانات</h4>
    </div>`;
  } finally {
    loading.classList.add("d-none");
  }
}

// دالة عرض الوجبات
function display(arr) {
  let box = "";
  arr.forEach(meal => {
    box += `
      <div class="col-md-3 col-sm-6 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${meal.image_url}" class="card-img-top" alt="${meal.title}" />
          <div class="card-body">
            <h6 class="card-title">${meal.title}</h6>
            <a href="${meal.source_url}" target="_blank" class="btn btn-warning btn-sm">View Recipe</a>
          </div>
        </div>
      </div>`;
  });

  rowBody.innerHTML = box || `<div class="col-12 text-center"><h5>لا يوجد نتائج</h5></div>`;
}

// ربط الضغط على عناصر القائمة بالبحث
btns.forEach(btn => {
  btn.addEventListener("click", e => {
    let mealName = e.target.innerText.trim().toLowerCase();
    getMeals(mealName);
  });
});

// تحميل أول وجبة افتراضيًا
getMeals();
