var menuLinks = [
  { text: "about", href: "/about" },
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
];

const mainEl = document.querySelector("main");
const formContainer = mainEl.firstElementChild;
const loginForm = document.getElementById("login");
const userInput = loginForm.elements["username"];
const passwordInput = loginForm.elements["password"];
const persistCheckbox = loginForm.elements["persist"];
//console.log(mainEl);

mainEl.style.backgroundColor = "rgb(209, 232, 226)";  //"var(--main-bg)";
mainEl.style.color = "var(--top-menu-bg)";
mainEl.style.flexDirection = "column";
mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById("top-menu");

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
//console.log(topMenuChildren); // Array: length=4

topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.localName !== "a") {
    return;
  }
  // Log the content of the <a> to verify the handler is working
  //console.log(event.target.text);

  if (event.target.hasAttribute("class")) {
    //event.target.removeAttribute("class");
    //let child = mainEl.firstElementChild;
    subMenuEl.style.top = "0";
    /* while (child) {
      mainEl.removeChild(child);
      child = mainEl.firstElementChild;
    };  */
    //myFunction();
    /* myFunction().then(images.forEach((image) => {
      mainEl.appendChild(createFrag(image.title, image.src));
    }));  */
    event.target.removeAttribute("class");
    if (event.target === topMenuChildren[0]) {
      closeWindow();
    }
  } 
  else {
    event.target.classList.add("active");
    topMenuChildren.forEach((e) => { // Add a toggled "active" state to each menu item
      if (e !== event.target) {
        e.removeAttribute("class");
      }
    });
    if (event.target === topMenuChildren[0]) {
      subMenuEl.style.top = "0";
      mainEl.innerHTML = "<h1>About</h1>";
      newWindow();
    } 
    else {
      event.target.setAttribute("subLinks", buildSubmenu(event.target.text));
      subMenuEl.style.top = "100%";
      //mainEl.firstElementChild.innerHTML =  
      let child = mainEl.firstElementChild.nextElementSibling;
      while (child) {
        mainEl.removeChild(child);
        child = mainEl.firstElementChild.nextElementSibling;
      }; 
    }
  }
}); 

// Functions for Browser Object Model (BOM) methods
let myWindow;

function newWindow() {
  myWindow = window.open(
    "https://www.netflix.com/browse/genre/5685",
    "NETFLIX",
    "width=600, height=500, resizable=yes, scrollbars=yes, location=yes, top=200, left=50"
  );
  myWindow.focus();
}

function closeWindow() {
  myWindow.close();
  
}

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
  mainEl.firstElementChild.innerText = str;
  if (mainEl.firstElementChild === mainEl.lastElementChild) {
    formSelector();
  } else {
    mainEl.removeChild(lastElementChild);
    formSelector();
  }
});

function formSelector() {
  if (mainEl.firstElementChild.innerText === "Login") {
    formLogin();
  }
}


function formLogin() {
  //mainEl.removeChild(lastElementChild);
  const loginDiv = document.createElement("div");
  const p1 = document.createElement("p");

  loginDiv.classList.add("login-div");
  p1.textContent = "Login using your account information.";
  loginDiv.style.width ="400px";
  loginDiv.style.height = "500px";
  loginDiv.style.backgroundColor = "#eee";
  loginDiv.style.borderRadius = "10px"; 
  loginDiv.style.border = "2px solid gray";
  loginDiv.style.boxShadow = "5px 10px 10px gray";  

  mainEl.appendChild(loginDiv);
  loginDiv.appendChild(p1);
  loginDiv.appendChild(loginForm);
}

loginForm.addEventListener("submit", validateForm);

function validateForm(evt) {
  evt.preventDefault();
  const userVal = validateUser();
  if (userVal === false) {
    evt.returnValue = false;
    return false;
  }

  const passwordVal = validatePassword();
  if (passwordVal === false) {
    evt.returnValue = false;
    return false;
  }

  const persistChecked = validateCheckbox();
  if (!persistChecked) {
    evt.returnValue = false;
    return false;
  } 

  alert(`Name: ${userVal}
    Password: ...that's a secret.`);
  
  userInput.value = "";
  passwordInput.value ="";  
  persistCheckbox.checked = false;

  return true;
}

// User Validation
function validateUser() {
  if (userInput.value === "") {
    alert("Please provide a name.");
    userInput.focus();
    return false;
  }
  return userInput.value;
}

// Password Validation
function validatePassword() {
  if (passwordInput.value === "") {
    alert("Please provide a password.");
    passwordInput.focus();
    return false;
  }
  return passwordInput.value;
}

// Checkbox Validation
function validateCheckbox() {
  //let isChecked = true;
  if (!persistCheckbox.checked) {
    alert("Please check \"Keep me logged in.\"");
    return false;
  } 
  return true;
}

// Create a helper function for the submenu bar
function buildSubmenu(texts) {
  // Clear the current contents of subMenuEl
  while (subMenuEl.firstChild) {
    subMenuEl.removeChild(subMenuEl.firstChild);
  }

  if (texts === "account") {
    let subLinks = subLinksArray[1];
    subLinks.forEach((link) => {
      const subLink = document.createElement("a");
      subLink.setAttribute("href", link.href);
      subLink.textContent = link.text;
      subMenuEl.appendChild(subLink);
    });
  } else if (texts === "catalog") {
    let subLinks = subLinksArray[2];
    subLinks.forEach((link) => {
      const subLink = document.createElement("a");
      subLink.setAttribute("href", link.href);
      subLink.textContent = link.text;
      subMenuEl.appendChild(subLink);
    });
  } else if (texts === "orders") {
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

//const formContainer = mainEl.firstElementChild;
async function myFunction() {
  mainEl.removeChild(formContainer);
  const images = [
    { "title": "Unlocked", "src": "images/unlocked.jpg" }];

  images.forEach((image) => {
    mainEl.appendChild(createFrag(image.title, image.src));
  })
}

myFunction();

/* myFunction().then(images.forEach((image) => {
  mainEl.appendChild(createFrag(image.title, image.src));
  //mainEl.removeChild(formContainer);
}));  */ 


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


