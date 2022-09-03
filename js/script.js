const catagory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => catagoryContainer(data.data.news_category));
};

const catagoryContainer = (catagoryData) => {
  const catagoryCon = document.getElementById("catagory-container");
  catagoryData.forEach((data) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <li class="my-1 lg:my-0 cursor-pointer" onclick="getDetails('${data.category_id}')">${data.category_name}</li>
        `;
    catagoryCon.appendChild(li);
  });
};

// Details
const getDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

const displayDetails = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = ' ';
    details.forEach(data => {
        console.log(data)
        const detailDiv = document.createElement('div')
        detailDiv.classList.add('col')
        detailDiv.innerHTML = `

    <a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    src="${data.author.img}" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${data.author.name}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</div>
</a> `;
detailsContainer.appendChild(detailDiv)
    })

}

// displayDetails()
getDetails()
catagory();
displayDetails('')
