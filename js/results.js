
let currentMedicine = null;

const medicineDetails =
    document.getElementById("medicineDetails");

const saveButton =
    document.getElementById("saveMedicineButton");

const saveMessage =
    document.getElementById("saveMessage");


// GET THE MEDICINE ID FROM THE URL
async function loadMedicine() {

    const urlParams = new URLSearchParams(window.location.search);

    const medicineId = urlParams.get("id");

    if (!medicineId) {

        medicineDetails.textContent = "No medication selected.";
        saveButton.disabled = true;
        return;

    }

    const { data, error } = await window.db
        .from("medicines")
        .select("*")
        .eq("id", medicineId)
        .single();

    if (error) {

        medicineDetails.textContent = error.message;
        saveButton.disabled = true;
        return;

    }

    currentMedicine = data;

    const title = document.createElement("h3");
    title.textContent = data.name;

    medicineDetails.appendChild(title);

    addDetail("Strength", data.strength);
    addDetail("Form", data.form);
    addDetail("Active Ingredients", data.active_ingredients);
    addDetail("Inactive Ingredients", data.inactive_ingredients);
    addDetail("Gluten Status", data.gluten_status);
    addDetail("Notes", data.notes);
    addDetail("Source", data.source);

}


// DISPLAY MEDICATION INFORMATION
function addDetail(label, value) {

    const paragraph = document.createElement("p");

    const bold = document.createElement("strong");
    bold.textContent = label + ": ";

    const text = document.createTextNode(value || "Not provided");

    paragraph.append(bold, text);

    medicineDetails.appendChild(paragraph);

}


// SAVE MEDICATION
saveButton.addEventListener("click", async function() {

    if (!currentMedicine) {
        return;
    }

    const { data, error: userError } =
        await window.db.auth.getUser();

    if (userError || !data.user) {

        saveMessage.textContent = "Please log in first.";
        return;

    }

    const { error } = await window.db
        .from("saved_medicines")
        .insert({

            user_id: data.user.id,
            medicine_id: currentMedicine.id

        });

    if (error) {

        if (error.code === "23505") {

            saveMessage.textContent =
                "This medication is already saved.";

        } else {

            saveMessage.textContent = error.message;

        }

    } else {

        saveMessage.textContent =
            "Medication successfully saved!";

    }

});


loadMedicine();
