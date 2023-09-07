// import {locationChange} from "./main.js"
const mainCenter = document.querySelector(".main-center");
const backBtn = document.querySelector(".back");
const error = document.querySelector(".error");
const errorCode = document.querySelector(".error-code");
const nextBtn = document.querySelector(".next");
const numbers = document.querySelectorAll(".number");
const nameLoc = document.querySelectorAll(".nameLoc");
const headerName = document.querySelector(".name-location");
let functionFlag = false;

// const booking = document.querySelector(".booking");
const steps = ["Staff", "Services", "Date & Time", "Confirmation"];
let key = 1;

const staff = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "staff-1.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "staff-2.png",
  },
];

const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "service-1.jpg",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "service-2.jpg",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
  {
    id: 3,
    name: "Check up",
    image: "service-3.jpg",
    duration: "1 hour 12 minutes",
    price: 140.0,
  },
];

const date = ["2023-03-04", "2023-03-05", "2023-03-06"];
const time = [
  {
    start_time: "09:00",
    end_time: "09:30",
  },
  {
    start_time: "09:30",
    end_time: "10:00",
  },
  {
    start_time: "10:00",
    end_time: "10:30",
  },
];

let selectedDayCal = null;
let selectedStaff = null;
let selectedService = null;
let selectedDate = null;
let selectedTime = null;
let selectedPrice = null;
let customerInfo = {
  name: "",
  surname: "",
  email: "",
  phone: "",
};

let currentStep = 0;

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    if (currentStep === 1 && selectedStaff !== null && flag) {
      removeDone(currentStep);
      currentStep--;
      addActive(currentStep);
      key--;
      locationChange();
      return;
    }
    if (currentStep === 2 && selectedPrice !== null && flagServ) {
      removeDone(currentStep);
      currentStep--;
      addActive(currentStep);
      key--;
      locationChange();
      return;
    }
    if (
      currentStep === 3 &&
      selectedDate !== null &&
      selectedTime !== null &&
      calendarFlag
    ) {
      functionFlag = true;
      removeDone(currentStep);
      currentStep--;
      addActive(currentStep);
      key--;
      locationChange();
      return;
    }
  }
});

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    if (currentStep === 0 && selectedStaff === null) {
      // Xəbərdarlıq mesajı göstər
      error.classList.remove("hide");
      errorCode.textContent = "Select Staff";
      return;
    }
    if (currentStep === 1 && selectedPrice === null) {
      // Xəbərdarlıq mesajı göstər
      error.classList.remove("hide");
      errorCode.textContent = "Select Service";
      return;
    }
    if (currentStep === 2 && selectedDate === null && selectedTime === null) {
      // Xəbərdarlıq mesajı göstər
      error.classList.remove("hide");
      errorCode.textContent = "Select Date & Time";
      return;
    }
    addDone(currentStep);
    currentStep++;
    addActive(currentStep);
    key++;
    locationChange();
  }
});

function locationChange() {
  numbers.forEach((active) => {
    if (active.classList[1] == "active") {
      key = +active.textContent;
    }
  });

  switch (key) {
    case 1:
      mainCenter.innerHTML = ``;
      headerName.textContent = "Select staff"
      createStuff();
      break;
    case 2:
      mainCenter.innerHTML = ``;
      headerName.textContent = "Select service"
      createService();
      break;
    case 3:
      mainCenter.innerHTML = ``;
      headerName.textContent = "Select Date & Time"
      if (functionFlag) {
        const booking = document.querySelector(".next");
        booking.remove();
        nextBtn.classList.remove("none");
        nextBtn.classList.add("next");
        functionFlag = false;
        nextBtn.textContent = "NEXT";
      }
      createDateTime();
      break;
    case 4:
      mainCenter.innerHTML = ``;
      headerName.textContent = "Confirmation"
      functionFlag = true;
      createConfirmation();
      break;
    default:
      break;
  }
}

function addDone(i) {
  numbers[i].classList.remove("active");
  numbers[i].classList.add("doneOval");
  numbers[i].innerHTML = `<i class="fa-solid fa-check" style="color: #ffffff;"></i>`;
  nameLoc[i].classList.remove("location-name-active");
  nameLoc[i].classList.add("doneName");
}

function removeDone(i) {
  numbers[i].classList.remove("active");
  numbers[i].classList.add("deactive");
  numbers[i - 1].innerHTML = i;
  nameLoc[i].classList.remove("location-name-active");
  nameLoc[i].classList.add("location-name");
}

function addActive(i) {
  numbers[i].classList.add("active");
  numbers[i].classList.remove("deactive");
  nameLoc[i].classList.add("location-name-active");
  nameLoc[i].classList.remove("location-name");
}

let flag = false;
function createStuff() {
  staff.forEach((doc) => {
    mainCenter.innerHTML += `<div id=${doc.id} class="doctor">
        <div class="profile">
            <img src="./image/${doc.image}" alt="Doctor image" class="profile-img">
        </div>
        <div class="fullname-and-email">
            <h2 class="fullname">${doc.name}</h2>
            <h3 class="email">${doc.email}</h3>
        </div>
    </div>`;
  });
  flag = true;
  backBtn.classList.add("hide");
  error.classList.add("hide");
  const card = document.querySelectorAll(".doctor");

  for (let i = 0; i < card.length; i++) {
    if (card[i].children[1].children[0].textContent == selectedStaff) {
      card[i].classList.add("selected");
    }
    card[i].addEventListener("click", (e) => {
      if (card[i].classList[1] !== "selected") {
        card[i].classList.add("selected");
        selectedStaff = e.target.children[1].children[0].textContent;
      } else {
        card[i].classList.remove("selected");
        selectedStaff = null;
      }

      if (error.classList[1] != "hide") {
        if (currentStep < steps.length - 1) {
          if (currentStep === 0 && selectedStaff === null) {
            // Xəbərdarlıq mesajı göstər
            error.classList.remove("hide");
            errorCode.textContent = "Select Staff";
            return;
          }
          addDone(currentStep);
          currentStep++;
          addActive(currentStep);
          key++;
          locationChange();
        }
      }
      for (let j = 0; j < card.length; j++) {
        if (i != j) {
          card[j].classList.remove("selected");
        }
      }
    });
  }
}

let flagServ = false;
function createService() {
  services.forEach((serv) => {
    mainCenter.innerHTML += `<div id=${serv.id} class="card">
        <div class="profile-service">
            <div class="profile">
                <img src="./image/${serv.image}" alt="Doctor image" class="profile-img">
            </div>
            <div class="service-and-hours">
                <h2 class="service">${serv.name}</h2>
                <h3 class="hours">${serv.duration}</h3>
            </div>
        </div>
        <span class="price">${serv.price}$</span>
    </div>`;
  });
  flagServ = true;
  backBtn.classList.remove("hide");
  error.classList.add("hide");
  errorCode.textContent = "Select Service";
  const card = document.querySelectorAll(".card");

  for (let i = 0; i < card.length; i++) {
    if (card[i].children[1].textContent == selectedPrice) {
      card[i].classList.add("selected");
    }
    card[i].addEventListener("click", (e) => {
      if (card[i].classList[1] !== "selected") {
        card[i].classList.add("selected");
        selectedPrice = e.target.children[1].textContent;
        selectedService =
          e.target.children[0].children[1].children[0].textContent;
      } else {
        card[i].classList.remove("selected");
        selectedPrice = null;
        selectedService = null;
      }
      if (error.classList[1] != "hide") {
        if (currentStep < steps.length - 1) {
          if (currentStep === 1 && selectedPrice === null) {
            // Xəbərdarlıq mesajı göstər
            error.classList.remove("hide");
            errorCode.textContent = "Select Service";
            return;
          }
          addDone(currentStep);
          currentStep++;
          addActive(currentStep);
          key++;
          locationChange();
        }
      }
      for (let j = 0; j < card.length; j++) {
        if (i != j) {
          card[j].classList.remove("selected");
        }
      }
    });
  }
}

let calendarFlag = false;
function createDateTime() {
  mainCenter.innerHTML = `<div class="date-time-area">
    <div class="date-header-area">
        <div class="header-area">
            <button class="arrow-back"><img src="./image/arrow-back.svg" alt="arrow back"></button>
            <h3 class="calendar-month-year-name"></h3>
            <button class="arrow-next"><img src="./image/arrow-next.svg" alt="arrow next"></button>
        </div>
        <table class="calendar">
            <tr class="calendar-weeks">
                <th class="week">Sun</th>
                <th class="week">Mon</th>
                <th class="week">Tue</th>
                <th class="week">Wed</th>
                <th class="week">Thu</th>
                <th class="week">Fri</th>
                <th class="week">Sat</th>
            </tr>
            <tr class="calendar-days">
               
            </tr>
            
            
        </table>
    </div>
    <div class="time-area">
        <div class="time-header-area">
            <h3 class="time-note-name">Time</h3>
        </div>
        <div class="time-note">
            <div class="time-note-header">
                Select date
            </div>
            <div class="time-note-main">
                <div class="time">
                    09:00
                    09:30
                </div>
                <div class="time">
                    09:30 
                    10:00
                </div>
                <div class="time">
                    10:00 
                    10:30
                </div>
            </div>
        </div>
    </div>
</div>`;
  calendarFlag = true;
  const calendarDays = document.querySelector(".calendar-days");
  const timeNoteHeader = document.querySelector(".time-note-header");
  const time = document.querySelectorAll(".time");
  time.forEach((tim) => tim.classList.add("hide"));

  let nav = 0;
  let clicked = null;
  let events = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : [];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function load() {
    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString(`en-us`, {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    const calendarMonthYearName = document.querySelector(
      ".calendar-month-year-name"
    );
    calendarMonthYearName.innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;

    calendarDays.innerHTML = " ";

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement("td");
      daySquare.classList.add("day");

      timeNoteHeader.textContent = selectedDate;
      if (i > paddingDays) {
        daySquare.innerText = i - paddingDays;

        if (selectedTime != null) {
          time.forEach((tim) => {
            tim.classList.remove("hide");
          });
        }
        if (daySquare.textContent == selectedDayCal) {
            daySquare.classList.add("selected-day")
            time.forEach(tim => {
                tim.classList.remove("hide")
                if (tim.textContent == selectedTime) {
                    tim.classList.toggle("time-active");
                }
            })
        }

        daySquare.addEventListener("click", (e) => {
          let day = e.target.textContent;

          let selectedDay = new Date(year, month, day);
          const dateStr = selectedDay.toLocaleDateString("en-us", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
          });

          if (e.target.classList[1] != "selected-day") {
            e.target.classList.add("selected-day");
            selectedDayCal = dateStr.toString();
            selectedDate = dateStr;
            timeNoteHeader.textContent = selectedDate;

            time.forEach((tim) => {
              tim.classList.remove("hide");
            });
          }

          selectedDayCal = selectedDayCal.substring(2, 4).split("/")[0];

          for (let i = 0; i < time.length; i++) {
            time[i].addEventListener("click", () => {
              if (time[i].classList[1] == "time-active") {
                time[i].classList.remove("time-active");
                selectedTime = null;
              } else {
                time[i].classList.add("time-active");
                selectedTime = time[i].textContent;
              }

              for (let j = 0; j < time.length; j++) {
                if (i != j) {
                  time[j].classList.remove("time-active");
                }
              }
              selectedTime = time[i].textContent;
            });
          }
        });
      } else {
        daySquare.classList.add("padding");
      }

      calendarDays.appendChild(daySquare);
    }
  }

  function initButtons() {
    document.querySelector(".arrow-next").addEventListener("click", () => {
      nav++;
      load();
    });
    document.querySelector(".arrow-back").addEventListener("click", () => {
      nav--;
      load();
    });
  }
  nextBtn.textContent = "NEXT";

  initButtons();
  load();
  error.classList.add("hide");
}

function createConfirmation() {
  nextBtn.classList.add("none");
  nextBtn.classList.remove("next");
  mainCenter.innerHTML = `<form action="" class="form-person-send">
    <div class="label-input-area">
        <label for="first-name" class="form-label">First name <span class="important-label">*</span></label>
        <input class="form-input" type="text" name="first-name" id="first-name">
    </div>

    <div class="label-input-area">
        <label for="last-name" class="form-label">Last name <span class="important-label">*</span></label>
        <input class="form-input" type="text" name="last-name" id="last-name">
    </div>

    <div class="label-input-area">
        <label for="email" class="form-label">E-mail <span class="important-label">*</span></label>
        <input class="form-input" type="text" name="email" id="email">
    </div>

    <div class="label-input-area">
        <label for="phone" class="form-label">Phone</label>
        <input class="form-input" type="text" name="phone" id="phone">
    </div> 

    <div class="note-area">
        <div class="note-name">Note</div>
        <div class="note">
            <h4 class="service"><span class="service-name">Staff:</span> ${selectedStaff}</h4>
            <h4 class="service"><span class="service-name">Service:</span> ${selectedService}</h4>
            <h4 class="service"><span class="service-name">Date:</span> ${selectedDate} / ${selectedTime}</h4>
            <h4 class="service"><span class="service-name">Price:</span> ${selectedPrice}</h4>
        </div>
    </div>
</form>`;

  const footer = document.querySelector(".footer");
  const booking = document.createElement("button");
  booking.classList.add("next");
  // const form = document.querySelector(".form-person-send")
  booking.textContent = "CONFIRIM BOOKING";
  footer.appendChild(booking);
  functionFlag = true;
  // console.log(formInput[0].value);
  let flag = false;
  booking.addEventListener("click", () => {
    const formInput = document.querySelectorAll(".form-input");
    if (
      formInput[0].value.trim() == " ".trim() ||
      formInput[1].value.trim() == " ".trim() ||
      formInput[2].value.trim() == " ".trim() ||
      formInput[3].value.trim() == " ".trim()
    ) {
      mainCenter.innerHTML += `<div class="modal-back">
        <div class="modal">
                <div class="cancel-area"><img class="cancel" src="./image/cancel.svg" alt="Cancel button"></div>
                <div class=" error-message">
                    Please, fill the all required fields!
                </div>
            </div>
        </div>`;
      flag = true;
    } else {
      customerInfo.name = formInput[0].value;
      customerInfo.surname = formInput[1].value;
      customerInfo.email = formInput[2].value;
      customerInfo.phone = formInput[3].value;
      mainCenter.innerHTML += `<div class="modal-back">
            <div class="modal">
                <div class="cancel-area"><img class="cancel" src="./image/cancel.svg" alt="Cancel button"></div>
                <div class="succes-message">
                    Confirmation successfully completed!
                </div>
            </div>
        </div>`;
      console.log({
        staff_id: selectedStaff,
        service_id: selectedService,
        date: selectedDate,
        time: selectedTime,
        customer: customerInfo,
      });
      flag = true;
    }

    if (flag) {
      const modal = document.querySelectorAll(".modal-back");
      const cancel = document.querySelectorAll(".cancel");

      cancel.forEach((canc) => {
        canc.addEventListener("click", (e) => {
          if (e.target.classList == "cancel") {
            e.target.parentElement.parentElement.parentElement.remove();
          }
        });
      });

      modal.forEach((moda) => {
        moda.addEventListener("click", (e) => {
          if (
            e.target.classList[0] != "modal" &&
            e.target.classList[0] != "succes-message" &&
            e.target.classList[0] != "error-message" &&
            e.target.classList[0] != "cancel-area" &&
            e.target.classList[0] != "cancel"
          ) {
            e.target.classList.add("hide");
          }
        });
      });
    }
  });

  error.classList.add("hide");
}

locationChange();
