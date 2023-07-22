var movieListItems = document.getElementsByClassName('flex-column');
for (var i = 0; i < movieListItems.length; i++) {
  movieListItems[i].addEventListener('click', function() {
    var movieName = this.querySelector('h6').innerText;
    localStorage.setItem('MovieName', movieName);
  });
}

