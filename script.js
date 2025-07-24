document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskName = document.getElementById("taskName");
  const taskTime = document.getElementById("taskTime");
  const taskCategory = document.getElementById("taskCategory");
  const taskList = document.getElementById("taskList");
  const totalTimeEl = document.getElementById("totalTime");

  // Load sounds
  const addSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_a447d19b3c.mp3");

  const ambientSound = new Audio("sounds/ambient.mp3");
  ambientSound.loop = true;
  ambientSound.volume = 0.2;

  let totalTime = 0;

  // Start ambient sound when user interacts
  document.body.addEventListener("click", () => {
    if (ambientSound.paused) {
      ambientSound.play().catch(() => {}); // Suppress autoplay errors
    }
  }, { once: true });

  function updateTotalTime(time) {
    totalTime += time;
    totalTimeEl.textContent = totalTime;
  }

  function createSparks(x, y) {
    for (let i = 0; i < 10; i++) {
      const spark = document.createElement("div");
      spark.className = "spark";
      document.body.appendChild(spark);

      const size = Math.random() * 5 + 5;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;

      setTimeout(() => spark.remove(), 1000);
    }
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = taskName.value.trim();
    const time = parseInt(taskTime.value);
    const category = taskCategory.value;

    if (name === "" || isNaN(time) || time <= 0) return;

    const li = document.createElement("li");
    li.innerHTML = `<strong>${name}</strong> - ${time} min <span class="category">${category}</span>`;
    li.classList.add("task-item");

    taskList.appendChild(li);
    updateTotalTime(time);

    const rect = e.submitter.getBoundingClientRect();
    createSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // 🔊 Play sound
    addSound.currentTime = 0;
    addSound.play().catch(() => {});

    taskForm.reset();
  });

  // Bubble animation
  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    document.body.appendChild(bubble);
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${10 + Math.random() * 10}s`;
  }
});
