// @flow
import React, { useState, useEffect } from "react";
import StackGrid from "../../src/components/StackGrid";

// Generate random sized content for demonstration purposes
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomHeight = () => {
  return 150 + Math.floor(Math.random() * 250);
};

// Demo item component with configurable height
const DemoItem = ({ color, height, index }) => (
  <div
    style={{
      backgroundColor: color,
      height: `${height}px`,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "18px",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
      boxSizing: "border-box",
      padding: "15px",
      margin: "0 0 15px 0",
    }}
  >
    <div style={{ textAlign: "center" }}>
      Item {index}
      <br />
      <small style={{ opacity: 0.8 }}>{height}px</small>
    </div>
  </div>
);

// Generate mock data for our grid
const generateItems = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    key: `item-${i}`,
    color: getRandomColor(),
    height: getRandomHeight(),
    index: i + 1,
  }));
};

const SimplifiedDemo = () => {
  const [items, setItems] = useState(generateItems(20));
  const [columnWidth, setColumnWidth] = useState(200);
  const [gutterSize, setGutterSize] = useState(10);
  const [isRTL, setIsRTL] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(false);

  // Controls for demonstration
  const addItems = () => {
    const newItems = generateItems(5).map((item) => ({
      ...item,
      key: `item-${items.length + parseInt(item.key.split("-")[1], 10)}`,
      index: items.length + parseInt(item.key.split("-")[1], 10) + 1,
    }));
    setItems([...items, ...newItems]);
  };

  const removeItems = () => {
    if (items.length > 5) {
      setItems(items.slice(0, items.length - 5));
    }
  };

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    setItems(shuffled);
  };

  // Grid ref for manual updates
  let gridRef = null;

  return (
    <div>
      <h1>React Stack Grid Demo</h1>
      <p>
        This is a simplified demo showing the core grid functionality without
        animations or transitions.
      </p>

      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ marginRight: 10 }}>Column Width:</label>
          <input
            type="range"
            min="100"
            max="400"
            value={columnWidth}
            onChange={(e) => setColumnWidth(Number(e.target.value))}
          />
          <span style={{ marginLeft: 10 }}>{columnWidth}px</span>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ marginRight: 10 }}>Gutter Size:</label>
          <input
            type="range"
            min="0"
            max="50"
            value={gutterSize}
            onChange={(e) => setGutterSize(Number(e.target.value))}
          />
          <span style={{ marginLeft: 10 }}>{gutterSize}px</span>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            <input
              type="checkbox"
              checked={isRTL}
              onChange={() => setIsRTL(!isRTL)}
            />
            RTL (Right-to-Left)
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            <input
              type="checkbox"
              checked={isHorizontal}
              onChange={() => setIsHorizontal(!isHorizontal)}
            />
            Horizontal Layout
          </label>
        </div>

        <div>
          <button onClick={addItems} style={{ marginRight: 10 }}>
            Add Items
          </button>
          <button onClick={removeItems} style={{ marginRight: 10 }}>
            Remove Items
          </button>
          <button onClick={shuffleItems} style={{ marginRight: 10 }}>
            Shuffle Items
          </button>
          <button
            onClick={() => gridRef && gridRef.updateLayout()}
            style={{ marginRight: 10 }}
          >
            Update Layout
          </button>
        </div>
      </div>

      <div style={{ padding: "20px 0" }}>
        <StackGrid
          gridRef={(ref) => {
            gridRef = ref;
          }}
          columnWidth={columnWidth}
          gutterWidth={gutterSize}
          gutterHeight={gutterSize}
          monitorImagesLoaded={true}
          rtl={isRTL}
          horizontal={isHorizontal}
        >
          {items.map((item) => (
            <DemoItem
              key={item.key}
              color={item.color}
              height={item.height}
              index={item.index}
            />
          ))}
        </StackGrid>
      </div>
    </div>
  );
};

export default SimplifiedDemo;
