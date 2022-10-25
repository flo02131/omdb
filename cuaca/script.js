const tbutton = document.querySelector('.tombol')
tbutton.addEventListener('click', async function(){
    try {
        let userinput = document.querySelector('.input')
        let data = await GetApiFilm(userinput.value)
        LoopListFillm(data)              
    } catch (err) {
        alert(err)
        console.error(err)
    }
})

function GetApiFilm(input) {
    return fetch('https://www.omdbapi.com/?apikey=4fe3c0c&s=' + input)
            .then(response => {
                if (response.ok !== true) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(response => {
                if (response.Response === "False") {
                    throw new Error(response.Error)
                }
                return response.Search
            })
}

function LoopListFillm(data) {
    let str = ''
    for (const x of data) {
        str += MovieList(x)
    }
    let card = document.querySelector('.cards')
    card.innerHTML = str

}

function MovieList(x) {
    return ` <div class="col-md-4 my-5">
                <div class="card">
                    <img src="${x.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${x.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${x.Year}</h6>                  
                    <a href="#" class="btn btn-primary modal-button" data-bs-toggle="modal" data-bs-target="#tombolModal" data-imdb="${x.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`           
}

document.addEventListener('click', async function(e){
    if (e.target.classList.contains('modal-button')) {
        try {
            let imdb = e.target.dataset.imdb
            let datadetails = await GetDetailsApi(imdb)
            GetInfoDetails(datadetails)                
        } catch (err) {
            alert(err)
            console.error(err)
        }
    }
})

function GetDetailsApi(imdb) {
    return fetch('https://www.omdbapi.com/?apikey=4fe3c0c&i=' + imdb)
            .then(response => {
                if (response.ok === false) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(response => response)
}

function GetInfoDetails(e) {
    let info = MovieDetail(e)
    let btninfo = document.querySelector('.modal-body')
    btninfo.innerHTML = info
}

function MovieDetail(e) {
    return `<div class="row">
                <div class="col-md-3">
                    <img src="${e.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Title : ${e.Title}</strong> <strong>(${e.Year})</strong></li>
                        <li class="list-group-item"><strong>Director : </strong>${e.Director}</li>
                        <li class="list-group-item"><strong>Actor : </strong>${e.Actors}</li>
                        <li class="list-group-item"><strong>Writer : </strong>${e.Writer}</li>
                        <li class="list-group-item"><strong>Plot : </strong>${e.Plot}</li>
                    </ul>           
                </div>
            </div>`
}
