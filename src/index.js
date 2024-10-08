var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "login", href: "/account/login" },
      { text: "sign up", href: "/account/signup" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

const topMenuEl = document.getElementById("top-menu");
//const divEl = document.createElement("div");
//const ulEl = document.createElement("ul");
//const formEl = document.createElement("form");

topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "rgb(14, 154, 167)"; //"var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

menuLinks.forEach((link) => {
    const myLink = document.createElement("a");
    myLink.setAttribute("href", link.href);
    myLink.setAttribute("id", "top-menu-link");
    myLink.textContent = link.text;
    topMenuEl.appendChild(myLink);
});

// Adding Menu Interation
const topMenuLinks = document.querySelectorAll("a");
console.log(topMenuLinks); // NodeList

topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.localName !== "a") {
    return;
  }

  // Log the content of the <a> to verify the handler is working
  console.log(event.target.text);
});

// Creating the Submenu
const subMenuEl = document.getElementById("sub-menu");

subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");

subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// Cache the "link" object for subLinks array
let subLinksArray = [];
for (let i = 1; i < menuLinks.length; i++) {
  subLinksArray[i] = menuLinks[i].subLinks;
}



  

