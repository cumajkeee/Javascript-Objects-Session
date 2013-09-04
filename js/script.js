var SessionSaver = (function () {
    var session = {};
    var localSt = isLocalStorageAvailable();
    var cookie = isCookieAvailable();

    function isLocalStorageAvailable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    function isCookieAvailable (){
        return navigator.cookieEnabled;
    }

    session.save = function (key, value, lifetime) {
        if (lifetime === 'session'){
            if(localSt){
                sessionStorage.setItem(key,JSON.stringify(value));
                console.log('saved in session storage');
            }
            else if (cookie){
                document.cookie = key+"="+JSON.stringify(value)+"; path=/";
                console.log('saved in cookie');
            }
        }
        else if (!isNaN(lifetime)){
            if (cookie){
                if (lifetime) {
                    var date = new Date();
                    date.setTime(date.getTime()+(lifetime*24*60*60*1000));
                    var expires = "; expires="+date.toGMTString();
                }
                else {
                    var expires = "";
                }
                document.cookie = key+"="+JSON.stringify(value)+expires+"; path=/";
                console.log('saved in cookie');
            }
        }
        else if (lifetime === 'forever'){
            if(localSt){
                localStorage.setItem(key,JSON.stringify(value));
                console.log('saved in local storage');
            }
        }
    };

    session.get = function (key){
        var item;
        if(localSt){
            if(sessionStorage.getItem(key) !== null){
                item = sessionStorage.getItem(key);
            } else {
                item = localStorage.getItem(key);
            }
        } else {
            item = document.cookie.match(new RegExp(
                "(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
        }
        return item;
    };

    SessionSaver = function(key) {
        return session;
    };

    session.save('names', ['Vasya', 'Nastya', 'Kolya', 'Misha'], 'forever');
    console.log(session.get('names'));
})();