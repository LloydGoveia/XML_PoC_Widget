// Define the global c4c object for CTI integration
var c4c = c4c || {};
c4c.cti = c4c.cti || {};
c4c.cti.integration = function () { };

/**
 * Constructs an XML payload from the given parameters
 * @param {Object} parameters - Key-value pairs to include in the payload
 * @returns {string} - XML payload as a string
 */
c4c.cti.integration.prototype._formXMLPayload = function (parameters) {
    var sPayload = "<?xml version=\"1.0\" encoding=\"utf-8\"?><payload>";
    Object.entries(parameters).forEach(([key, value]) => {
        // If Action is "ACCEPT", leave the Action field empty
        if (key === "Action" && value === "ACCEPT") {
            value = ""; // Set to empty string for ACCEPT
        }
        if (value && value.trim() !== "") {
            var tag = `<${key}>${value}</${key}>`;
            sPayload += tag;
        }
    });
    sPayload += "</payload>";
    console.log("Constructed Payload:", sPayload);
    return sPayload;
};

/**
 * Sends the constructed XML payload to the parent window
 * @param {Object} parameters - Data to be sent in the payload
 */
c4c.cti.integration.prototype.sendIncomingCalltoC4C = function (parameters) {
    var payload = this._formXMLPayload(parameters);
    handlePostMessage(payload, "XML");
};

/**
 * Handles posting the XML payload to the parent window with error handling
 * @param {string} payload - XML payload as a string
 * @param {string} type - Type of payload (e.g., XML)
 */
function handlePostMessage(payload, type) {
    try {
        console.log("Sending Payload to Parent Window:", payload);
        window.parent.postMessage(payload, "*");
        displayPayloadMessage(payload);
    } catch (error) {
        console.error("Error Posting Message to Parent Window:", error);
        alert("An error occurred while posting the message: " + error.message);
    }
}

/**
 * Handles form submission to collect data, construct the payload, and send it
 * @param {Event} event - Form submission event
 */
function handleSendCall(event) {
    event.preventDefault();

    // Collect data from the form fields
    var parameters = {
        Type: document.getElementById("type").value,
        EventType: document.getElementById("eventType").value,
        Action: document.getElementById("action").value,
        ANI: document.getElementById("ani").value,
        Email: document.getElementById("email").value || "",
        Subject: document.getElementById("subject").value || "",
        Text: document.getElementById("text").value || "",
        Transcript: document.getElementById("type").value === "CHAT" ? document.getElementById("transcript").value || "" : "",
        ExternalReferenceID: document.getElementById("externalReferenceID").value || "",
        RecordingId: document.getElementById("recordingId").value || "",
        ExternalOriginalReferenceID: document.getElementById("externalOriginalReferenceID").value || "",
        Custom_1: document.getElementById("custom1").value || "",
        Custom_2: document.getElementById("custom2").value || "",
        Custom_3: document.getElementById("custom3").value || "",
        Custom_4: document.getElementById("custom4").value || "",
    };

    // Create an instance of the CTI integration and send the payload
    var integration = new c4c.cti.integration();
    integration.sendIncomingCalltoC4C(parameters);
}

/**
 * Generates a random GUID and assigns it to the specified field
 * @param {string} fieldId - The ID of the field to populate with the GUID
 */
function generateRandomGUID(fieldId) {
    var guid = crypto.randomUUID().replace(/-/g, '').toUpperCase().substring(0, 35);
    document.getElementById(fieldId).value = guid;

    // If the field is ExternalReferenceID, copy it to Call Recording if the checkbox is checked
    if (fieldId === "externalReferenceID") {
        var copyToRecordingId = document.getElementById("copyToRecordingId").checked;
        if (copyToRecordingId) {
            document.getElementById("recordingId").value = "REC_" + guid;
        }
    }
}

/**
 * Resets the form and clears all messages
 */
function resetForm() {
    document.getElementById("callForm").reset();
    document.getElementById("payloadMessage").innerText = "";
}

/**
 * Displays the XML payload message in the UI
 * @param {string} payload - XML payload to display
 */
function displayPayloadMessage(payload) {
    var payloadDiv = document.getElementById("payloadMessage");
    payloadDiv.innerText = payload;
    payloadDiv.style.display = "block";
}

/**
 * Placeholder for future interaction types
 * Example: Handling Facebook, WhatsApp, or Instagram Messaging
 * @param {Object} interactionData - Data specific to the interaction type
 */
function handleSocialMediaInteraction(interactionData) {
    // Example: Add logic for processing interactionData
    console.log("Handling Social Media Interaction:", interactionData);

    // Construct XML payload for social media
    var socialPayload = "<?xml version=\"1.0\" encoding=\"utf-8\"?><payload>";
    Object.entries(interactionData).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
            var tag = `<${key}>${value}</${key}>`;
            socialPayload += tag;
        }
    });
    socialPayload += "</payload>";

    console.log("Constructed Social Media Payload:", socialPayload);

    // Send the payload to the parent window
    handlePostMessage(socialPayload, "XML");
}

/**
 * Steps to Extend Widget for Additional Interaction Types:
 * 1. Add a new interaction type to the Type dropdown in `index.html`.
 *    - Example: Add `<option value="FACEBOOK">FACEBOOK</option>`.
 * 2. Modify the `handleSendCall` function:
 *    - Add conditional logic to handle specific interaction types.
 *    - Example: Call `handleSocialMediaInteraction` for social media types.
 * 3. Update `_formXMLPayload` to handle additional fields unique to the new type.
 *    - Example: Add tags like `<Platform>` or `<MessageID>` for social media.
 * 4. Test the integration by embedding the widget in a parent system.
 *    - Ensure the parent system processes the payload correctly.
 */
