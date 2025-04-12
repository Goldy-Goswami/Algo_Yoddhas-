window.onload = function () {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const stored = localStorage.getItem("targets");
    if (stored) {
      const targets = JSON.parse(stored);
      targets.forEach(t => {
        renderTarget(t);
        renderDisplay(t);
      });
    }

    setInterval(checkDeadlines, 1000);
  };

  function checkDeadlines() {
    const targets = getTargets();
    const now = new Date();

    targets.forEach((t, index) => {
      const divs = document.querySelectorAll(.target[data-id="${t.id}"]);
      if (t.deadline && t.time) {
        const targetTime = new Date(${t.deadline}T${t.time});
        if (now >= targetTime) {
          divs.forEach(d => d.classList.add("overdue"));
          if (!t.notified) {
            showNotification(t.title);
            targets[index].notified = true;
            saveToStorage(targets);
          }
        }
      }
    });
  }

  function showNotification(title) {
    if (Notification.permission === "granted") {
      new Notification("🎯 Target Due!", {
        body: It's time to complete: ${title},
        icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png"
      });
      document.getElementById("notifySound").play();
    }
  }

  function saveToStorage(targets) {
    localStorage.setItem("targets", JSON.stringify(targets));
  }

  function getTargets() {
    const stored = localStorage.getItem("targets");
    return stored ? JSON.parse(stored) : [];
  }

  function addTarget() {
    const title = document.getElementById("targetTitle").value.trim();
    const desc = document.getElementById("targetDescription").value.trim();
    const deadline = document.getElementById("targetDeadline").value;
    const time = document.getElementById("targetTime").value;

    if (title === "" || desc === "") {
      alert("Please fill in the title and description!");
      return;
    }

    const now = new Date().toLocaleString();
    const target = {
      id: Date.now(),
      title,
      desc,
      deadline,
      time,
      timestamp: now,
      notified: false
    };

    const targets = getTargets();
    targets.push(target);
    saveToStorage(targets);
    renderTarget(target);
    renderDisplay(target);

    document.getElementById("targetTitle").value = "";
    document.getElementById("targetDescription").value = "";
    document.getElementById("targetDeadline").value = "";
    document.getElementById("targetTime").value = "";
  }

  function renderTarget(target) {
    const targetList = document.getElementById("targetList");
    const targetDiv = document.createElement("div");
    targetDiv.className = "target";
    targetDiv.setAttribute("data-id", target.id);
    targetDiv.innerHTML = `
      <div class="display-mode">
        <strong class="title">${target.title}</strong>
        <p class="desc">${target.desc}</p>
        <div class="timestamp">Added on: ${target.timestamp}</div>
        ${target.deadline ? `<div class="deadline">Deadline: ${target.deadline} ${target.time ? ⏰ ${target.time} : ""}</div>` : ""}
        <div class="actions">
          <button onclick="enterEditMode(${target.id})">Edit</button>
          <button class="delete" onclick="deleteTarget(${target.id})">Delete</button>
        </div>
      </div>
    `;
    targetList.appendChild(targetDiv);
  }

  function renderDisplay(target) {
    const displayList = document.getElementById("displayList");
    const displayDiv = document.createElement("div");
    displayDiv.className = "target";
    displayDiv.setAttribute("data-id", target.id);
    displayDiv.innerHTML = `
      <strong>${target.title}</strong>
      <p>${target.desc}</p>
      <div class="timestamp">Added on: ${target.timestamp}</div>
      ${target.deadline ? `<div class="deadline">Deadline: ${target.deadline} ${target.time ? ⏰ ${target.time} : ""}</div>` : ""}
    `;
    displayList.appendChild(displayDiv);
  }

  function deleteTarget(id) {
    const targets = getTargets().filter(t => t.id !== id);
    saveToStorage(targets);
    document.querySelectorAll(.target[data-id='${id}']).forEach(el => el.remove());
  }

  function enterEditMode(id) {
    const targetDiv = document.querySelector(#formContainer .target[data-id ='${id}']);
    const target = getTargets().find(t => t.id === id);
    targetDiv.innerHTML = `
      <input class="edit-input" type="text" id="editTitle-${id}" value="${target.title}" />
      <textarea class="edit-input" id="editDesc-${id}">${target.desc}</textarea>
      <input class="edit-input" type="date" id="editDeadline-${id}" value="${target.deadline || ''}" />
      <input class="edit-input" type="time" id="editTime-${id}" value="${target.time || ''}" />
      <div class="actions">
        <button onclick="saveEdit(${id})">Save</button>
        <button class="delete" onclick="cancelEdit(${id})">Cancel</button>
      </div>
    `;
  }

  function saveEdit(id) {
    const title = document.getElementById(editTitle-${id}).value.trim();
    const desc = document.getElementById(editDesc-${id}).value.trim();
    const deadline = document.getElementById(editDeadline-${id}).value;
    const time = document.getElementById(editTime-${id}).value;

    if (title === "" || desc === "") {
      alert("Title and description cannot be empty!");
      return;
    }

    const updatedTargets = getTargets().map(t => {
      if (t.id === id) {
        return { ...t, title, desc, deadline, time, notified: false };
      }
      return t;
    });

    saveToStorage(updatedTargets);
    document.getElementById("targetList").innerHTML = "";
    document.getElementById("displayList").innerHTML = "";
    updatedTargets.forEach(t => {
      renderTarget(t);
      renderDisplay(t);
    });
  }

  function cancelEdit(id) {
    const target = getTargets().find(t => t.id === id);
    const targetDiv = document.querySelector(#formContainer .target[data-id='${id}']);
    targetDiv.remove();
    renderTarget(target);
  }

  function toggleView(showForm = false) {
    const form = document.getElementById("formContainer");
    const display = document.getElementById("displayOnlyContainer");

    if (showForm) {
      form.style.display = "block";
      display.style.display = "none";
    } else {
      form.style.display = "none";
      display.style.display = "block";
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }