
async function loadSavedMedicines() {

    const savedList =
        document.getElementById("savedMedicines");

    savedList.textContent = "Loading saved medications...";

    const { data, error } = await window.db
        .from("saved_medicines")
        .select(`
            id,
            created_at,
            medicines (
                id,
                name,
                strength,
                form,
                gluten_status
            )
        `)
        .order("created_at", { ascending: false });

    savedList.replaceChildren();

    if (error) {

        savedList.textContent = error.message;
        return;

    }

    if (data.length === 0) {

        savedList.textContent =
            "You have not saved any medications yet.";

        return;

    }

    data.forEach(function(savedItem) {

        const medicine = savedItem.medicines;

        if (!medicine) {
            return;
        }

        const item = document.createElement("div");
        item.className = "medicine-card";

        const name = document.createElement("h3");
        name.textContent = medicine.name;

        const strength = document.createElement("p");
        strength.textContent =
            "Strength: " + (medicine.strength || "Not provided");

        const status = document.createElement("p");
        status.textContent =
            "Gluten Status: " +
            (medicine.gluten_status || "Unable to determine");

        const link = document.createElement("a");
        link.href = "results.html?id=" + medicine.id;
        link.textContent = "View Details";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.type = "button";

        removeButton.addEventListener("click", async function() {

            const { error } = await window.db
                .from("saved_medicines")
                .delete()
                .eq("id", savedItem.id);

            if (error) {

                alert(error.message);

            } else {

                loadSavedMedicines();

            }

        });

        item.append(
            name,
            strength,
            status,
            link,
            removeButton
        );

        savedList.appendChild(item);

    });

}

loadSavedMedicines();
