import React, { useState } from "react";
import { Flower2 } from "lucide-react";

export default function App() {
  const [inputs, setInputs] = useState({
    sepalLength: "",
    sepalWidth: "",
    petalLength: "",
    petalWidth: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const classifyIris = async () => {
    const { sepalLength, sepalWidth, petalLength, petalWidth } = inputs;

    if (!sepalLength || !sepalWidth || !petalLength || !petalWidth) {
      setError("Please fill in all the fields");
      return;
    }

    setLoading(true);
    setPrediction(null);

    // ❗ Replace with real API call later
    const mock = {
      species: "setosa",
      confidence: 0.95,
      generatedImage: `<svg width="200" height="200">
        <circle cx="100" cy="100" r="60" fill="purple" />
      </svg>`,
    };

    setTimeout(() => {
      setPrediction(mock);
      setLoading(false);
    }, 1200);
  };

  const reset = () => {
    setInputs({
      sepalLength: "",
      sepalWidth: "",
      petalLength: "",
      petalWidth: "",
    });
    setPrediction(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Flower2 className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Iris Species Classifier
            </h1>
          </div>
          <p className="text-gray-600">
            Enter flower measurements to identify the iris species.
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-8 shadow-xl rounded-2xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["sepalLength", "sepalWidth", "petalLength", "petalWidth"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold mb-1">
                    {field.replace(/([A-Z])/g, " $1")} (cm)
                  </label>
                  <input
                    type="number"
                    name={field}
                    value={inputs[field]}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              )
            )}
          </div>

          {error && <p className="text-red-600 mt-3">{error}</p>}

          <div className="flex gap-4 mt-6">
            <button
              onClick={classifyIris}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg"
            >
              {loading ? "Classifying..." : "Classify"}
            </button>

            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-300 rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>

        {/* RESULT */}
        {prediction && (
          <div className="bg-white p-6 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold mb-2">Prediction Result</h2>

            <p className="text-lg">
              Species: <strong>{prediction.species}</strong>
            </p>
            <p>Confidence: {prediction.confidence}</p>

            <div
              className="mt-4 border p-4 rounded-lg bg-gray-50"
              dangerouslySetInnerHTML={{ __html: prediction.generatedImage }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
