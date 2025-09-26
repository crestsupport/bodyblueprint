document.getElementById("userForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  localStorage.setItem("userData", JSON.stringify(data));
  alert("Form saved! Now choose your plan.");
});

function generatePlan() {
  const data = JSON.parse(localStorage.getItem("userData"));
  if (!data) return;

  const workout = generateWorkout(data);
  const nutrition = generateNutrition(data);
  document.getElementById("plan").innerHTML = workout + nutrition;
}

function generateWorkout({ age, gender, goal, level }) {
  let plan = "";
  if (goal === "weight_loss") {
    plan = level === "beginner" ? "3x/week full-body circuits + walking" :
           level === "intermediate" ? "HIIT + resistance 4x/week" :
           "MetCon + heart rate zones + carb cycling";
  } else if (goal === "muscle_gain") {
    plan = level === "beginner" ? "Push/pull/legs 3x/week" :
           level === "intermediate" ? "Hypertrophy 5x/week" :
           "Periodized strength + volume tracking";
  } else {
    plan = level === "beginner" ? "Upper/lower split + core" :
           level === "intermediate" ? "Progressive overload + tempo" :
           "Precision sculpting + recovery optimization";
  }
  return `<h3>Workout Plan</h3><p>${plan}</p>`;
}

function generateNutrition({ gender, age, weight, height, goal }) {
  weight = parseFloat(weight);
  height = parseFloat(height);
  age = parseInt(age);
  const bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const multiplier = goal === "weight_loss" ? 1.2 : goal === "toning" ? 1.4 : 1.6;
  const calories = Math.round(bmr * multiplier);
  const protein = Math.round(weight * (goal === "muscle_gain" ? 2.0 : 1.5));
  return `<h3>Nutrition Plan</h3>
    <p>Calories: ${calories} kcal/day</p>
    <p>Protein: ${protein}g/day</p>
    <p>Meal Timing: 4–5 meals/day with protein in each</p>`;
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const data = JSON.parse(localStorage.getItem("userData"));
  const workout = generateWorkout(data).replace(/<[^>]+>/g, "");
  const nutrition = generateNutrition(data).replace(/<[^>]+>/g, "");

  doc.setFontSize(18);
  doc.text("Body Blueprint Plan", 20, 20);
  doc.setFontSize(14);
  doc.text("Workout Plan:", 20, 40);
  doc.text(workout, 20, 50);
  doc.text("Nutrition Plan:", 20, 70);
  doc.text(nutrition, 20, 80);
  doc.save("BodyBlueprint_Plan.pdf");
}

if (document.getElementById("plan")) generatePlan();
