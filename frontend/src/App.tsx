import { useState } from "react";
function App() {
   const [showRecommendation, setShowRecommendation] = useState(false);
   const [pumpRunning, setPumpRunning] = useState(false);
   const [crop, setCrop] = useState("Wheat");
  const [area, setArea] = useState("2");
  const [soilMoisture, setSoilMoisture] = useState("42");
  const [groundwater, setGroundwater] = useState("68");
  const [solar, setSolar] = useState("82");
  const [temperature, setTemperature] = useState("31");
const [humidity, setHumidity] = useState("68");
const [rainProbability, setRainProbability] = useState("20");
const [windSpeed, setWindSpeed] = useState("12");
const pumpFlowRate = 550;

  const waterPerAcre: { [key: string]: number } = {
  Wheat: 21000,
  Rice: 30000,
  Maize: 18000,
  Sugarcane: 35000,
  Cotton: 16000,
};


  const waterRequirement =
  Number(area) * (waterPerAcre[crop] || 21000);
let recommendedWater = waterRequirement * 0.85;

if (Number(rainProbability) >= 60) {
  recommendedWater = waterRequirement * 0.50;
}
const pumpDurationMinutes = Math.ceil(
  recommendedWater / pumpFlowRate
);

const pumpHours = Math.floor(pumpDurationMinutes / 60);
const pumpMinutes = pumpDurationMinutes % 60;

const pumpDuration =
  pumpHours > 0
    ? `${pumpHours} hr ${pumpMinutes} min`
    : `${pumpMinutes} min`;
const waterSaved = waterRequirement - recommendedWater;

const waterReduction =
  waterRequirement > 0
    ? Math.round((waterSaved / waterRequirement) * 100)
    : 0;

let groundwaterStatus = "Good";

if (Number(groundwater) > 70) {
  groundwaterStatus = "High Stress";
} else if (Number(groundwater) > 50) {
  groundwaterStatus = "Moderate Stress";
}
let pumpStartHour = 12;

if (Number(solar) < 50) {
  pumpStartHour = 6;
} else if (Number(solar) >= 75) {
  pumpStartHour = 12;
} else {
  pumpStartHour = 10;
}

const pumpStartMinutes = pumpStartHour * 60;
const pumpEndMinutes = pumpStartMinutes + pumpDurationMinutes;

const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;

  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${displayHour}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
};

const pumpSchedule = `${formatTime(
  pumpStartMinutes
)} – ${formatTime(pumpEndMinutes)}`;
let weatherDecision = "Irrigation can proceed";

if (Number(rainProbability) >= 60) {
  weatherDecision = "Delay irrigation due to high rain probability";
}
  return (
    <div
  style={{
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(rgba(20, 70, 35, 0.72), rgba(20, 70, 35, 0.72)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    color: "#1f3d2b",
    fontFamily: "Arial, sans-serif",
    padding: "40px",
  }}
>
      <style>{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 4px 15px rgba(47, 125, 74, 0.08);
    }
    50% {
      box-shadow: 0 8px 30px rgba(47, 125, 74, 0.18);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .renewx-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .renewx-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(47, 125, 74, 0.15) !important;
  }

  .renewx-float {
    animation: float 4s ease-in-out infinite;
  }

  .renewx-glow {
    animation: glow 3s ease-in-out infinite;
  }

  .renewx-fade {
    animation: fadeIn 0.7s ease-out;
  }
    .renewx-input {
  transition: all 0.25s ease;
  outline: none;
}

.renewx-input:focus {
  border-color: #4f8a52 !important;
  box-shadow: 0 0 0 4px rgba(79, 138, 82, 0.12);
  transform: translateY(-2px);
}
  .renewx-ai-button {
  transition: all 0.3s ease;
  box-shadow: 0 6px 18px rgba(47, 125, 74, 0.25);
}
.renewx-recommendation {
  animation: recommendationIn 0.7s ease-out;
}

@keyframes recommendationIn {
  from {
    opacity: 0;
    transform: translateY(25px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.renewx-ai-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 28px rgba(47, 125, 74, 0.35);
}

.renewx-ai-button:active {
  transform: scale(0.98);
}
`}</style>
     {/* Header */}
<div
  className="renewx-fade"
  style={{
    marginBottom: "35px",
    padding: "35px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(238,247,237,0.88))",
    boxShadow: "0 8px 30px rgba(47,125,74,0.10)",
    border: "1px solid rgba(47,125,74,0.10)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Decorative sunlight */}
  <div
    className="renewx-float"
    style={{
      position: "absolute",
      right: "45px",
      top: "20px",
      fontSize: "55px",
      opacity: 0.75,
    }}
  >
    ☀️
  </div>

  {/* Decorative plant */}
  <div
    className="renewx-float"
    style={{
      position: "absolute",
      right: "125px",
      bottom: "15px",
      fontSize: "38px",
      animationDelay: "1s",
      opacity: 0.7,
    }}
  >
    🌿
  </div>

  <div style={{ position: "relative", zIndex: 1 }}>
    <p
      style={{
        margin: 0,
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: "bold",
        letterSpacing: "2px",
        color: "#4f8a52",
      }}
    >
      SMART AGRICULTURE • SOLAR • AI
    </p>

    <h1
      style={{
        fontSize: "48px",
        margin: 0,
        fontWeight: "800",
        letterSpacing: "-1px",
      }}
    >
      🌱 RENEWX
    </h1>

    <p
      style={{
        fontSize: "19px",
        color: "#58705f",
        marginTop: "10px",
        marginBottom: 0,
        maxWidth: "650px",
      }}
    >
      Intelligent Solar Irrigation Management System
    </p>

    <p
      style={{
        fontSize: "14px",
        color: "#718078",
        marginTop: "12px",
        marginBottom: 0,
      }}
    >
      Optimize water • Harness solar energy • Grow sustainably
    </p>
  </div>
</div>
{/* Farm Configuration */}
<div
  className="renewx-card renewx-fade"
  style={{
    background: "rgba(255, 255, 255, 0.92)",
backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "18px",
    marginBottom: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  }}
>
  <h2 style={{ marginTop: 0 }}>
    🌱 Farm Configuration
  </h2>

  <p style={{ color: "#64756a" }}>
    Enter your farm details to generate a personalized irrigation plan.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
      marginTop: "25px",
    }}
  >
    {/* Crop */}
    <div>
      <label>🌾 Crop</label>

      <select
        className="renewx-input"

        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      >
        <option>Wheat</option>
        <option>Rice</option>
        <option>Maize</option>
        <option>Sugarcane</option>
        <option>Cotton</option>
      </select>
    </div>

    {/* Farm Area */}
    <div>
      <label>📐 Farm Area (Acres)</label>

      <input
        className="renewx-input"

        type="number"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      />
    </div>

    {/* Soil Moisture */}
    <div>
      <label>💧 Soil Moisture (%)</label>

      <input
        className="renewx-input"

        type="number"
        value={soilMoisture}
        onChange={(e) => setSoilMoisture(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      />
    </div>

    {/* Groundwater */}
    <div>
      <label>🌊 Groundwater Level (m)</label>

      <input
        className="renewx-input"

        type="number"
        value={groundwater}
        onChange={(e) => setGroundwater(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      />
    </div>

    {/* Solar */}
    <div>
      <label>☀️ Solar Availability (%)</label>

      <input
        className="renewx-input"

        type="number"
        value={solar}
        onChange={(e) => setSolar(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      />
    </div>
  </div>
</div>
      {/* Weather Conditions */}
<div
  className="renewx-card renewx-fade"

  style={{
    background: "rgba(255, 255, 255, 0.92)",
backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "18px",
    marginBottom: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  }}
>
  <h2 style={{ marginTop: 0 }}>
    🌦️ Weather Conditions
  </h2>

  <p style={{ color: "#64756a" }}>
    Enter current weather conditions for irrigation planning.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
      marginTop: "25px",
    }}
  >
    {/* Temperature */}
    <div>
      <label>🌡️ Temperature (°C)</label>

      <input
        className="renewx-input"

        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      />
    </div>

    {/* Humidity */}
    <div>
      <label>💦 Humidity (%)</label>

      <input
        className="renewx-input"

        type="number"
        value={humidity}
        onChange={(e) => setHumidity(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      />
    </div>

    {/* Rain Probability */}
    <div>
      <label>🌧️ Rain Probability (%)</label>

      <input
        className="renewx-input"

        type="number"
        value={rainProbability}
        onChange={(e) => setRainProbability(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      />
    </div>

    {/* Wind Speed */}
    <div>
      <label>💨 Wind Speed (km/h)</label>

      <input
        className="renewx-input"

        type="number"
        value={windSpeed}
        onChange={(e) => setWindSpeed(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "10px",
          border: "1px solid #d5ded7",
          fontSize: "16px",
        }}
      />
    </div>
  </div>
</div>
      {/* Welcome Section */}
      <div
        className="renewx-card renewx-fade"
        style={{
          background: "rgba(255, 255, 255, 0.92)",
backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          Welcome, Farmer 👋
        </h2>

        <p style={{ color: "#64756a" }}>
          Monitor your farm, groundwater and solar resources
          and get an AI-powered irrigation recommendation.
        </p>
      </div>

      {/* Information Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {/* Crop */}
        <div
          className="renewx-card"

          style={{
            background: "rgba(255, 255, 255, 0.92)",
backdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "30px" }}>🌾</div>

          <p style={{ color: "#718078", marginBottom: "5px" }}>
            Crop
          </p>

          <h2 style={{ margin: 0 }}>{crop}</h2>

          <p style={{ color: "#718078" }}>
  {area} Acres
</p>
        </div>

        {/* Water */}
        <div
          className="renewx-card"

          style={{
            background: "rgba(255, 255, 255, 0.92)",
backdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "30px" }}>💧</div>

          <p style={{ color: "#718078", marginBottom: "5px" }}>
            Water Requirement
          </p>

<h2 style={{ margin: 0 }}>
  {waterRequirement.toLocaleString()} L
</h2>
          <p style={{ color: "#718078" }}>
            Estimated daily need
          </p>
        </div>

        {/* Groundwater */}
        <div
          className="renewx-card"

          style={{
            background: "rgba(255, 255, 255, 0.92)",
backdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "30px" }}>🌊</div>

          <p style={{ color: "#718078", marginBottom: "5px" }}>
            Groundwater
          </p>

<h2 style={{ margin: 0 }}>{groundwater} m</h2>
          <p
  style={{
    color:
      groundwaterStatus === "Good"
        ? "#4f8a52"
        : groundwaterStatus === "Moderate Stress"
        ? "#c28b18"
        : "#c0392b",
  }}
>
  ● {groundwaterStatus}
</p>
        </div>

        {/* Solar */}
        <div
          className="renewx-card"

          style={{
            background: "rgba(255, 255, 255, 0.92)",
backdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "30px" }}>☀️</div>

          <p style={{ color: "#718078", marginBottom: "5px" }}>
            Solar Availability
          </p>

          <h2 style={{ margin: 0 }}>{solar}%</h2>

          <p style={{ color: "#4f8a52" }}>
            ● High Availability
          </p>
        </div>
      </div>
{showRecommendation && (
  <div
      className="renewx-recommendation"

    style={{
      background: "#ffffff",
      padding: "30px",
      borderRadius: "18px",
      marginTop: "30px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      borderLeft: "6px solid #2f7d4a",
    }}
  >
    <h2 style={{ marginTop: 0 }}>
      🤖 AI Irrigation Recommendation
    </h2>

    <p>
      Based on crop requirement, groundwater stress and solar
      availability, RENEWX recommends:
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <div>
        <p style={{ color: "#718078" }}>💧 Recommended Water</p>
<h2>{Math.round(recommendedWater).toLocaleString()} L</h2>      </div>

      <div>
  <p style={{ color: "#718078" }}>⏰ Best Irrigation Time</p>
  <h2>{pumpSchedule}</h2>
</div>

     <div>
  <p style={{ color: "#718078" }}>☀️ Solar Pump Usage</p>
  <h2>
    {Number(solar) >= 75
      ? "High"
      : Number(solar) >= 50
      ? "Moderate"
      : "Low"}
  </h2>
</div>
    </div>

    <div
      style={{
        background: "#eef7ed",
        padding: "18px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <strong>💡 AI Decision:</strong>

      <p style={{ marginBottom: 0 }}>
  {groundwaterStatus === "High Stress" && Number(solar) < 60
    ? "⚠️ Groundwater stress is high and solar availability is limited. RENEWX recommends reducing water extraction and avoiding unnecessary pumping."
    : groundwaterStatus === "High Stress"
    ? "⚠️ Groundwater stress is high. RENEWX recommends reducing water extraction and using available solar energy efficiently."
    : Number(solar) >= 75
    ? "☀️ Solar availability is high and groundwater conditions are acceptable. RENEWX recommends using solar-powered irrigation during the optimal pumping window."
    : "💡 RENEWX recommends controlled irrigation based on the crop water requirement while conserving groundwater."}
</p>
<p
  style={{
    marginBottom: 0,
    marginTop: "12px",
    fontWeight: "bold",
    color:
      Number(rainProbability) >= 60
        ? "#c0392b"
        : "#4f8a52",
  }}
>
  🌦️ Weather Decision: {weatherDecision}
</p>
    </div>
  </div>
)}
{/* Optimal Pump Schedule */}
{showRecommendation && (
  <div
    style={{
      background: "#ffffff",
      padding: "30px",
      borderRadius: "18px",
      marginTop: "25px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      borderLeft: "6px solid #2f7d4a",
    }}
  >
    <h2 style={{ marginTop: 0 }}>
      ⚡ Optimal Pump Schedule
    </h2>

    <p style={{ color: "#64756a" }}>
  RENEWX calculates the pumping duration using the selected
  crop, farm area, estimated water requirement, and prototype
  pump flow rate.
</p>

<p style={{ color: "#718078", marginBottom: 0 }}>
  🌾 <strong>{crop}</strong> &nbsp; | &nbsp;
  📐 <strong>{area} acres</strong> &nbsp; | &nbsp;
  ⚙️ <strong>{pumpFlowRate} L/min</strong>
</p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <div>
  <p style={{ color: "#718078" }}>🕐 Recommended Window</p>
  <h2>{pumpSchedule}</h2>
  <p style={{ color: "#718078" }}>
    ⏱️ Duration: <strong>{pumpDuration}</strong>
  </p>
</div>

      <div>
        <p style={{ color: "#718078" }}>☀️ Solar Availability</p>
        <h2>{solar}%</h2>
      </div>

      <div>
        <p style={{ color: "#718078" }}>🌊 Groundwater Status</p>
        <h2>{groundwaterStatus}</h2>
        <p style={{ color: "#718078" }}>
  💧 Water:{" "}
  <strong>
    {Math.round(recommendedWater).toLocaleString()} L
  </strong>
</p>

<p style={{ color: "#718078" }}>
  ⚙️ Pump Flow: <strong>{pumpFlowRate} L/min</strong>
</p>
      </div>
    </div>

    <div
      style={{
        background: "#eef7ed",
        padding: "18px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <strong>💡 Scheduling Decision:</strong>

      <p style={{ marginBottom: 0 }}>
        Pumping is scheduled during a favorable solar window while
        considering groundwater stress to reduce unnecessary
        groundwater extraction.
      </p>
      <button

  onClick={() => setPumpRunning(true)}
  style={{
    marginTop: "15px",
    background: "#2f7d4a",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  ▶ Start Pump Simulation
</button>
{pumpRunning && (
  <div
    style={{
      marginTop: "20px",
      padding: "18px",
      borderRadius: "12px",
      background: "#e8f5e9",
      border: "1px solid #b7d8bc",
    }}
  >
    <h3 style={{ marginTop: 0 }}>
      🟢 Pump Running
    </h3>

    <p>
      Solar-powered irrigation simulation is active.
    </p>

    <p>
      💧 Water being delivered:{" "}
      <strong>
        {Math.round(recommendedWater).toLocaleString()} L
      </strong>
    </p>

    <p>
      ☀️ Solar availability: <strong>{solar}%</strong>
    </p>

    <p>
      🌊 Groundwater status: <strong>{groundwaterStatus}</strong>
    </p>
  </div>
)}
    </div>
  </div>
)}
{/* RENEWX Impact & Savings */}
{showRecommendation && (
  <div
    style={{
      background: "#ffffff",
      padding: "30px",
      borderRadius: "18px",
      marginTop: "25px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      borderLeft: "6px solid #2f7d4a",
    }}
  >
    <h2 style={{ marginTop: 0 }}>
      📊 RENEWX Impact & Savings
    </h2>

    <p style={{ color: "#64756a" }}>
      Estimated resource savings from the recommended irrigation plan.
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginTop: "25px",
      }}
    >
      {/* Water Requirement */}
      <div
        style={{
          background:
  "radial-gradient(circle at 10% 10%, rgba(126, 200, 80, 0.18), transparent 30%), radial-gradient(circle at 90% 20%, rgba(255, 193, 7, 0.12), transparent 25%), linear-gradient(135deg, #f5faf2 0%, #eaf5e5 50%, #f8fbf5 100%)",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <p style={{ color: "#718078", marginBottom: "5px" }}>
          💧 Water Requirement
        </p>

        <h2 style={{ margin: 0 }}>
          {Math.round(waterRequirement).toLocaleString()} L
        </h2>
      </div>

      {/* Recommended Water */}
      <div
        style={{
          background: "#f4f8f1",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <p style={{ color: "#718078", marginBottom: "5px" }}>
          🚿 Recommended
        </p>

        <h2 style={{ margin: 0 }}>
          {Math.round(recommendedWater).toLocaleString()} L
        </h2>
      </div>

      {/* Water Saved */}
      <div
        style={{
          background: "#eef7ed",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <p style={{ color: "#718078", marginBottom: "5px" }}>
          💦 Water Saved
        </p>

        <h2 style={{ margin: 0, color: "#2f7d4a" }}>
          {Math.round(waterSaved).toLocaleString()} L
        </h2>
      </div>

      {/* Reduction */}
      <div
        style={{
          background: "#eef7ed",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <p style={{ color: "#718078", marginBottom: "5px" }}>
          📉 Reduction
        </p>

        <h2 style={{ margin: 0, color: "#2f7d4a" }}>
          {waterReduction}%
        </h2>
      </div>
    </div>

    <div
      style={{
        marginTop: "25px",
        padding: "18px",
        background: "#eef7ed",
        borderRadius: "12px",
      }}
    >
      <strong>🌱 RENEWX Impact:</strong>

      <p style={{ marginBottom: 0 }}>
        The recommended irrigation plan can reduce estimated
        water use by{" "}
        <strong>{waterReduction}%</strong>, saving approximately{" "}
        <strong>{Math.round(waterSaved).toLocaleString()} L</strong>{" "}
        of water compared with the estimated requirement.
      </p>
    </div>
  </div>
)}
      {/* Recommendation Button */}
      <div style={{ marginTop: "35px" }}>
        <button
          className="renewx-ai-button"

         onClick={() => setShowRecommendation(true)}
          style={{
            background: "#2f7d4a",
            color: "white",
            border: "none",
            padding: "16px 30px",
            borderRadius: "12px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🤖 Generate AI Recommendation
        </button>
      </div>
    </div>
  );
}

export default App;