const catagory = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/categories`
    );
    const data = await res.json();
    catagoryContainer(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

const catagoryContainer = (catagoryData) => {
  const catagoryCon = document.getElementById("catagory-container");
  catagoryData.forEach((data) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <li class="my-1 lg:my-0 cursor-pointer" onclick="getDetails('${data.category_id}')">${data.category_name}</li>
        `;
    const spinnerBtn = document.getElementById("spinner-btn");
    spinnerBtn.classList.remove("hidden");
    getDetails(data.category_id);
    catagoryCon.appendChild(li);
  });
};

// Details
const getDetails = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${id}`
    );
    const data = await res.json();
    displayDetails(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayDetails = (details) => {
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = `
    <div class="items bg-slate-100 rounded container mx-auto mt-10 p-8">
     <h3 class="text-lg font-semibold">${details.length ? details.length : "No"} items found for category</h3>
    </div>
    `;

  const detailsContainer = document.getElementById("details-container");
  detailsContainer.textContent = " ";
  details.forEach((data) => {
    // console.log(data);
    const detailDiv = document.createElement("div");
    detailDiv.classList.add("col");
    detailDiv.innerHTML = `
      <div class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img class="object-cover w-screen h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      src="${data.thumbnail_url ? data.thumbnail_url : "No image found"
      }" alt="">
      <div class="flex flex-col justify-between p-4 leading-normal">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${data.title ? data.title : "Not found"
      }</h5>
    <p class="mb-8 font-normal text-gray-400 dark:text-gray-400">${data.details.slice(
        0,
        450
      )}</p>
    <div class="flex items-center justify-between pr-0 sm:pr-14">
     <div class="flex">
     <img class="object-cover w-12 h-12 rounded-full mr-2" src="${data.author.img
      }">
     <div>
         <h4 class="">${data.author.name}</h4>
         <small class="text-slate-400">${data.author.published_date}</small>
     </div>
     </div>
    <div class="flex items-center ">
        <i class="fa-solid fa-eye"></i>
        <h4 class="ml-2 font-semibold">${data.total_view ? data.total_view : "No view found"
      }</h4>
    </div>
    <button class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
    hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-blue-800 active:shadow-lg transition duration-150
    ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modals()"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
</div>
</div> `;
    const spinnerBtn = document.getElementById("spinner-btn");
    spinnerBtn.classList.add("hidden");
    detailsContainer.appendChild(detailDiv);
  });
};

getDetails();
catagory();
