const button = document.getElementById('btn')
const card = document.querySelector('.card-container');
let coffeItens; 

async function getAPI () {
    try {
        const url = await fetch('https://api.sampleapis.com/coffee/hot')
        let coffeList = await url.json();
        console.log(coffeList)
        coffeItens = coffeList;

        coffeList.map(coffe => showCards(coffe))

        //showCards();

    } catch (error) {
        
    }
}

function showCards (coffe) {
    const cardContent = document.createElement('div') 
        
    const divTitle = document.createElement('h3') 
    divTitle.textContent = coffe.title;

    const divDescription = document.createElement('p') 
    divDescription.textContent = coffe.description;

    const divImg = document.createElement('img')
    divImg.classList.add('h-60', 'w-60')
    divImg.setAttribute('src', coffe.image);

    cardContent.appendChild(divTitle)
    cardContent.appendChild(divImg)
    cardContent.appendChild(divDescription)
    cardContent.classList.add('p-10', 'bg-gray-200', 'rounded-xl', 'flex','flex-col', 'justfy-center', 'items-center');
    console.log(cardContent);
    card.appendChild(cardContent)
    card.classList.add('p-10');
    
}

getAPI();


