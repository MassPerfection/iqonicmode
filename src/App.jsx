import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MAINTENANCE_MODE } from "./config";
import { MaintenancePage } from "./pages/Maintenance";

const FullSite = lazy(() => import("./FullSite"));

export default function App() {
  if (MAINTENANCE_MODE) {
    return (
      <Routes>
        <Route path="*" element={<MaintenancePage />} />
      </Routes>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <FullSite />
    </Suspense>
  );
}
