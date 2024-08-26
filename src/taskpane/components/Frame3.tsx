import * as React from "react";

const Frame3: React.FC = () => {
  return (
    <div className="bg-white w-80 p-6 rounded-lg shadow-md text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-gray-700">Logo</span>
        </div>
        <span className="ml-4 text-xl font-semibold">ImmoMail</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Glückwunsch!</h1>
      <p className="text-gray-700 mb-4">
        ImmoMail hat dir die XXX Emails für die XXX besten Bewerber in deinen Drafts unter XXX (Immobilienname) abgelegt.
      </p>
      <p className="text-gray-700 mb-4">
        Für alle abgelehnten Bewerber haben wir dir die Drafts in XXX abgelegt.
      </p>
      <p className="text-gray-700 mb-4">
        Überprüfe sie und schicke sie dann ab!
      </p>
      <p className="text-gray-700 mt-8">
        Du hast dir ca. XXX Minuten Arbeitszeit gespart!
      </p>
      <div className="flex justify-center mt-8">
        <span className="w-3 h-3 bg-gray-300 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full mx-1"></span>
        <span className="w-3 h-3 border border-gray-400 rounded-full mx-1"></span>
      </div>
    </div>
  );
};

export default Frame3;
