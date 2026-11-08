let drivers = [];
let currentLap = 0;
let raceStarted = false;
let raceFinished = false;

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
      row: row,
    });
  });
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);

  let remaining = (seconds % 60).toFixed(3).padStart(6, "0");

  return minutes + ":" + remaining;
}

function updateTable() {
  drivers.forEach((driver) => {
    let cells = driver.row.querySelectorAll("td");

    cells[4].textContent = driver.tyres;
    cells[5].textContent = formatTime(driver.time);
    cells[6].textContent = driver.status;
  });

  let table = document.querySelector("table");
  let sortedDrivers = [...drivers].sort((a, b) => {
    if (a.retired && !b.retired) return 1;
    if (!a.retired && b.retired) return -1;

    return a.time - b.time;
  });

  sortedDrivers.forEach((driver) => {
    table.appendChild(driver.row);
  });
}

function notify(message) {
  let notifications = document.getElementById("notifications");

  let p = document.createElement("p");

  p.textContent = message;

  notifications.prepend(p);
}

function calculateLapTime(driver) {
  let time = 100;

  time -= (driver.speed - 300) * 0.12;

  time -= (driver.skill - 80) * 0.08;

  if (driver.tyres === "Soft") {
    time -= 1.5;
  } else {
    time += 0.5;
  }

  time += Math.random() * 2 - 1;

  return time;
}

function pitStop(driver) {
  let oldTyres = driver.tyres;

  if (driver.tyres === "Soft") {
    driver.tyres = "Hard";
  } else {
    driver.tyres = "Soft";
  }

  driver.time += 22;

  driver.pitStops++;

  driver.status = "Pit Stop";

  notify(
    driver.name +
      " entered the pit and changed tyres: " +
      oldTyres +
      " -> " +
      driver.tyres,
  );
}

document.getElementById("start").addEventListener("click", function () {
  if (raceStarted) return;

  raceStarted = true;

  document.getElementById("start").disabled = true;

  document.getElementById("notifications").innerHTML = "";

  drivers.forEach((driver) => {
    driver.time = 0;
    driver.status = "Racing";
    driver.retired = false;
    driver.pitStops = 0;

    if (driver.tyres === "Medium") {
      driver.tyres = "Hard";
    }
  });

  notify("The Formula 1 race has started!");

  updateTable();
});

document.getElementById("next").addEventListener("click", function () {
  if (!raceStarted || raceFinished) return;

  currentLap++;

  document.getElementById("lap").textContent = "Lap: " + currentLap + " / 10";

  notify("Lap " + currentLap + " started!");

  let safetyCar = Math.random() < 0.15;

  if (safetyCar) {
    notify("SAFETY CAR! Drivers must slow down!");
  }

  drivers.forEach((driver) => {
    if (driver.retired) return;

    driver.status = "Racing";

    let lapTime = calculateLapTime(driver);

    if (safetyCar) {
      lapTime += 8;
    }

    if (Math.random() < 0.08) {
      lapTime += 5;

      driver.status = "Spun";

      notify(driver.name + " spun off the track!");
    }

    driver.time += lapTime;

    if (currentLap === 5 && driver.pitStops === 0) {
      pitStop(driver);
    }

    if (currentLap >= 6 && Math.random() < 0.02) {
      driver.retired = true;
      driver.status = "Retired";

      notify(driver.name + " has left the race!");
    }
  });

  updateTable();

  notify("Lap " + currentLap + " finished!");

  if (currentLap === 10) {
    finishRace();
  }
});

function finishRace() {
  raceFinished = true;

  let finishedDrivers = drivers
    .filter((driver) => !driver.retired)
    .sort((a, b) => a.time - b.time);

  finishedDrivers.forEach((driver) => {
    driver.status = "Finished";
  });

  updateTable();

  if (finishedDrivers.length > 0) {
    let winner = finishedDrivers[0];

    document.getElementById("winner").textContent =
      "Winner: " + winner.name + " - " + winner.team;

    notify("RACE FINISHED! Winner: " + winner.name);
  } else {
    document.getElementById("winner").textContent = "No winner!";

    notify("All drivers retired!");
  }

  document.getElementById("next").disabled = true;
}

loadDrivers();

updateTable();
