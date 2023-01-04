const button = document.getElementById('btn')
const card = document.querySelector('.card-container');
let coffeItens; 

async function getAPI () {
    try {
        const url = await fetch('https://api.sampleapis.com/coffee/hot')
        let coffeList = await url.json();
        console.log(coffeList)
        // console.log(coffeList[0])
        // console.log(coffeList[0].image)
        coffeItens = coffeList;

    } catch (error) {
        
    }
}


getAPI();

button.addEventListener('click', () => {
    coffeItens.map((coffe => {
        console.log(coffe);
        console.log(coffe.image);

        const cardContent = document.createElement('div') 
        
        const divTitle = document.createElement('h3') 
        divTitle.textContent = coffe.title;

        const divDescription = document.createElement('p') 
        divDescription.textContent = coffe.description;

        const divImg = document.createElement('img')
        divImg.classList.add('h-40')
        divImg.setAttribute('src', coffe.image);

        cardContent.appendChild(divTitle)
        cardContent.appendChild(divDescription)
        cardContent.appendChild(divImg)
        cardContent.classList.add('mb-20', 'p-10', 'bg-gray-200', 'rounded-xl');
        console.log(cardContent);
        card.appendChild(cardContent)
        card.classList.add('p-10');
        
       
    }))

    
})



