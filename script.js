// Sample college data (replace with your actual data)
const colleges = [
    { name: "Indian Institute of Technology, Delhi", collegeduniaRating: 9.2, fees: "₹1,20,000", userReviewRating: 8.7, featured: true },
    // ... more colleges
  ];
  
  // Function to create a table row
  function createTableRow(college) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${college.name}</td>
      <td>${college.collegeduniaRating}</td>
      <td>${college.fees}</td>
      <td>${college.userReviewRating}</td>
      <td>${college.featured ? 'Yes' : 'No'}</td>
    `;
    return row;
  }
  
  // Function to add rows to the table
  function addRows(start, end) {
    for (let i = start; i < end; i++) {
      const row = createTableRow(colleges[i]);
      document.getElementById('collegeTableBody').appendChild(row);
    }
  }
  
  // Initial load of 10 rows
  addRows(0, 10);
  
  // Infinite scroll implementation
  window.addEventListener('scroll', () => {
    const table = document.getElementById('collegeTable');
    const rows = table.rows.length;
    const lastRow = table.rows[rows - 1];
  
    if (lastRow.offsetTop + lastRow.offsetHeight >= window.innerHeight) {
      const nextRows = rows + 10;
      addRows(rows, nextRows);
    }
  });
  
  // Sorting functionality
  function sortTable(column, direction) {
    const table = document.getElementById('collegeTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.children);
  
    rows.sort((a, b) => {
      const cellA = a.cells[column].textContent;
      const cellB = b.cells[column].textContent;
  
      if (direction === 'asc') {
        return cellA.localeCompare(cellB);
      } else {
        return cellB.localeCompare(cellA);
      }
    });
  
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
  }
  
  // Search functionality
  function searchTable(searchTerm) {
    const table = document.getElementById('collegeTable');
    const rows = table.querySelector('tbody').children;
  
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.cells;
      let found = false;
  
      for (let j = 0; j < cells.length; j++) {
        if (cells[j].textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
          found = true;
          break;
        }
      }
  
      if (found) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  }
  
  // Add event listeners for sorting and searching
  document.getElementById('collegeTable').addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'TH') {
      const column = target.cellIndex;
      const direction = target.classList.contains('ascending') ? 'desc' : 'asc';
  
      // Remove previous sorting classes
      const headers = document.querySelectorAll('th');
      headers.forEach(header => header.classList.remove('ascending', 'descending'));
  
      // Apply new sorting class
      target.classList.add(direction);
  
      // Sort the table
      sortTable(column, direction);
    }
  });
  
  document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    searchTable(searchTerm);
  });