import React from 'react';

const Frame2 = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white w-80 p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center">
            <span>Logo</span>
          </div>
          <span className="ml-4 text-xl font-semibold">ImmoMail</span>
        </div>
        <div className="bg-gray-300 p-2 mb-2">Immobilie XXX</div>
        <div className="bg-gray-300 p-2 mb-4">XXX der XXX Anfragen treffen auf die Profilbeschreibung zu</div>
        <div className="bg-gray-300 p-2 mb-4">
          <span>Top XXX Treffer:</span>
          <div className="bg-white p-2 mt-2 flex items-center justify-between border border-gray-300">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center mr-2">
                <span>Bild</span>
              </div>
              <div>
                <div>Name</div>
                <div>Plattform</div>
                <div>Kurze Beschreibung</div>
              </div>
            </div>
            <button className="bg-gray-300 p-1 rounded">Details</button>
          </div>
          <div className="bg-white p-2 mt-2 flex items-center justify-between border border-gray-300">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center mr-2">
                <span>Bild</span>
              </div>
              <div>
                <div>Name</div>
                <div>Plattform</div>
                <div>Kurze Beschreibung</div>
              </div>
            </div>
            <button className="bg-gray-300 p-1 rounded">Details</button>
          </div>
          <div className="bg-white p-2 mt-2 flex items-center justify-between border border-gray-300">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center mr-2">
                <span>Bild</span>
              </div>
              <div>
                <div>Name</div>
                <div>Plattform</div>
                <div>Kurze Beschreibung</div>
              </div>
            </div>
            <button className="bg-gray-300 p-1 rounded">Details</button>
          </div>
        </div>
        <button className="bg-gray-300 w-full p-2 mb-2 rounded">Template für Bestätigungsemail</button>
        <button className="bg-gray-300 w-full p-2 mb-4 rounded">Template für Absageemails</button>
        <button className="bg-gray-300 w-full p-2 rounded">Drafts erstellen</button>
      </div>
    </div>
  );
};

export default Frame2;
