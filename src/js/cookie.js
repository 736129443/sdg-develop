// 封装cookie

const Cookie = {
   setCookie({name,value,expires,path='/',domain}) {

        let sCookie = name + '=' + encodeURIComponent(value);


        if(expires) {
            let oDate = new Date();

            oDate.setDate(oDate.getDate() + expires);

            sCookie += ';expires=' + oDate;
        }

        if(path) {
            sCookie += ';path=' + path;
        }
        if(domain) {
            sCookie += ';domain=' + domain;
        }

        document.cookie = sCookie;
    },
    removeCookie(name, path) {
        document.cookie = name + '=;expires=-1;path=' + path;
    },
    getCookie(name) {
        let sCookie = document.cookie;
        let aCookie = sCookie.split('; ');


        for(let i = 0; i < aCookie.length; i++) {
            let aTemp = aCookie[i].split('=');

            if(aTemp[0] === name) {
                return decodeURIComponent(aTemp[1]);
            }
        }
    }
};


export default Cookie;