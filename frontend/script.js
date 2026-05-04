const API_BASE_URL = "http://127.0.0.1:8000";

const createTaskForm = document.getElementById("createTaskForm");
const titleInput = document.getElementById("titleInput");
const loadTasksBtn = document.getElementById("loadTasksBtn");
const messageEl = document.getElementById("message");
const taskListEl = document.getElementById("taskList");

/** Remplace les <i data-lucide="..."> par des SVG Lucide uniquement sous la liste. */
function hydrateLucideIcons() {
  if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    lucide.createIcons({ root: taskListEl });
  }
}

/** Bouton avec une icône Lucide (remplie par hydrateLucideIcons apres insertion dans le DOM). */
function iconActionButton(iconName, classNames, ariaLabel, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = classNames;
  btn.setAttribute("aria-label", ariaLabel);
  btn.title = ariaLabel;

  const iconHolder = document.createElement("i");
  iconHolder.setAttribute("data-lucide", iconName);

  btn.appendChild(iconHolder);
  btn.addEventListener("click", onClick);

  return btn;
}

async function patchTaskStatus(taskId, status) {
  messageEl.textContent = "Mise a jour du statut...";

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    await loadTasks();
    messageEl.textContent = `Statut de la tache #${taskId} mis a jour en "${status}".`;
  } catch (error) {
    messageEl.textContent =
      "Impossible de mettre a jour le statut. Verifie que le backend tourne.";
    console.error(error);
  }
}

async function deleteTaskById(taskId) {
  const ok = window.confirm(`Supprimer la tache #${taskId} ?`);
  if (!ok) {
    return;
  }

  messageEl.textContent = "Suppression...";

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    await loadTasks();
    messageEl.textContent = `Tache #${taskId} supprimee.`;
  } catch (error) {
    messageEl.textContent =
      "Impossible de supprimer la tache. Verifie que le backend tourne.";
    console.error(error);
  }
}

function renderTasks(tasks) {
  taskListEl.innerHTML = "";

  if (tasks.length === 0) {
    messageEl.textContent = "Aucune tache pour le moment.";
    return;
  }

  messageEl.textContent = `${tasks.length} tache(s) chargée(s).`;

  for (const task of tasks) {
    const item = document.createElement("li");
    item.className = "task-item";

    const main = document.createElement("div");
    main.className = "task-main";

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = `#${task.id} - ${task.title}`;

    const status = document.createElement("span");
    status.className = `status ${task.status}`;
    status.textContent = task.status;

    main.append(title, status);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    actions.appendChild(
      iconActionButton(
        "circle-check-big",
        "icon-btn",
        "Marquer comme terminee",
        () => patchTaskStatus(task.id, "done"),
      ),
    );

    actions.appendChild(
      iconActionButton(
        "loader-circle",
        "icon-btn",
        "Marquer comme en cours",
        () => patchTaskStatus(task.id, "in_progress"),
      ),
    );

    actions.appendChild(
      iconActionButton(
        "trash-2",
        "icon-btn icon-btn--delete",
        "Supprimer la tache",
        () => deleteTaskById(task.id),
      ),
    );

    item.append(main, actions);
    taskListEl.appendChild(item);
  }

  hydrateLucideIcons();
}

async function loadTasks() {
  messageEl.textContent = "Chargement...";

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    messageEl.textContent =
      "Impossible de charger les taches. Verifie que le backend tourne.";
    taskListEl.innerHTML = "";
    console.error(error);
  }
}

async function createTask(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  if (!title) {
    messageEl.textContent = "Le titre ne peut pas etre vide.";
    return;
  }

  messageEl.textContent = "Creation de la tache...";

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    titleInput.value = "";
    await loadTasks();
    messageEl.textContent = "Tache ajoutee avec succes.";
  } catch (error) {
    messageEl.textContent =
      "Impossible de creer la tache. Verifie que le backend tourne.";
    console.error(error);
  }
}

createTaskForm.addEventListener("submit", createTask);
loadTasksBtn.addEventListener("click", loadTasks);
