import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

const ExportPage = () => {
  const [exports, setExports] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = "vishal"; // demo user

  const fetchExports = async () => {
    const res = await fetch(`${API_URL}/export?userId=${userId}`);
    const data = await res.json();
    setExports(data);
  };

  const triggerExport = async () => {
    setLoading(true);
    await fetch(`${API_URL}/export?userId=${userId}`, {
      method: "POST",
    });
    setLoading(false);
    fetchExports();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExports();

    const interval = setInterval(fetchExports, 3000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Export Audit Logs
        </h2>

        {/* Button */}
        <button
          onClick={triggerExport}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
        >
          {loading ? "Exporting..." : "Export Logs"}
        </button>

        {/* Table */}
        <div className="space-y-3">
          {exports.length === 0 ? (
            <div className="text-gray-400">No exports yet</div>
          ) : (
            exports.map((exp) => (
              <div
                key={exp.id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="text-sm font-medium">
                    Export #{exp.id}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(exp.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">

                  {/* Status */}
                  {(() => {
                    let statusClass;
                    if (exp.status === "completed") {
                      statusClass = "bg-green-100 text-green-700";
                    } else if (exp.status === "processing") {
                      statusClass = "bg-yellow-100 text-yellow-700";
                    } else {
                      statusClass = "bg-gray-200 text-gray-600";
                    }
                    return (
                      <span
                        className={`text-xs px-2 py-1 rounded ${statusClass}`}
                      >
                        {exp.status}
                      </span>
                    );
                  })()}

                  {/* Download */}
                  {exp.status === "completed" && (
                    <a
                      href={`${API_URL}/export/download/${exp.fileName}`}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="text-blue-500 text-sm underline"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default ExportPage;