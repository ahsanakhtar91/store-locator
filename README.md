# 🗺️ Store Locator

Displays, in real time, an interactive **OpenStreetMap** interface—built with **React** and **TypeScript**—that highlights the 🟢 **nearest store** stocking the requested product, along with all other provided store locations where the item is either 🟡 *available* or 🔴 *out of stock*.

🔴 **Live Demo**: https://store-locator-react.netlify.app

📹 **Loom Walk‑through**: https://www.loom.com/share/64c3eca3042c4e2293b2ab826c5437a0

---

## ✨ Key Features

| Feature                            | Description                                                                                                   |
| ------------------------------     | ------------------------------------------------------------------------------------------------------------- |
| **Interactive map**                | Built with **React 18** + **react-leaflet**. Allows you to pan, zoom, explore and re-center with smooth animations on top of OpenStreetMap tiles.           |
| **Current location detection**     | Uses `navigator.geolocation` to drop a blue pin + accuracy circle showing where you are.                       |
| **Product selection**              | Ant Design `<Select>` (dropdown picker), lists all unique products across stores - markers appear only once a product is chosen.  |
| **When you select a product**      | Map auto-centres to the **nearest store** marker, the marker shows an **address tooltip** - when you click on it, it opens a popup showing all details like **store name**, **address**, **list of available products** as well as the **distance in kilometers** (distance appears only in the nearest store marker's popup). |
| **Colour-coded store markers**     | • 🟢 nearest store that *has* the item  • 🟡 other stores that *have* it  • 🔴 stores that don’t have it      |
| **Nearest store calculation**      | Distance calculation via a custom **haversine** helper.  |
| **Static data, no back-end**       | List of 6 sample stores with realistic coordinates/names/addresses. This list of stores (containing `products` for each store) is present in `src/data/useStores.ts` — very easy to extend, possible to swap in a real API here later with minimal code changes     |

---

## 🏗️ Tech Stack

| Layer     | Packages / Tools                                  |
| --------- | ------------------------------------------------- |
| Front-end | `react`, `typescript`, `react-leaflet`, `leaflet` |
| UI kit    | `antd`                                            |
| Icons     | `@fortawesome/react-fontawesome`, Custom Icons    |
| Tooling   | `create-react-app`, ESLint, Prettier              |

---

## 🗂️ Project Structure

    src/
    ├── components/          # Presentational + Map components
    │   ├── MapView          # <MapView> wrapper around <MapContainer>, contains most of the map related logic
    │   ├── StoreMarker      # Renders <Marker> (with its <Popup> and <Tooltip>) for a single store
    │   └── Recenter         # Imperative helper to re-center the map on the provided coordinates
    │
    ├── data/                # Static demo data + TypeScript types
    │   ├── useStores.ts     # Hook returning sample stores list (can implement API call in this hook and return the data from here)
    │   └── types.ts         # TypeScript types related to data
    │
    ├── utils/               # Pure helper functions
    │   └── utils.ts         # "getCurrentLocation", "getStoreMarkerIcon" and "haversine" functions
    │
    └── icons/               # A custom "pinLocation.svg" icon is present here.


## 📝 Questions/Answers

#### Q1: What if we want to introduce the back-end and extend the implementaion?
**A**: The code is written in a way that will allow possible future extension without any need of extensive refactoring.

#### Q2: How will you handle a situation when there's no store that has the item ordered available?
**A**: Currently, it is implemented like if you select either **Keyboard** or **Mouse** option from product picker drop-down, it shows all of the store markers in red color, because none of the stores (in the stores list) has any of these two items available.

#### Q3: How will you handle error conditions where the backend server fails to respond with data (e.g the API call fails with server error)?
**A**: For now, the front-end error in Geolocation is already handled in the app (shows a red banner on the top). After introducing the back-end APIs:
* If data is not found, like if `products` array is empty or not available, this situation is also currently handled in the project and won't crash the app.
* If the API call fails with a server error, we can introduce a toast to inform the user about the error, something like **No stores found!** / **An error occurred!**. In such case, the drop-down can stay disabled, but the map can stay interactive.

#### Q4: What needs to be done if you ask user to enter his/her current location by entering an address? How will you implement the algorithm to calculate nearest store to user location given only as street, house number, town, zip code?
**A**: These steps can be followed to implement this:
* There should be a form on UI to accept four inputs string: **street**, **house number**, **town** and **zip code**.
* Concatenate the data of all inputs (comma-separated) into one string, lets call it `address`.
* Now, using Leaflet and pure JavaScript, make an HTTP request directly to `nominatim.openstreetmap.org` with `address` in the query param named `q`:
  * `'https://nominatim.openstreetmap.org/search?format=json&q=' + address`
* For example, hit this URL: https://nominatim.openstreetmap.org/search?format=json&q=Faisal%20Mosque,%2044000,%20Islamabad
* The list of places (objects) will be returned, each having its proper `lat` (latitude) and `lon` (longitude). The first one can be picked.
* Set the latitude/longitude recieved in the last step into the `currentLocation` local state inside `src/components/MapView` component, and what's next is already in place inside this project.

---

## 🚀 Steps to run the app

### Prerequisites

- **Node >= 16**
- **Yarn**

### Clone & Run

```bash
git clone https://github.com/ahsanakhtar91/store-locator.git
cd store-locator
yarn install
yarn start
```

---

🔴 **Live Demo**: https://store-locator-react.netlify.app

📹 **Loom Walk‑through**: https://www.loom.com/share/64c3eca3042c4e2293b2ab826c5437a0

**Made By**: [Ahsan Akhtar](https://www.linkedin.com/in/m-ahsan-akhtar)