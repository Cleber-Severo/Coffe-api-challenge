const button = document.getElementById('btn')
let coffeItens; 

async function getAPI () {
    try {
        const url = await fetch('https://api.sampleapis.com/coffee/hot')
        let coffeList = await url.json();
        console.log(coffeList)
        coffeItens = coffeList;
    } catch (error) {
        
    }
}

getAPI();

button.addEventListener('click', () => {
    coffeItens.map((coffe => {
        console.log(coffe.title);
    }))

    //showCard();
})



