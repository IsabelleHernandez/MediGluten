
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const medicineName =
        document.getElementById("medicineSearch").value.trim();

    const results = document.getElementById("searchResults");

    results.textContent = "Searching...";

    const { data, error } = await window.db
        .from("medicines")
        .select("id, name, strength, form, gluten_status")
        .ilike("name", "%" + medicineName + "%")
        .order("name");

    results.replaceChildren();

    if (error) {

        results.textContent = error.message;
        return;

    }

    if (data.length === 0) {

        results.textContent = "No medications found.";
        return;

    }

    data.forEach(function(medicine) {

        const item = document.createElement("div");
        item.className = "medicine-card";

        const name = document.createElement("h3");
        name.textContent = medicine.name;

        const strength = document.createElement("p");
        strength.textContent = "Strength: " +
            (medicine.strength || "Not provided");

        const status = document.createElement("p");
        status.textContent = "Gluten Status: " +
            (medicine.gluten_status || "Unable to determine");

        const link = document.createElement("a");
        link.href = "results.html?id=" + medicine.id;
        link.textContent = "View Details";

        item.append(name, strength, status, link);

        results.appendChild(item);

    });

});
