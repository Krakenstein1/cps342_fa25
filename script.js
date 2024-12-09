// script.js

// Function to handle the main navigation switching
function handleMainNavigation() {
  const menuItems = document.querySelectorAll(".menu-item > a");
  const mainContents = document.querySelectorAll(".main-content");

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (event) => {
      event.preventDefault();

      // Remove active class from all menu items and main content
      menuItems.forEach((item) => item.classList.remove("active"));
      mainContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked menu item
      menuItem.classList.add("active");

      // Show corresponding main content area
      const targetTab = menuItem.getAttribute("main-tab");
      if (targetTab) {
        document.getElementById(targetTab).classList.add("active");
      }
    });
  });
}

// Function to handle sub-tab switching within the main Projects area
function handleSubTabNavigation() {
  const navTabs = document.querySelectorAll(".nav-tabs a");
  const tabContents = document.querySelectorAll(".tab-content");

  navTabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();

      // Remove active class from all nav tabs and tab contents
      navTabs.forEach((item) => item.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Show the corresponding tab content
      const targetContentId = tab.getAttribute("data-tab");
      const targetContent = document.getElementById(targetContentId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

// Function to handle menu item interactions with submenus
function handleMenuInteraction() {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all menu items
      menuItems.forEach((item) => item.classList.remove("active"));

      // Add active class to the clicked item
      this.classList.add("active");

      // If the menu item has a submenu, toggle its visibility
      const submenu = this.querySelector(".submenu");
      if (submenu) {
        submenu.style.display =
          submenu.style.display === "block" ? "none" : "block";
      }
    });
  });
}

// Calendar functionality
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function changeMonth(direction) {
  currentMonth += direction;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  renderCalendar();
}

function renderCalendar() {
  const monthYear = document.getElementById("month-year");
  const calendarDays = document.getElementById("calendar-days");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  monthYear.innerText = `${monthNames[currentMonth]} ${currentYear}`;

  // Clear the calendar container
  calendarDays.innerHTML = "";

  // Add day headings
  dayNames.forEach((day) => {
    const dayHeading = document.createElement("div");
    dayHeading.classList.add("calendar-cell", "day-heading");
    dayHeading.innerText = day;
    calendarDays.appendChild(dayHeading);
  });

  // Get the first and last day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const startingDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  // Add empty cells for the days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-cell", "inactive");
    calendarDays.appendChild(emptyCell);
  }

  // Add the days of the month
  for (let day = 1; day <= totalDays; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-cell");

    if (
      day === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentYear
    ) {
      dayCell.classList.add("today");
    }

    dayCell.innerText = day;
    calendarDays.appendChild(dayCell);
  }
}

// Report search functionality
function handleReportSearch() {
  document
    .getElementById("report-search")
    .addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll("#report-list tr");
      rows.forEach((row) => {
        const reportName = row.cells[0].textContent.toLowerCase();
        row.style.display = reportName.includes(searchTerm) ? "" : "none";
      });
    });
}

// Load and dynamically render reports
function loadReports() {
  const reportTable = document.querySelector("#report-list tbody");
  reportTable.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>"; // Show loading indicator

  fetch("reports/reports.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load report data");
      return response.json();
    })
    .then((reports) => {
      reportTable.innerHTML = ""; // Clear loading indicator

      reports.forEach((report) => {
        const row = document.createElement("tr");

        // Report Name
        const nameCell = document.createElement("td");
        nameCell.textContent = report.name || "Unnamed Report";
        row.appendChild(nameCell);

        // View Button
        const actionCell = document.createElement("td");
        const viewButton = document.createElement("button");
        viewButton.textContent = "View";
        viewButton.classList.add("btn-view");

        if (report.url) {
          viewButton.addEventListener("click", () => window.open(report.url, "_blank"));
        } else {
          viewButton.disabled = true;
          viewButton.textContent = "No URL";
        }

        actionCell.appendChild(viewButton);
        row.appendChild(actionCell);

        reportTable.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error loading reports:", error);
      reportTable.innerHTML = "<tr><td colspan='3'>Error loading reports.</td></tr>";
    });
}

// Initialize all functionalities
document.addEventListener("DOMContentLoaded", () => {
  handleMainNavigation();
  handleSubTabNavigation();
  handleMenuInteraction();
  renderCalendar();
  handleReportSearch();
  loadReports();
});