class Nav {
    homeNav = document.querySelector("#home");
    productsNav = document.querySelector("#products");
    aboutNav = document.querySelector("#about");
    teacherNav = document.querySelector("#teacher");
    cssLink = document.querySelector("#siteCss");

    homePressed(){
        this.homeNav.classList.add("navPressed");
        this.productsNav.classList.remove("navPressed")
        this.aboutNav.classList.remove("navPressed");
        this.teacherNav.classList.remove("navPressed");

        this.cssLink.href = "/PlayTable/src/css/index.css";
    }

    productsPressed(){
        this.homeNav.classList.remove("navPressed");
        this.productsNav.classList.add("navPressed")
        this.aboutNav.classList.remove("navPressed");
        this.teacherNav.classList.remove("navPressed");

        this.cssLink.href = "/PlayTable/src/css/produtos.css";
    }

    aboutPressed(){
        this.homeNav.classList.remove("navPressed");
        this.productsNav.classList.remove("navPressed")
        this.aboutNav.classList.add("navPressed");
        this.teacherNav.classList.remove("navPressed");

        this.cssLink.href = "/PlayTable/src/css/sobre.css";
    }

    teacherPressed(){
        this.homeNav.classList.remove("navPressed");
        this.productsNav.classList.remove("navPressed")
        this.aboutNav.classList.remove("navPressed");
        this.teacherNav.classList.add("navPressed");

        this.cssLink.href = "/PlayTable/src/css/professor.css";
    }

    scrollWhere(coord){
        window.scroll({
            top: 0
        });
        window.scroll({
            top: coord,
            behavior: "smooth"
        });    
    }
}

class Rounter extends Nav{
    
    nav = new Nav();

    routes = {}
    
    add(routeName, page){
        this.routes[routeName] = page;
    }

    //Captura o link que foi pressionado e passa para o handle
    route(ev){
        ev = ev || window.event
        ev.preventDefault()
    
        window.history.pushState({}, "", ev.target.href)
        this.handle();
    }

    handle(){
        const {pathname} = window.location;
        const route = this.routes[pathname] || this.routes[404];
        if(pathname == "/PlayTable/"){
            this.nav.homePressed();
        }
        if(pathname == "/products"){
            this.nav.productsPressed();
        }        
        if(pathname == "/Cartas"){
            this.nav.productsPressed();
            this.nav.scrollWhere(480)
        }
        if(pathname == "/Casual"){
            this.nav.productsPressed();
            this.nav.scrollWhere(920)
        }
        if(pathname == "/Classics"){
            this.nav.productsPressed();
            this.nav.scrollWhere(1360)
        }
        if(pathname == "/RPG"){
            this.nav.productsPressed();
            this.nav.scrollWhere(2940);
        }
        if(pathname == "/about"){
            this.nav.aboutPressed();
        }        
        if(pathname == "/teacher"){
            this.nav.teacherPressed();
        }
    
        //Promessa de buscar o route em que cliquei e exibir o conteúdo
        fetch(route)
        .then(data => data.text())
        .then(contentHtml => {
            document.querySelector("#page").innerHTML = contentHtml;
        });
    }
}

const router = new Rounter();
router.add("/PlayTable/", "/PlayTable/src/pages//home.html");
router.add("/products", "/PlayTable/src/pages/produtos.html");

router.add("/Cartas", "/PlayTable/src/pages/produtos.html");
router.add("/Casual", "./PlayTable/src/pages/produtos.html");
router.add("/Classics", "./PlayTable/src/pages/produtos.html");
router.add("/RPG", "./PlayTable/src/pages/produtos.html");

router.add("/about", "/PlayTable/src/pages/sobre.html");
router.add("/teacher", "/PlayTable/src/pages/professor.html");
router.add(404, "./src/pages/404.html");

router.handle();
window.onpopstate = () => router.handle();
window.route = () => router.route();
