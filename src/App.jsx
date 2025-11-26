import React, { useState, useEffect } from "react";
import "./App.css";

const initialPages = [
  { id: 1, name: "Page 1", checked: false },
  { id: 2, name: "Page 2", checked: false },
  { id: 3, name: "Page 3", checked: false },
  { id: 4, name: "Page 4", checked: false },
];

export default function App() {
  const [pages, setPages] = useState(initialPages);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const isAllSelected = pages.every((page) => page.checked);
    setAllChecked(isAllSelected);
  }, [pages]);

  const handleAllCheck = () => {
    const newStatus = !allChecked;
    setAllChecked(newStatus);
    setPages(pages.map((page) => ({ ...page, checked: newStatus })));
  };

  const handlePageCheck = (id) => {
    setPages(
      pages.map((page) =>
        page.id === id ? { ...page, checked: !page.checked } : page
      )
    );
  };

  const handleDone = () => {
    const selectedPages = pages.filter(p => p.checked).map(p => p.name);
    alert(`Done! Selected: ${selectedPages.length > 0 ? selectedPages.join(", ") : "None"}`);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="row" onClick={handleAllCheck}>
          <span className="label">All pages</span>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleAllCheck}
            className="custom-checkbox"
          />
        </div>
        <hr className="divider" />
        <div className="list-container">
          {pages.map((page) => (
            <div
              key={page.id}
              className="row"
              onClick={() => handlePageCheck(page.id)}
            >
              <span className="label">{page.name}</span>
              <input
                type="checkbox"
                checked={page.checked}
                onChange={() => handlePageCheck(page.id)}
                className="custom-checkbox"
              />
            </div>
          ))}
        </div>
        <hr className="divider" />
        <button className="done-btn" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
}