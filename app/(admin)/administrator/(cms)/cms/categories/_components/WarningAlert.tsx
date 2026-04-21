import React from "react";

const WarningAlert = () => {
  return (
    <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
      <p className="text-yellow-800 text-sm">
        <strong>Warning!</strong> Category deleting enabled, only if it has no
        articles. While deleting category, all its articles must be moved to
        another category.
      </p>
    </div>
  );
};

export default WarningAlert;
