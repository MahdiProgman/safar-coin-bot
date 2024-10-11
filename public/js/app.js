const clicker = document.getElementById('clicker');
const score = document.getElementById('score');

if(localStorage.getItem('safarCoin')){
    score.innerText = JSON.parse(localStorage.getItem('safarCoin')).score;
}

clicker.addEventListener('click', (e)=> {
    if(!clicker.classList.contains('zoom')){
        clicker.classList.add('zoom');
        setTimeout(()=> clicker.classList.remove('zoom'), 50);
    }
    localStorage.setItem('safarCoin', JSON.stringify({score : localStorage.getItem('safarCoin') ? JSON.parse(localStorage.getItem('safarCoin')).score + 1 : 1}));
    score.innerText = JSON.parse(localStorage.getItem('safarCoin')).score;
});