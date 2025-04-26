
# 🗺️ Store Locator

Displays, in real time, an interactive **OpenStreetMap** interface—built with **React** and **TypeScript**—that highlights the 🟢 **nearest store** stocking the requested product, along with all other provided store locations where the item is either 🟡 *available* or 🔴 *out of stock*.

**Live Demo**: https://store-locator-react.netlify.app

**Loom Walk‑through**: https://www.loom.com/share/64c3eca3042c4e2293b2ab826c5437a0

---

## ✨ Key Features

| Feature                            | Description                                                                                                   |
| ------------------------------     | ------------------------------------------------------------------------------------------------------------- |
| **Interactive map**                | Built with **React 18** + **react-leaflet**. Allows you to pan, zoom, explore and re-center with smooth animations on top of OpenStreetMap tiles.           |
| **Current location detection**     | Uses `navigator.geolocation` to drop a blue pin + accuracy circle showing where you are.                       |
| **Product selection**              | Ant Design `<Select>` (dropdown picker), lists all unique products across stores - markers only appear once a product is chosen.  |
| **When you select a product**       | Map auto-centres to the **nearest store** marker, the marker shows an **address tooltip** - when you click on it, it opens a popup showing all details like **store name**, **address**, **list of available products** as well as the **distance in kilometers** (distance appears only in the nearest store marker's popup). |
| **Colour-coded store markers**     | • 🟢 nearest store that *has* the item  • 🟡 other stores that *have* it  • 🔴 stores that don’t have it      |
| **Nearest store calculation**      | Distance calculation via a custom **haversine** helper.  |
| **Static data, no back-end involved**         | Six sample stores with realistic Lat/Lng + product lists live in `src/data/useStores.ts` — easy to extend     |

---

## 🏗️ Tech Stack

| Layer     | Packages / Tools                                  |
| --------- | ------------------------------------------------- |
| Front-end | `react`, `typescript`, `react-leaflet`, `leaflet` |
| UI kit    | `antd`                                            |
| Icons     | `@fortawesome/react-fontawesome`, Custom Icons    |
| Tooling   | `create-react-app`, ESLint, Prettier              |

(See `package.json` for full versions)

---

## Questions/Answers

#### Q1: What if we want to introduce the back-end and extend the implementaion?
**A**: The code is written in a way that will allow possible future extension without any need of extensive refactoring.

#### Q2: How will you handle a situation when there's no store that has the item ordered available?
**A**: Currently, it is implemented like if you select either **Keyboard** or **Mouse** option from product picker drop-down, it shows all of the store markers in red color, because no store has any of these two items available.

#### Q3: How will you handle error conditions where the backend server fails to respond with data (e.g the API call fails with server error)?
**A**: For now the front-end error of Geolocation is already handled in the app (shows a red banner on top). Now, after introducing the back-end APIs:
* If data is not found, like if `products` key is empty or not available, this situation is also handled and won't crash the app.
* If the API call fails with a server error, we can introduce toasts to inform the user about the error, something like **No stores found!** / **An error occurred!**. in such case, the dropdown can stay disabled, but the map can stay interactive.

#### Q4: What needs to be done if you ask user to enter his/her current location by entering an address?

---

## 🚀 Getting Started

### Prerequisites

- **Node >= 16**
- **Yarn**

### Installation

```bash
git clone https://github.com/ahsanakhtar91/store-locator.git
cd store-locator
yarn install
yarn start
```