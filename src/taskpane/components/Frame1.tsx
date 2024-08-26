<html>
<head>
    <title>ImmoMail</title>
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div id="app"></div>
    <script type="text/babel">
        const App = () => {
            return (
                <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-6">
                        <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                            <span className="text-sm">Logo</span>
                        </div>
                        <h1 className="text-xl font-semibold">ImmoMail</h1>
                    </div>
                    <div className="bg-gray-300 p-4 mb-6 text-center">
                        <p>Zu der folgenden Immobilie</p>
                        <p>Ort: xxx</p>
                        <p className="mt-4">wurden</p>
                        <p>XXX</p>
                        <p>Anfragen gefunden.</p>
                    </div>
                    <div className="bg-gray-300 p-4 mb-6 text-center">
                        <p>Beschreibung vom Kundenprofil</p>
                    </div>
                    <p className="text-center mb-6">Suche die besten <span className="bg-gray-300 px-2">XXX</span> Anfragen raus</p>
                    <div className="flex justify-center mb-6">
                        <button className="bg-gray-300 px-4 py-2 rounded">Analyse durchführen</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                <span className="text-sm">?!</span>
                            </div>
                            <span className="text-sm">Feedback & Fragen</span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
                            <span className="w-3 h-3 bg-gray-300 rounded-full inline-block"></span>
                            <span className="w-3 h-3 bg-gray-300 rounded-full inline-block"></span>
                        </div>
                    </div>
                </div>
            );
        };

        ReactDOM.render(<App />, document.getElementById('app'));
    </script>
</body>
</html>