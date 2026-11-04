
let drivers = [];
let currentLap = 0;
let raceStarted = false;
let raceFinished = false;

// Get drivers from your HTML table
function loadDrivers() {

    let rows = document.querySelectorAll("table tr");

    rows.forEach((row, index) => {

        if (index === 0) return;

        let cells = row.querySelectorAll("td");

        drivers.push({
            name: cells[0].textContent,
            team: cells[1].textContent,
            speed: Number(cells[2].textContent),
            skill: Number(cells[3].textContent),
            tyres: cells[4].textContent,
            time: 0,
            status: "Starting",
            pitStops: 0,
            retired: false,
            row: row
        });

    });

}

// Convert time into minutes and seconds
function formatTime(seconds) {

    let minutes = Math.floor(seconds / 60);

    let remaining = (seconds % 60)
        .toFixed(3)
        .padStart(6, "0");

    return minutes + ":" + remaining;

}

// Update your existing HTML table
function updateTable() {

    drivers.forEach(driver => {

        let cells = driver.row.querySelectorAll("td");

        cells[4].textContent = driver.tyres;
        cells[5].textContent = formatTime(driver.time);
        cells[6].textContent = driver.status;

    });

    // Sort drivers according to their time
    let table = document.querySelector("table");
    let sortedDrivers = [...drivers].sort((a, b) => {

        if (a.retired && !b.retired) return 1;
        if (!a.retired && b.retired) return -1;

        return a.time - b.time;

    });

    sortedDrivers.forEach(driver => {
        table.appendChild(driver.row);
    });

}

// Notifications
function notify(message) {

    let notifications = document.getElementById("notifications");

    let p = document.createElement("p");

    p.textContent = message;

    notifications.prepend(p);

}

// Calculate lap time
function calculateLapTime(driver) {

    let time = 100;

    // Speed affects lap time
    time -= (driver.speed - 300) * 0.12;

    // Skill affects lap time
    time -= (driver.skill - 80) * 0.08;

    // Tyre performance
    if (driver.tyres === "Soft") {
        time -= 1.5;
    } else {
        time += 0.5;
    }

    // Random variation
    time += Math.random() * 2 - 1;

    return time;

}

// Pit stop
function pitStop(driver) {

    let oldTyres = driver.tyres;

    if (driver.tyres === "Soft") {
        driver.tyres = "Hard";
    } else {
        driver.tyres = "Soft";
    }

    // Pit stop takes 22 seconds
    driver.time += 22;

    driver.pitStops++;

    driver.status = "Pit Stop";

    notify(
        driver.name + " entered the pit and changed tyres: " +
        oldTyres + " -> " + driver.tyres
    );

}

// Start race
document.getElementById("start").addEventListener("click", function() {

    if (raceStarted) return;

    raceStarted = true;

    document.getElementById("start").disabled = true;

    document.getElementById("notifications").innerHTML = "";

    drivers.forEach(driver => {

        driver.time = 0;
        driver.status = "Racing";
        driver.retired = false;
        driver.pitStops = 0;

        // Use only two types of tyres
        if (driver.tyres === "Medium") {
            driver.tyres = "Hard";
        }

    });

    notify("The Formula 1 race has started!");

    updateTable();

});

// Next lap
document.getElementById("next").addEventListener("click", function() {

    if (!raceStarted || raceFinished) return;

    currentLap++;

    document.getElementById("lap").textContent =
        "Lap: " + currentLap + " / 10";

    notify("Lap " + currentLap + " started!");

    // Safety car
    let safetyCar = Math.random() < 0.15;

    if (safetyCar) {

        notify("SAFETY CAR! Drivers must slow down!");

    }

    drivers.forEach(driver => {

        if (driver.retired) return;

        driver.status = "Racing";

        // Calculate lap time
        let lapTime = calculateLapTime(driver);

        // Safety car
        if (safetyCar) {
            lapTime += 8;
        }

        // Spinning
        if (Math.random() < 0.08) {

            lapTime += 5;

            driver.status = "Spun";

            notify(driver.name + " spun off the track!");

        }

        driver.time += lapTime;

        // Mandatory pit stop on lap 5
        if (currentLap === 5 && driver.pitStops === 0) {

            pitStop(driver);

        }

        // Retirement
        if (currentLap >= 6 && Math.random() < 0.02) {

            driver.retired = true;
            driver.status = "Retired";

            notify(driver.name + " has left the race!");

        }

    });

    updateTable();

    notify("Lap " + currentLap + " finished!");

    // Finish after 10 laps
    if (currentLap === 10) {

        finishRace();

    }

});

// Finish race
function finishRace() {

    raceFinished = true;

    let finishedDrivers = drivers
        .filter(driver => !driver.retired)
        .sort((a, b) => a.time - b.time);

    finishedDrivers.forEach(driver => {

        driver.status = "Finished";

    });

    updateTable();

    if (finishedDrivers.length > 0) {

        let winner = finishedDrivers[0];

        document.getElementById("winner").textContent =
            "Winner: " + winner.name + " - " + winner.team;

        notify("RACE FINISHED! Winner: " + winner.name);

    } else {

        document.getElementById("winner").textContent =
            "No winner!";

        notify("All drivers retired!");

    }

    document.getElementById("next").disabled = true;

}

// Load original HTML drivers
loadDrivers();

updateTable();
