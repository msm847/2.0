import { useEffect, useState } from "react";

const MatrixDiagram = () => {
  const [activeOperation, setActiveOperation] = useState(0);
  const [matrixState, setMatrixState] = useState([
    [0.2, 0.8, 0.1, 0.4, 0.6],
    [0.7, 0.3, 0.9, 0.2, 0.5],
    [0.1, 0.6, 0.4, 0.8, 0.3],
    [0.9, 0.2, 0.7, 0.1, 0.8],
    [0.4, 0.5, 0.2, 0.9, 0.1],
  ]);

  const operators = ["O₁", "O₂", "O₃", "O₄", "O₅"];
  const operatorNames = [
    "AUTHORIZE",
    "VERIFY",
    "OVERRIDE",
    "DELEGATE",
    "TERMINATE",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOperation((prev) => (prev + 1) % 5);

      // Simulate matrix transformation
      setMatrixState((prevMatrix) =>
        prevMatrix.map((row, i) =>
          row.map((val, j) =>
            i === activeOperation || j === activeOperation
              ? Math.max(0.1, Math.min(0.9, val + (Math.random() - 0.5) * 0.3))
              : val,
          ),
        ),
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [activeOperation]);

  const getColorForValue = (value: number) => {
    if (value > 0.7) return "#ff6b6b"; // High risk
    if (value > 0.4) return "#ffd93d"; // Medium risk
    return "#6bcf7f"; // Low risk
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        background: "#0a0a0a",
        border: "1px solid rgba(0, 255, 255, 0.2)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Matrix Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          gap: "2px",
          width: "240px",
          height: "240px",
        }}
      >
        {/* Header row */}
        <div style={{ gridColumn: "1", gridRow: "1" }}></div>
        {operators.map((op, index) => (
          <div
            key={`header-${index}`}
            style={{
              gridColumn: `${index + 2}`,
              gridRow: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: index === activeOperation ? "#00ffff" : "#ffffff",
              fontSize: "12px",
              fontFamily: "monospace",
              fontWeight: "bold",
              transition: "color 0.3s ease",
            }}
          >
            {op}
          </div>
        ))}

        {/* Matrix cells */}
        {operators.map((op, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: "contents" }}>
            {/* Row header */}
            <div
              style={{
                gridColumn: "1",
                gridRow: `${rowIndex + 2}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: rowIndex === activeOperation ? "#00ffff" : "#ffffff",
                fontSize: "12px",
                fontFamily: "monospace",
                fontWeight: "bold",
                transition: "color 0.3s ease",
              }}
            >
              {op}
            </div>

            {/* Matrix values */}
            {matrixState[rowIndex].map((value, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                style={{
                  gridColumn: `${colIndex + 2}`,
                  gridRow: `${rowIndex + 2}`,
                  background: getColorForValue(value),
                  border:
                    rowIndex === activeOperation || colIndex === activeOperation
                      ? "2px solid #00ffff"
                      : "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "#000000",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  opacity:
                    rowIndex === activeOperation || colIndex === activeOperation
                      ? 1
                      : 0.7,
                }}
              >
                {value.toFixed(1)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Active Operation Display */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          background: "rgba(0, 255, 255, 0.1)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "10px",
          fontFamily: "monospace",
          color: "#00ffff",
        }}
      >
        <div style={{ marginBottom: "5px" }}>ACTIVE OPERATOR</div>
        <div style={{ color: "#ffffff", fontSize: "12px", fontWeight: "bold" }}>
          {operators[activeOperation]}
        </div>
        <div style={{ color: "#ffffff" }}>{operatorNames[activeOperation]}</div>
      </div>

      {/* Sequence Arrow */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "10px",
          fontFamily: "monospace",
          color: "#00ffff",
        }}
      >
        <span>SEQUENCE MATTERS</span>
        <div
          style={{
            width: "0",
            height: "0",
            borderLeft: "8px solid #00ffff",
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
          }}
        />
      </div>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "15px",
          fontSize: "9px",
          fontFamily: "monospace",
          color: "#a0a0a0",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "3px" }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#6bcf7f",
              marginRight: "5px",
            }}
          ></div>
          Low Risk
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "3px" }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#ffd93d",
              marginRight: "5px",
            }}
          ></div>
          Medium Risk
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#ff6b6b",
              marginRight: "5px",
            }}
          ></div>
          High Risk
        </div>
      </div>
    </div>
  );
};

export default MatrixDiagram;
