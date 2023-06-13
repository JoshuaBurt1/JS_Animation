// constants for query selector
//buttons
const custColor = document.querySelector(".custColor");
const randColor = document.querySelector(".randColor");
//fields
const imageSelect = document.querySelector("#imageSelect");
//tags
const page = document.querySelector("html");
const studentId = document.querySelector("#myStudentId");
const images = document.querySelector("#image");
const prevImages = document.querySelector("#prevImage");
const nextImages = document.querySelector("#nextImage");
const displays = document.querySelector("#display");

//function to change background color (called by changeCustomColor() & changeRandomColor())
function selector(number) {
  if (number < 0 || number > 100) {
    page.style.backgroundColor = "red";
  }
  if (number >= 0 && number < 20 && number != null && number != "") {
    page.style.backgroundColor = "green";
  }
  if (number >= 20 && number < 40) {
    page.style.backgroundColor = "blue";
  }
  if (number >= 40 && number < 60) {
    page.style.backgroundColor = "orange";
  }
  if (number >= 60 && number < 80) {
    page.style.backgroundColor = "purple";
  }
  if (number >= 80 && number <= 100) {
    page.style.backgroundColor = "yellow";
  }
  if (number == null || number == "") {
    //if no number is enter the color does not change
    document.getElementById("customNumber").placeholder = "Enter a number";
    //page.style.backgroundColor = "white"; //changes background to white if no number entered
  }
}

// function to generate options for select list
// Tip: you might have to check length condition so that the list does not keep growing when clicked
// Tip: use createElement and appendChild inside every for loop to add elements to select list from array
function addList() {
  var imageNames = [
    "Image1",
    "Image2",
    "Image3",
    "Image4",
    "Image5",
    "Image6",
    "Image7",
  ];
  if (imageSelect.length < imageNames.length) {
    for (let i = 0; i < imageNames.length; i++) {
      var option = document.createElement("option");
      option.text = imageNames[i];
      option.id = imageNames[i];
      imageSelect.appendChild(option);
    }
  }
}

// function to change image
function changeImage() {
  var imagePath = [
    "", //this is for when the select image button is initially clicked
    "css/img/img1.jpg",
    "css/img/img2.jpg",
    "css/img/img3.jpg",
    "css/img/img4.jpg",
    "css/img/img5.jpg",
    "css/img/img6.png",
    "css/img/img7.png",
  ];

  addList(); //populates imageSelect option tags
  for (var i = 0; i < imagePath.length; i++) {
    if (imageSelect[i].selected) {
      images.setAttribute("src", imagePath[i]);
      prevImages.setAttribute("src", imagePath[i - 1]);
      nextImages.setAttribute("src", imagePath[i + 1]);
    }
    displayColor(); //display div color changed during of animation
    if (imageSelect[0].selected) {
      //sets the 0th image style attributes
      displays.setAttribute("style", "opacity: transparent");
      images.setAttribute("src", imagePath[0]);
      nextImages.setAttribute("src", imagePath[0]);
    }
  }
  animateList();
}

// function to change bg color from user input and add student id
function changeCustomColor() {
  studentId.textContent = 200523537;
  var number = document.getElementById("customNumber").value;
  selector(number);
  displayColor(); //changes display div color on changeCustomerColor button click
}

// function to change bg color from random no.
function changeRandomColor() {
  var number = Math.floor(Math.random() * 100) + 1; //generates random number between 1-100
  selector(number);
  displayColor(); //changes display div color on changeRandomColor button click
}

//OTHER FUNCTIONS
//magnifies image size on click
const timeout = setTimeout(toggleImageSize, 1000);
function toggleImageSize() {
  var styles = getComputedStyle(images); //getComputedStyle gets css values
  //console.log(styles); //all styles implemented on id images
  if (styles.width == "700px") {
    images.setAttribute("style", "width: 50%; cursor: zoom-out;");
    clearTimeout(timeout); //needed to prevent image size from immediately setting back to width: 700px
  } else {
    images.setAttribute("style", "width: 700px; cursor: zoom-in;");
  }
}

//creates custom display div background-color
const style1 = getComputedStyle(page);
function displayColor() {
  rgbString = style1.backgroundColor;
  var rgbVal = rgbString.substring(4, rgbString.length - 1); //substring containing number and comma
  var rgbArray = rgbVal.split(","); //convert string to array at comma delimiter
  var style2 =
    "background-color: rgb(" +
    Math.abs(rgbArray[0] - Math.floor(rgbArray[0] ** 0.5)) +
    ", " +
    Math.abs(rgbArray[1] - Math.floor(rgbArray[1] ** 0.5)) +
    ", " +
    Math.abs(rgbArray[2] - Math.floor(rgbArray[2] ** 0.5)) +
    ")";
  displays.setAttribute("style", style2); //changes display div background-color
}

//scroll animation
var currentOption = 0;
var optionVal = 0;
var direction = 0;
function animateList() {
  imageSelect.addEventListener("click", (event) => {
    const selectedOption = event.target.value;
    optionVal = selectedOption.substring(
      selectedOption.length - 1,
      selectedOption.length
    );
    //we don't want an animation if the option value is the same twice
    if (optionVal != currentOption) {
      //determines scroll animation direction
      direction = currentOption - optionVal;
      console.log("direction:" + direction);
      //to obtain background value of display div so that it plays during of animation
      const style3 = getComputedStyle(displays); //get div display background-color
      rgbString3 = style3.backgroundColor;
      //if user chooses image # less than last
      if (direction < 0) {
        displays.setAttribute(
          "style",
          "left: 33%; background-color: " + rgbString3 + ";"
        );
        displays.style.animation = "scrollLeft 1s linear"; //no function can go after animation (will not run)
        setTimeout(() => {
          displays.setAttribute("style", "position: relative; left: 0%;");
          displayColor(); //display div color changed at end of timeout
        }, 1000);
      }
      //if user choose image # greater than last
      if (direction > 0) {
        displays.setAttribute(
          "style",
          "right: 33%; background-color: " + rgbString3 + ";"
        );
        displays.style.animation = "scrollRight 1s linear";
        setTimeout(() => {
          displays.setAttribute("style", "position: relative; left: 0%;");
          displayColor(); //display div color changed at end of timeout
        }, 1000);
      }
    }
  });
  currentOption = optionVal;
  // console.log("scrollVal:" + scrollVal);
  // console.log("optionVal:" + optionVal); //current picture value
  // console.log("currentOption:" + currentOption);
}

// event listeners for on click event of buttons and select
custColor.addEventListener("click", changeCustomColor);
randColor.addEventListener("click", changeRandomColor);
imageSelect.addEventListener("click", changeImage);

// event listeners for on change event of select
images.addEventListener("click", toggleImageSize);
