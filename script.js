//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// Event Listeners
//Adding Listerer to submit button
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

// Adding Listener to input field for search by enter key
input.addEventListener(
  "keydown",
  function (e) {
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);

// Adding Listener for display nothing if input value not found
input.addEventListener("input", function () {
  noresults.style.display = "none";
});

// Adding Listener to Light mode button or dark mode button
btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// Functions

//API CALL
function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    //Send json data to update the profile
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}


//RENDER user data by the given response from API as data
function updateProfile(data) {
    // If data found
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
    // check other parameters are found or not
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        // setting style for parameters
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    // Adding avatar image from api response
    avatar.src = `${data.avatar_url}`;
    // User name
    userName.innerText = data.name === null ? data.login : data.name;
    // userId-Login detail on UI
    user.innerText = `@${data.login}`;
    // user account link with user name on UI
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    // Show joining date on UI
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    // Gettin bio from profile on UI
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    // Adding repository count on UI
    repos.innerText = `${data.public_repos}`;
    // Adding follower cunt on UI
    followers.innerText = `${data.followers}`;
    // Add following on UI
    following.innerText = `${data.following}`;
    // Getting users Location if found than show on UI
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    // Getting users website link and updating on UI
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    // if found page link than update on UI
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    // Getting users twitter account information if given
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    // If twitter detail found than update it on UI
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    // Get users company datails 
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    // Information found from users detail get from API will be updated on UI
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    // if wrong username is entered than block the display nothing to show
    noresults.style.display = "block";
  }
}



//SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
    // Properties of dark mode applied
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
//   mark dark mode as true
  darkMode = true;
  console.log("darkmode changed to " + darkMode);
//   Update in local storage
  localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");

  console.log("setting dark mode to true");

}

//SWITCH TO LIGHT MODE - activateLightMode()
function lightModeProperties() {
    //  Light mode properties applied
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  //   mark dark mode as false
  darkMode = false;
  console.log("darkmode changed to " + darkMode);
    // Update in local storage
  localStorage.setItem("dark-mode", false);
  console.log("setting dark mode to false");
}


//INITIALISE UI
function init() {
  //initialise dark-mode variable to false;
  //darkMode = true -> dark mode enable karna h 
  //darMode = false -> light mode enable karna h 
  darkMode = false;

  //HW
// const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const value = localStorage.getItem("dark-mode");
    // if no previous values found than show light UI
  if(value === null) {
    console.log("null k andar");
    localStorage.setItem("dark-mode", darkMode);
    lightModeProperties();
  }
//   if previously saved in local storage than show that UI
  else if(value == "true") {
    console.log("truer k andar");
    darkModeProperties();
  }
  else if(value == "false") {
    console.log("false k andar");
    lightModeProperties();
  }


  //by default, meri info show hogi UI pr
  getUserData(url + "architak47");
}
// call the initalisation function
init();