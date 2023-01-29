// initialize page after HTML loads
window.onload = function() {
  closeLightBox();  // close the lightbox because it's initially open in the CSS
  document.getElementById("button").onclick = function () {
    searchTvShows();
  };
  document.getElementById("lightbox").onclick = function () {
    closeLightBox();
  };
} // window.onload








// get data from TV Maze
function searchTvShows() {
 document.getElementById("main").innerHTML = "";


 var search = document.getElementById("search").value;  
 
 fetch('http://api.tvmaze.com/search/shows?q=' + search)
   .then(response => response.json())
   .then(data => showSearchResults(data)
   );
} // window.onload






// change the activity displayed
function showSearchResults(data) {
 // show data from search
 console.log(data);


 // show each tv show from search results in webpage
 for (let tvshow in data) {
   createTVShow(data[tvshow]);
 } // for








} // showSearchResults






// in the json, genres is an array of genres associated with the tv show
// this function returns a string of genres formatted as a bulleted list
function showGenres(genres) {
  var g;
  var output = "<ul>";
  for (g in genres) {
     output += "<li>" + genres[g] + "</li>";
  } // for      
  output += "</ul>";
  return output;
} // showGenres




// constructs one TV show entry on webpage
function createTVShow (tvshowJSON) {


   // get the main div tag
   var elemMain = document.getElementById("main");
 
   // create a number of new html elements to display tv show data
   var elemDiv = document.createElement("div");
   elemDiv.setAttribute("class", "showdiv");
   var elemImage = document.createElement("img");
 
   var elemShowTitle = document.createElement("h2");
   elemShowTitle.classList.add("showtitle"); // add a class to apply css
 
   var elemGenre = document.createElement("div");
   var elemRating = document.createElement("div");
   var elemSummary = document.createElement("div");
 
   // add JSON data to elements
   elemImage.src = tvshowJSON.show.image.medium;
   elemShowTitle.innerHTML = tvshowJSON.show.name;
   elemGenre.innerHTML = "Genres: " + showGenres(tvshowJSON.show.genres);
   elemRating.innerHTML = "Rating: " + tvshowJSON.show.rating.average;
   elemSummary.innerHTML = tvshowJSON.show.summary;
 
     
   // add 5 elements to the div tag elemDiv
   elemDiv.appendChild(elemShowTitle);  
   elemDiv.appendChild(elemGenre);
   elemDiv.appendChild(elemRating);
   elemDiv.appendChild(elemSummary);
   elemDiv.appendChild(elemImage);
 
   // get id of show and add episode list
   var showId = tvshowJSON.show.id;
   fetchEpisodes(showId, elemDiv);
 
   // add this tv show to main
   elemMain.appendChild(elemDiv);
 


   //styles
   elemDiv.style.display = "inline-block"
   //summary
   elemSummary.id = "summary";
  //  elemSummary.style.display = "inline-block"
  //  elemSummary.style.fontFamily = "'Exo 2', sans-serif"
  //  elemSummary.style.maxWidth = "200px"
   
//image
  elemImage.id = "image";
  //  elemImage.style.display = "inline-block"
  //  elemImage.style.paddingLeft = "40px"
  //  elemImage.style.height = "500px"
//rating
  elemRating.id = "rating";


  //  elemRating.style.fontFamily = "'Exo 2', sans-serif"
//genre
  //  elemGenre.style.fontFamily = "'Exo 2', sans-serif"
  elemGenre.id = "genre";
   


} // createTVShow




// fetch episodes for a given tv show id
function fetchEpisodes(showId, elemDiv) {
   
 console.log("fetching episodes for showId: " + showId);


 fetch('http://api.tvmaze.com/shows/' + showId + '/episodes')  
   .then(response => response.json())
   .then(data => showEpisodes(data, elemDiv));
 
} // fetch episodes






function displayEpisode(tvshowJSON){
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("libImage").src = tvshowJSON.image.medium;
  document.getElementById("libName").innerHTML = tvshowJSON.name;
  document.getElementById("libSummary").innerHTML = tvshowJSON.summary
}


function showEpisodes (data, elemDiv) {


   // print data from function fetchEpisodes with the list of episodes
   var episodeList = document.createElement("ol");
  for(let episode of data) {
    var episodeItem = document.createElement("li");
    episodeItem.innerHTML = episode.name;
    episodeItem.addEventListener("click", function(){
      displayEpisode(episode);
    });
    episodeList.appendChild(episodeItem);
  }
  elemDiv.appendChild(episodeList);
  }
   


fetch('https://api.tvmaze.com/episodes/' + episodeId)  
    .then(response => response.json())
    .then(data => showLightBox(data, elemDiv));


// open lightbox and display episode info
function showLightBox(episodeId){
    document.getElementById("lightbox").style.display = "block";
   
    // show episode info in lightbox
    document.getElementById("message").innerHTML = "<h3>The episode unique id is " + episodeId + "</h3>";
    document.getElementById("message").innerHTML += "<p>Your job is to make a fetch for all info on this"  
    + " episode and then to also show the episode image, name, season, number, and description.</p>";






} // showLightBox




// close the lightbox
function closeLightBox(){
    document.getElementById("lightbox").style.display = "none";
} // closeLightBox








