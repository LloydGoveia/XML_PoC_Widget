# XML PoC Widget for SAP Service Cloud CTI Integration

This project is a **Proof of Concept (PoC)** widget designed to simulate CTI (Computer Telephony Integration) calls for **SAP Service Cloud**.  
It demonstrates how XML payloads can be constructed and sent to the **Live Activity** or **Agent Desktop** environments for testing integrations.

---

## 📁 Project Structure

| File | Description |
|------|--------------|
| `index.html` | Main HTML page that hosts the CTI Widget UI |
| `style.css` | Stylesheet for layout and UI elements |
| `script.js` | Core JavaScript file that generates and sends XML payloads to the parent window |

---

## ⚙️ How It Works

1. The widget allows you to simulate **inbound** and **outbound** call events.
2. On form submission, it builds an XML payload and posts it to the parent window using `window.postMessage()`.
3. This simulates how an external CTI provider would communicate with the SAP Service Cloud environment.

---

## 🚀 How to Deploy

### Option 1 — Manual Upload
1. Copy the three files (`index.html`, `style.css`, `script.js`) to a web server that can host static HTML files.
2. Note the **public URL** of your hosted widget (e.g. `https://yourserver.com/XML_PoC_Widget/index.html`).

### Option 2 — GitHub Pages
1. Go to **Settings → Pages**.
2. Under **Build and Deployment**, select:
   - **Source:** Deploy from a branch  
   - **Branch:** `main`  
   - **Folder:** `/ (root)`
3. Click **Save**.
4. After a few minutes, your widget will be available at: https://<your-username>.github.io/XML-PoC-Widget/
