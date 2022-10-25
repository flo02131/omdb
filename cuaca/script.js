// jquery

// $('.tombol').on('click', function(){

//     $.ajax({
//         url : 'https://www.omdbapi.com/?apikey=4fe3c0c&s=' + $('.input').val(),
//         success : (results) => {
//             let data = results.Search
//             let str = ''

//             for (const x of data) {
//                 str += Lists(x)                        
//             }

//             // data.forEach(x => {
//             //     str += Lists(x)        
//             // });
//             $('.cards').html(str)
        
//             $('.modal-button').on('click', function(){
//                 $.ajax({
//                     url : 'https://www.omdbapi.com/?apikey=4fe3c0c&i=' + $(this).data('imdb'),
//                     success : (e) => {
//                         let detaildata = MovieDetail(e)

//                         $('.modal-body').html(detaildata)
//                     },
//                     error : (a) => console.log(a.responseText)
//                 })
//             })
//         },
//         error : (e) => {
//             console.log(e.responseText)
//         }
//     })
    

// })

function Lists(x) {
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


// const tbutton = document.querySelector('.tombol')
// tbutton.addEventListener('click', function(){
//     let inputdata = document.querySelector('.input')

//     fetch('https://www.omdbapi.com/?apikey=4fe3c0c&s=' + inputdata.value)
//     .then(response => response.json())
//     .then(response => {
//         let data = response.Search
//         let loop = ''
//         for (const x of data) {
//             loop += Lists(x)
//         }
//         let card = document.querySelector('.cards')
//         card.innerHTML = loop

//         let sdetail = document.querySelectorAll('.modal-button')
//         sdetail.forEach(e => {
//             e.addEventListener('click', function(){
//                 let detail = this.dataset.imdb                
//                 fetch('https://www.omdbapi.com/?apikey=4fe3c0c&i=' + detail)
//                 .then(response => response.json())
//                 .then(e => {
//                     let show = MovieDetail(e)
//                     let modaldetail = document.querySelector('.modal-body')
//                     modaldetail.innerHTML = show
//                 })

//             })
//         });
//     })
//     .catch(err => {
//         document.write(`${err.status}`)
//         console.log(`${err.status}`)
//     })

// })


const tbutton = document.querySelector('.tombol')
tbutton.addEventListener('click', async function(){
    let inputdata = document.querySelector('.input')
    let getlist = await Movies(inputdata.value)
    await Shwfilm(getlist)
})

// document.addEventListener('click', function(e){
//     if (e.target.classlist.contains('.modal-button')) {
//         alert('ok')
//     }
// })

function Movies(iuser) {
    return fetch('https://www.omdbapi.com/?apikey=4fe3c0c&s=' + iuser)
    .then(response => response.json())
    .then(response => response.Search)
}

function Shwfilm(getlist) {
    let loop = ''
    for (const x of getlist) {
        loop += Lists(x)
    }
    let card = document.querySelector('.cards')
    card.innerHTML = loop
}