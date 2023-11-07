(function() {
    // list of classNames to remove
    var removeList = [
        'structured-content__group--commercial',
        'group-topic-with-custom-header--NEW_rus_tvnet_generic_color',
        'article-body__item--teaser'
    ]

    // let page load before triggering cleanup
    setTimeout(() => {
        removeAddblockStuff();
        observeAndRemove(removeList);
    }, 500);

})();

// function which observes page for provided classNames and removes them
function observeAndRemove(removeList) {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                for (var classToRemove of removeList) {
                    var elementToRemove = document.getElementsByClassName(classToRemove);
                    if (elementsToRemove.length > 0) {
                        for (var eleToremove of elementToRemove) {
                            eleToremove.parentNode.removeChild(eleToremove);
                        }
                    }
                }
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

// Function which removes addblock related stuff
function removeAddblockStuff() {
    var elems = document.getElementsByClassName(document.body.className.split(' ')[0]);
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                elems[0].style.overflow = '';
                // also remove adblock message
                var adblock = document.getElementsByClassName('ad-block-piano');
                while(adblock[0]) {
                    adblock[0].parentNode.removeChild(adblock[0]);
                }
                // remove observer once adblock things have been removed
                observer.disconnect();
            }
        });
    });
    for(let i = 0; i < elems.length; i++) {
        observer.observe(elems[i], { attributes: true });
    }
}
