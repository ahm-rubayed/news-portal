const catagory = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then (res => res.json())
    .then (data => catagoryContainer(data.data.news_category))
}

const catagoryContainer = (catagoryData) => {
    const catagoryCon = document.getElementById('catagory-container');
    catagoryData.forEach(data => {
        console.log(data);
        const li = document.createElement('li');
        li.innerHTML = `
        <li class="my-1 lg:my-0 cursor-pointer">${data.category_name}</li>
        `

        catagoryCon.appendChild(li);
    })
}

catagory();