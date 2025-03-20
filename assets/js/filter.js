
const statsData = {
    "january": { appointments: 53, listings: 7, sold: 3 },
    "february": { appointments: 58, listings: 8, sold: 4 },
    "march": { appointments: 62, listings: 9, sold: 5 },
    "april": { appointments: 67, listings: 8, sold: 6 },
    "may": { appointments: 65, listings: 7, sold: 5 },
    "june": { appointments: 70, listings: 9, sold: 7 },
    "july": { appointments: 68, listings: 8, sold: 6 },
    "august": { appointments: 72, listings: 9, sold: 8 },
    "september": { appointments: 74, listings: 8, sold: 7 },
    "october": { appointments: 55, listings: 7, sold: 4 },
    "november": { appointments: 60, listings: 8, sold: 5 },
    "december": { appointments: 52, listings: 7, sold: 3 },
    "latest": { appointments: 66, listings: 8, sold: 6 },  
    "all": { appointments: 790, listings: 96, sold: 57 } 
  };
  
  function updateStats() {
      let filter = document.getElementById("filter").value;
      let stats = statsData[filter] || statsData["latest"]; 
  
      document.getElementById("appointments").innerText = stats.appointments;
      document.getElementById("listing").innerText = stats.listings;
      document.getElementById("sold").innerText = stats.sold;
  }
  