
# 🗺️ Store Locator

Locate the nearest store that has the product in stock which you need – in real time, right on an interactive OpenStreetMap view.

**Live Demo**: https://store-locator-react.netlify.app

**Loom Video Demo**: https://www.loom.com/share/64c3eca3042c4e2293b2ab826c5437a0

---

The code is written in a way that will allow possible future extension without any need of extensive refactoring.

## ✨ Key Features

| Feature                        | Description                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Interactive map**            | Built with **React 18** + **react-leaflet 4**; pan, zoom, and explore on top of OpenStreetMap tiles           |
| **Current-location detection** | Uses `navigator.geolocation` to drop a blue pin + accuracy circle showing where you are                       |
| **Product picker**             | Ant Design `<Select>` lists all unique products across stores; markers only appear once a product is chosen   |
| **Colour-coded store markers** | • 🟢 nearest store that *has* the item  • 🟡 other stores that *have* it  • 🔴 stores that don’t stock it     |
| **Nearest-store calculation**  | Great-circle distance via a custom **Haversine** helper; map auto-centres and marker pops a distance tooltip  |
| **Dummy data, no backend**     | Six sample stores with realistic Lat/Lng + product lists live in `src/data/useStores.ts` — easy to extend     |

---

## 🏗️ Tech Stack

| Layer     | Packages / Tools                                  |
| --------- | ------------------------------------------------- |
| Front-end | `react`, `typescript`, `react-leaflet`, `leaflet` |
| UI kit    | `antd`                                            |
| Icons     | `@fortawesome/react-fontawesome`                  |
| Tooling   | Create-React-App 5, ESLint, Prettier              |

(See `package.json` for full versions)&#x20;

---

## 🚀 Getting Started

### Prerequisites

- **Node >= 16** (CRA 5 requirement)
- **Yarn**

### Installation

```bash
git clone https://github.com/ahsanakhtar91/store-locator.git
cd store-locator
yarn install
yarn start
```
