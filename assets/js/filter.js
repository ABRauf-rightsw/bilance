const appointmentData = {
    "january": 200,
    "february": 180,
    "march": 220,
    "april": 240,
    "may": 260,
    "june": 280,
    "latest": 300,  // Last month
    "all": 1380     // Total appointments in first 6 months of 2024
};

// Function to update stats dynamically
function updateStats() {
    let filter = document.getElementById("filter").value;
    let appointmentCount = appointmentData[filter] || 300; // Default to last month
    document.getElementById("appointments").innerText = appointmentCount;
}