// const tbutton = document.querySelector('.tombol')
// tbutton.addEventListener('click', async function(){
//     try {
//         let inputuser = document.querySelector('.input')
//         let dataapi = await GetFilmData(inputuser.value)
//         LoopHasil(dataapi)            
//     } catch (err) {
//         alert(err)
//         console.log(err)
//     }
// })

// document.addEventListener('click', async function(e){
//     if (e.target.classList.contains('modal-button')) {
//         try {
//             let imdb = e.target.dataset.imdb
//             let detailfilm = await GetDetailData(imdb)
//             GetIdDetails(detailfilm)                        
//         } catch (err) {
//             alert(err)
//             console.log(err)
//         }
//     }
// })

// function GetFilmData(inputan) {
//     return fetch('https://www.omdbapi.com/?apikey=4fe3c0c&s=' + inputan)
//     .then(response => {
//         if (response.ok !== true) {
//             throw new Error(response.statusText)            
//         } 
//             return response.json()               
//     })
//     .then(response => {
//         if (response.Response === "False") {
//             throw new Error(response.Error)
//         }
//         return response.Search;
//     })
// }

// function LoopHasil(dataapi) {
//     let str = ''
//     for (const x of dataapi) {
//         str += Lists(x)
//     }
//     let card = document.querySelector('.cards')
//     card.innerHTML = str
// }

// function Lists(x) {
//     return ` <div class="col-md-4 my-5">
//                 <div class="card">
//                     <img src="${x.Poster}" class="card-img-top">
//                     <div class="card-body">
//                     <h5 class="card-title">${x.Title}</h5>
//                     <h6 class="card-subtitle mb-2 text-muted">${x.Year}</h6>                  
//                     <a href="#" class="btn btn-primary modal-button" data-bs-toggle="modal" data-bs-target="#tombolModal" data-imdb="${x.imdbID}">Show Details</a>
//                     </div>
//                 </div>
//             </div>`           
// }

// function GetDetailData(imdb) {
//     return fetch('https://www.omdbapi.com/?apikey=4fe3c0c&i=' + imdb)
//             .then(response => {
//                 if (response.ok !== true) {
//                     throw new Error (response.statusText)
//                 }
//                 return response.json()
//             })
//             .then(e => e)
// }

// function GetIdDetails(e) {
//     let updateui = MovieDetail(e)
//     let show = document.querySelector('.modal-body')
//     show.innerHTML = updateui
// }

// function MovieDetail(e) {
//     return `<div class="row">
//                 <div class="col-md-3">
//                     <img src="${e.Poster}" class="img-fluid">
//                 </div>
//                 <div class="col-md">
//                     <ul class="list-group">
//                         <li class="list-group-item"><strong>Title : ${e.Title}</strong> <strong>(${e.Year})</strong></li>
//                         <li class="list-group-item"><strong>Director : </strong>${e.Director}</li>
//                         <li class="list-group-item"><strong>Actor : </strong>${e.Actors}</li>
//                         <li class="list-group-item"><strong>Writer : </strong>${e.Writer}</li>
//                         <li class="list-group-item"><strong>Plot : </strong>${e.Plot}</li>
//                     </ul>           
//                 </div>
//             </div>`
// }
































const tbutton = document.querySelector('.tombol')
tbutton.addEventListener('click', async function(){
    try {
        let userinput = document.querySelector('.input')
        let data = await GetApiFilm(userinput.value)
        LoopCardFilm(data)            
    } catch (err) {
        alert(err)
        console.log(err)
    }
})

function GetApiFilm(inputkey) {
    return  fetch('https://www.omdbapi.com/?apikey=4fe3c0c&s=' + inputkey)
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

function LoopCardFilm(data) {
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
            let datadetails = await GetApiFilmDetails(imdb)
            GetDataFilms(datadetails)                            
        } catch (err) {
            alert(err)
            console.log(err)            
        }
    }
})

function GetApiFilmDetails(imdbid) {
    return fetch('https://www.omdbapi.com/?apikey=4fe3c0c&i=' + imdbid)
            .then(response => {
                if (response.ok === false) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(response => response)
}

function GetDataFilms(e) {
    let uiDetail =  MovieDetail(e)
    let isidetail = document.querySelector('.modal-body')
    isidetail.innerHTML = uiDetail
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
