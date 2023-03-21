;(function() { 
    // Gets articles data
    function loadData() {
        let file = 'data/articles.json';
        
        fetch(file)
          .then((response) => response.json())
          .then((data) => {
            setArticleHeadline(data.headlines);
        });
    }
    
    // Sets article headline
    function setArticleHeadline(headlines) {
        let defaultHeadline = 'A second look at war themed railway models';
        let el = document.getElementById('article-headline');
        let location = document.location.href;
        let queryParam = location.split('?')[1];
        // Gets the headline from query param
        let headline = queryParam ? queryParam.split('=')[1] : null;
        
        if (headline && headlines[headline]) {
            el.innerHTML = headlines[headline];
        } else {
            el.innerHTML = defaultHeadline;
        }
    }
        
    window.addEventListener('load', loadData, false);
}());
