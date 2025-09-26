function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function downloadMasterGuide() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const tier = localStorage.getItem("selectedTier");

  if (!tier) {
    alert("No plan selected. Please return to the homepage and choose a plan.");
    return;
  }

  doc.setFontSize(18);
  doc.text(`Body Blueprint – ${capitalize(tier)} Master Guide`, 20, 20);
  doc.setFontSize(12);
  doc.text("⚠️ Consult your medical professional before starting any nutrition or fitness program.", 20, 30);

  // Nutrition Intro
  doc.setFontSize(14);
  doc.text("🍽️ Nutrition Strategy", 20, 40);
  doc.setFontSize(11);
  doc.text(getNutritionIntro(tier), 20, 50);

  // Meals
  const meals = getMealsByTier(tier);
  let y = 60;
  ["Breakfasts", "Lunches", "Dinners"].forEach((section) => {
    doc.setFontSize(13);
    doc.text(`🍴 ${section}`, 20, y);
    y += 10;
    meals[section.toLowerCase()].forEach((meal, i) => {
      doc.setFontSize(10);
      doc.text(`${i + 1}. ${meal.name} – ${meal.calories} kcal`, 20, y);
      y += 6;
      doc.text(`Prep: ${meal.prepTime} | Ingredients: ${meal.ingredients.join(", ")}`, 20, y);
      y += 8;
    });
    y += 10;
  });

  // Fitness
  const fitness = getFitnessByTier(tier);
  doc.setFontSize(14);
  doc.text("🏋️ Fitness Strategy", 20, y);
  y += 10;

  ["Non-Gym", "Gym"].forEach((mode) => {
    doc.setFontSize(12);
    doc.text(`${mode} Workouts`, 20, y);
    y += 8;
    fitness[mode.toLowerCase()].forEach((exercise, i) => {
      doc.setFontSize(10);
      doc.text(`${i + 1}. ${exercise}`, 20, y);
      y += 6;
    });
    y += 10;
  });

  // Supplements
  doc.setFontSize(12);
  doc.text("💊 Supplement Guidance", 20, y);
  y += 8;
  fitness.supplements.forEach((supplement) => {
    doc.setFontSize(10);
    doc.text(`• ${supplement}`, 20, y);
    y += 6;
  });

  doc.save(`body-blueprint-${tier}-guide.pdf`);
}

// Placeholder functions for content
function getMealsByTier(tier) {
  // Return the full meal arrays for each tier
  // You already have these from our previous messages
}

function getFitnessByTier(tier) {
  // Return the full fitness arrays for each tier
  // You already have these from our previous messages
}

function getNutritionIntro(tier) {
  // Return the nutrition intro string for each tier
  // You already have these from our previous messages
}
