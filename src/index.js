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

const mainEl = document.querySelector("main");
console.log(mainEl);

mainEl.style.backgroundColor = "rgb(209, 232, 226)";  //"var(--main-bg)";
mainEl.style.color = "var(--top-menu-bg)";
mainEl.style.flexDirection = "column";
//mainEl.innerHTML = "<h1>Contents</h1>";
mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById("top-menu");
//const divEl = document.createElement("div");
//const ulEl = document.createElement("ul");
//const formEl = document.createElement("form");

topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
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

// Create the array of <a> elements
let topMenuChildren = [];
for (let i = 0; i < topMenuEl.children.length; i++) {
  topMenuChildren.push(topMenuEl.children[i]);
}
console.log(topMenuChildren);

topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.localName !== "a") {
    return;
  }

  // Log the content of the <a> to verify the handler is working
  console.log(event.target.text);

  // Adding Submenu Interaction
  // Add a toggled "active" state to each menu item
  topMenuChildren.forEach((e) => {
    if (e !== event.target) {
      e.removeAttribute("class");
    }
  });

  if (event.target.hasAttribute("class")) {
    event.target.removeAttribute("class");
    //myFunction()
    mainEl.firstChild.innerText = "DOM Manipulation";
  } else {
    event.target.classList.add("active");
  }

  if (
    event.target === topMenuChildren[0] &&
    event.target.hasAttribute("class")
  ) {
    mainEl.innerHTML = "<h1>About</h1>";
    subMenuEl.style.top = "0";
  } else if (event.target !== topMenuChildren[0]) {
    event.target.setAttribute("subLinks", buildSubmenu(event.target.text));

    if (event.target.hasAttribute("class")) {
      subMenuEl.style.top = "100%";
    } else {
      subMenuEl.style.top = "0";
    }
  }

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

subMenuEl.addEventListener("click", (e) => {
  e.preventDefault();

  // Log the content of the <a> to verify the handler is working
  console.log(e.target.text);

  if (e.target.localName !== "a") {
    return;
  }

  let str = e.target.text.charAt(0).toUpperCase() + e.target.text.slice(1);
  subMenuEl.style.top = "0";

  // Remove the active class from each <a> element in topMenuLinks
  topMenuChildren.forEach((evt) => {
    evt.removeAttribute("class");
  });

  // Update the contents of mainEl, within an <h1>,
  // to the contents of the <a> element clicked within subMenuEl
  mainEl.firstChild.innerText = str;
});

// Create a helper function for the submenu bar
function buildSubmenu(texts) {
  // Clear the current contents of subMenuEl
  while (subMenuEl.firstChild) {
    subMenuEl.removeChild(subMenuEl.firstChild);
  }

  if (texts === "catalog") {
    let subLinks = subLinksArray[1];
    subLinks.forEach((link) => {
      const subLink = document.createElement("a");
      subLink.setAttribute("href", link.href);
      subLink.textContent = link.text;
      subMenuEl.appendChild(subLink);
    });
  } else if (texts === "orders") {
    let subLinks = subLinksArray[2];
    subLinks.forEach((link) => {
      const subLink = document.createElement("a");
      subLink.setAttribute("href", link.href);
      subLink.textContent = link.text;
      subMenuEl.appendChild(subLink);
    });
  } else if (texts === "account") {
    let subLinks = subLinksArray[3];
    subLinks.forEach((link) => {
      const subLink = document.createElement("a");
      subLink.setAttribute("href", link.href);
      subLink.textContent = link.text;
      subMenuEl.appendChild(subLink);
    });
  }
}


function createFrag(title, image) {
  // Creating a DocumentFragment
  const frag = document.createDocumentFragment();
  const heading = frag.appendChild(document.createElement("h1"));
  heading.textContent = title;
  
  frag.appendChild(document.createElement("hr"));

  const myImage = frag.appendChild(document.createElement("img"));

  myImage.style.width = "50%";
  myImage.style.height ="50%";
  myImage.src = image;

  return frag;
}

async function myFunction() {
  const images = [
    { "title": "Unlocked", "src": "images/unlocked.jpg" }];

  images.forEach((image) => {
    mainEl.appendChild(createFrag(image.title, image.src));
  })
}

myFunction().then(images.forEach((image) => {
  mainEl.appendChild(createFrag(image.title, image.src));
}));


/* (async () => {
  const images = [
    { "title": "Unlocked", "src": "images/unlocked.jpg"}];
   /*  { "title": "parasit", "src": "image/unlocked.jpg"},
    { "title": "Unlocked", "src": "image/unlocked.jpg"}
  ];
 
    images.forEach((image) => {
      mainEl.appendChild(createFrag(image.title, image.src));
    })
})();
*/
