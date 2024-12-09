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
  const searchInput = document.getElementById('report-search');
  const departmentFilter = document.getElementById('report-department-filter');
  const reportTable = document.getElementById('report-table');

  searchInput.addEventListener('input', () => {
    filterReports();
  });

  departmentFilter.addEventListener('change', () => {
    filterReports();
  });

  function filterReports() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDepartment = departmentFilter.value;

    const rows = reportTable.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const reportName = row.cells[0].textContent.toLowerCase();
      const reportDepartment = row.cells[2].textContent.toLowerCase(); // Assuming department is in the 3rd cell

      let isVisible = true;
      if (selectedDepartment !== 'all') {
        isVisible = isVisible && reportDepartment === selectedDepartment;
      }
      isVisible = isVisible && reportName.includes(searchTerm);

      row.style.display = isVisible ? '' : 'none';
    });
  }
}

function handleViewButton() {
  const viewButtons = document.querySelectorAll(".btn-view");

  viewButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const reportRow = event.target.closest("tr");
      const reportName = reportRow.cells[0].textContent.trim();

      // Map report names to URLs
      const reportUrls = {
        "Quarterly Financial Summary":
          "reports/Quarterly_Financial_Summary.pdf",
        "Financial Report": "reports/Financial_Report.xlsx",
        "Annual Performance Review": "reports/Annual_Performance_Review.pdf",
        "Ad Revenue Report": "reports/Ad_Revenue_Report.xlsx"
      };

      const reportUrl = reportUrls[reportName];

      if (reportUrl) {
        window.open(reportUrl, "_blank");
      } else {
        alert("Report not found.");
      }
    });
  });
}

// Pagination functionality
function handlePagination() {
  let currentPage = 1;
  const rowsPerPage = 5;
  const rows = document.querySelectorAll("#report-list tr");
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  function showPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    rows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "" : "none";
    });
    document.querySelector(".page-number").textContent = `Page ${page}`;
  }

  document.querySelector(".prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  document.querySelector(".next-page").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  // Initialize the table with the first page
  showPage(currentPage);
}

function handleFileActions() {
  const downloadButtons = document.querySelectorAll(".btn-download");
  const deleteButtons = document.querySelectorAll(".btn-delete");

  downloadButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const fileRow = event.target.closest("tr");
      const fileName = fileRow.cells[0].textContent.trim();

      // Map file names to download URLs
      const fileUrls = {
        "Project_Plan.pdf": "files/Project_Plan.pdf",
        "Project_Milestones.pdf": "files/Project_Milestones.pdf",
        "Presentation.pptx": "files/Presentation.pptx",
        "Polar_Bear.xlsx": "files/Polar_Bear.xlsx"
      };

      const fileUrl = fileUrls[fileName];

      if (fileUrl) {
        // Create a temporary anchor element
        const downloadLink = document.createElement("a");
        downloadLink.href = fileUrl;
        downloadLink.download = fileName;

        // Simulate a click to trigger the download
        downloadLink.click();

        // Clean up the temporary element
        downloadLink.remove();
      } else {
        alert("File not found.");
      }
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const fileRow = event.target.closest("tr");
      fileRow.remove();

      // Handle deletion from server or local storage (if applicable) Not added for demonstration purposes
      // ... (your deletion logic here)
    });
  });
}

function handleFileSearchAndFilter() {
  const searchInput = document.getElementById('file-search');
  const filterType = document.getElementById('file-type-filter');
  const fileTable = document.getElementById('file-table');

  searchInput.addEventListener('input', () => {
    filterFiles();
  });

  filterType.addEventListener('change', () => {
    filterFiles();
  });

  function filterFiles() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = filterType.value.toLowerCase();

    const rows = fileTable.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const fileName = row.cells[0].textContent.toLowerCase();
      const fileExtension = fileName.split('.').pop();

      let isVisible = true;
      if (selectedType !== 'all') {
        isVisible = isVisible && fileExtension === selectedType;
      }
      isVisible = isVisible && fileName.includes(searchTerm);

      row.style.display = isVisible ? '' : 'none';
    });
  }
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-task-button')) {
    // Find the closest column to the button
    const column = event.target.closest('.col');

    // Create a new task item element
    const newTaskItem = document.createElement('div');
    newTaskItem.classList.add('item');

    // Create elements for the task text and edit button
    const newTaskText = document.createElement('span');
    newTaskText.classList.add('task-text');
    newTaskText.textContent = 'New Task';

    const newEditButton = document.createElement('button');
    newEditButton.classList.add('edit-button');
    newEditButton.textContent = 'Edit';

    // Append the elements to the task item
    newTaskItem.appendChild(newTaskText);
    newTaskItem.appendChild(newEditButton);

    column.appendChild(newTaskItem)

    // Find the appropriate container to append the new task item
    const tasksContainer = document.querySelector('.task-columns');
    tasksContainer.appendChild(newTaskItem);
  }
});

// Initialize all functionalities
document.addEventListener("DOMContentLoaded", () => {
  handleMainNavigation();
  handleSubTabNavigation();
  handleMenuInteraction();
  renderCalendar();
  handleReportSearch();
  handleViewButton();
  handleFileActions();
  handleFileSearchAndFilter();
  handlePagination();
});