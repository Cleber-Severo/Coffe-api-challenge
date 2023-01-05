/*  ---setting Global variables---   */
const card = document.querySelector('.card-container')


/*  function to load the API data  */
async function getAPI () {
    try {
        const url = await fetch('https://api.sampleapis.com/coffee/hot')
        let coffeList = await url.json()
        console.log(coffeList)

    //creating a card to all itens on the array by calling tue function
        coffeList.map(coffe => showCards(coffe)) 

    } catch (error) {
     alert('Cannot load API')    
    }
}

/*  Function that create all HTML DOM tags that holds and display the API info  */
function showCards (coffe) {
    const cardContent = document.createElement('div') 
        
    const divTitle = document.createElement('h3')
    divTitle.classList.add(
            'font-bold',
            'text-lg',
            'text-yellow-900',
            'mb-2'
        ) 
    divTitle.textContent = coffe.title;

    const divDescription = document.createElement('p') 
    divDescription.textContent = `Description: ${coffe.description}`
    divDescription.classList.add(
                'my-2',
                'leading-5',
                'text-sm',
                'text-justify',
                'text-slate-900',
                'font-semibold'
            )
    
    const divImg = document.createElement('img')
    divImg.classList.add(
            'h-60',
            'rounded', 
            'w-60'
        )
    divImg.setAttribute('src', coffe.image)

    const divIngredients = document.createElement('p')
    divIngredients.textContent = "Ingredients: "
    
    coffe.ingredients.map(ingredient => {
        const divIngredient = document.createElement('small')
        divIngredient.textContent = `${ingredient}, `
        divIngredients.appendChild(divIngredient)
    })    


    cardContent.appendChild(divTitle)
    cardContent.appendChild(divImg)
    cardContent.appendChild(divIngredients)
    cardContent.appendChild(divDescription)
    cardContent.classList.add(
            'p-10', 
            'bg-yellow-800',
            'bg-opacity-80', 
            'rounded-xl', 
            'flex',
            'flex-col', 
            'justfy-center', 
            'items-center'
        )
    
    console.log(coffe.ingredients)
    
    card.appendChild(cardContent)
    
}

getAPI()


