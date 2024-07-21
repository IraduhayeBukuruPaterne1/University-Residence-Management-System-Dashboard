document.addEventListener('DOMContentLoaded', function () {
  // Fetch data from the mock API
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      displayRooms(data.rooms);
      displayMaintenanceRequests(data.maintenanceRequests);
      createOccupancyChart(data.rooms);
    })
    .catch(error => console.error('Error fetching data:', error));

  function displayRooms(rooms) {
    const roomManagementSection = document.getElementById('room-management');
    const roomTable = document.createElement('table');
    roomTable.innerHTML = `
      <tr>
        <th>Room Number</th>
        <th>Status</th>
        <th>Resident</th>
        <th>Amenities</th>
      </tr>
    `;
    rooms.forEach(room => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${room.roomNumber}</td>
        <td>${room.status}</td>
        <td>${room.resident}</td>
        <td>${room.amenities.join(', ')}</td>
      `;
      roomTable.appendChild(row);
    });
    roomManagementSection.appendChild(roomTable);
  }

  function displayMaintenanceRequests(requests) {
    const maintenanceRequestsSection = document.getElementById('maintenance-requests');
    const requestTable = document.createElement('table');
    requestTable.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Room Number</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    `;
    requests.forEach(request => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${request.id}</td>
        <td>${request.roomNumber}</td>
        <td>${request.description}</td>
        <td>${request.status}</td>
      `;
      requestTable.appendChild(row);
    });
    maintenanceRequestsSection.appendChild(requestTable);
  }

  function createOccupancyChart(rooms) {
    const ctx = document.getElementById('occupancyChart').getContext('2d');
    const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
    const vacantRooms = rooms.filter(room => room.status === 'vacant').length;
    const underMaintenanceRooms = rooms.filter(room => room.status === 'under maintenance').length;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Occupied', 'Vacant', 'Under Maintenance'],
        datasets: [{
          data: [occupiedRooms, vacantRooms, underMaintenanceRooms],
          backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // Theme switcher
  const themeSwitcher = document.getElementById('theme-switcher');
  themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Load theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});
