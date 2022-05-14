// Function to fetch API endpoint. Converted from Curl to Fetch.
function fetchTrendingCoins() {
    return fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1", {
        headers: {
            Accept: "application/json"
        }
    })
    .then(resp => resp.json())
    .then(json => renderTrendingCoins(json));
    
}
console.log(json)
// Function to render top 7 trending coins on the DOM.
function renderTrendingCoins(coins) {
    
    const trendingResults = document.querySelector('#trendingResults');
    coins.forEach(coin => {

        const div = document.createElement('div')
        
        // div.className = 'list-group';
        // Must convert FROM innerHTML to textContent

        div.innerHTML = `
        <button type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalID" onclick="modalData()">
                <img src="${coin.item.image}" alt="">
            <div class="d-flex w-100 justify-content-between">
                    <h6 id="coinName" class="mb-1">${coin.item.name} (${coin.item.symbol})</h6>
                <small>Market Rank: ${coin.item.market_cap_rank}</small>
            </div>
            <small>Score: ${coin.item.score}</small>
        </button>
        `
        trendingResults.append(div);
        
    });
}


/*
Top search Function to search for coins based on user input. 
Must update code to work with new API endpoint
*/
const topSearch = () => {
    const topSearchForm = document.querySelector('#form-1');
    topSearchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const userInput = document.querySelector('input#searchCoinID');
  
        fetch(`https://api.coingecko.com/api/v3/search?query=${userInput.value}`, { 

                 headers: {
                    Accept: "application/json"
                 }
             })
                .then( response => response.json())
                .then(json => {
        
                    renderSearchCoins(json.coins)
                })
    });
}
// Top search Function END!
/*
Main search function to search for coins based on user input. 
Must update code to work with new API endpoint
*/
const mainSearch = () => {
    const mainSearchForm = document.querySelector('#form-2');
    mainSearchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const input = document.querySelector('input#searchCoinID2');
  
        fetch(`https://api.coingecko.com/api/v3/search?query=${input.value}`, { 

                 headers: {
                    Accept: "application/json"
                 }
             })
                .then( response => response.json())
                .then(json => {
                    renderSearchCoins(json.coins)
                })
    });
}
// Main search Function END!
// For search forms
document.addEventListener('DOMContentLoaded', topSearch);
document.addEventListener('DOMContentLoaded', mainSearch);

// Function to render search results
function renderSearchCoins(coins) {
    
    const searchResults = document.querySelector('#searchResults');
    coins.forEach(coin => {
       
        const div = document.createElement('div')
        // Must convert FROM innerHTML to textContent
        div.className = 'list-group';
        div.innerHTML = `
        <button type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalID" onclick="modalData()">
                <img src="${coin.thumb}">
            <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${coin.name} (${coin.symbol})</h6>
                <small>Market Cap Rank: ${coin.market_cap_rank}</small>
            </div>
        </button>
        `
        searchResults.appendChild(div);
    });
}

document.getElementById("modalButton").onclick = function() {modalData()};

function modalData() {
    const { 
        symbol,
        name,
        image, 
        current_price,
        market_cap_rank, 
        high_24h, 
        low_24h, 
    } = fetchData(info)[0]
    
    // const modalCoinImage = document.getElementById('modalCoinImage')
    // modalCoinImage.src = `${image}`

    const modalCoinTitle = document.getElementById('modalH5')
    modalCoinTitle.textContent = `
            ${name} (${symbol})
        `
    const marketCapRankTD = document.getElementById('marketCapRankTD')
        marketCapRankTD.textContent = `
            ${market_cap_rank}
        `
    const currentPriceTD = document.getElementById('currentPriceTD')
        currentPriceTD.textContent = `
            $${current_price}
        `
    const high24TD = document.getElementById('high24TD')
        high24TD.textContent = `
            $${high_24h}
        `
    const low24TD = document.getElementById('low24TD')
        low24TD.textContent = `
            $${low_24h}
        `
}
    function fetchData(info) {
        let arrayNames = info;
        let cat = arrayNames.filter(element => element.symbol.toLowerCase() === 'btc');
        return cat;
    }
    fetchData(info)

    // Create a fecth function and eventually remove the rest.
    // function fetchData(results) {
    //     let arrayNames = coins;
    //     let results = arrayNames.filter(element => element.symbol.toLowerCase() === Event);
    //     const coinName = document.querySelector('#coinName');
    //     coinName.addEventListener('click', (event) => {
    //         // event.preventDefault()
    //         // const buttonCard = document.querySelector('input#searchCoinID'); 
      
    //         fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y`, { 
    
    //                  headers: {
    //                     Accept: "application/json"
    //                  }
    //              })
    //                 .then( response => response.json())
    //                 .then(json => {
            
    //                     renderSearchCoins(json.coins)
    //                 })
    //     });  
    // } 
    // fetchData(results)

// Call fetchTrendingCoins function and fetch API on page load. 
document.addEventListener("DOMContentLoaded", function() {
    fetchTrendingCoins()
});