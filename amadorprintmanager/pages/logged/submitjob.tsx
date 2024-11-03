import { useState, useRef, useEffect } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import STLRender from '@/components/stlRender';
import calculateMetrics from '@/lib/calculateCost';

export default function STLModelUploader() {
  const [file, setFile] = useState(null );
  const [printTime, setPrintTime] = useState(null as String | null);
  const [cost, setCost] = useState(null as String | null);
  const [loading, setLoading] = useState(false );
  const [error, setError] = useState('' );
  const [infillDensity, setInfillDensity] = useState(20); // Default to 20% infill

  const handleFileChange = (event : any) => {
    if (!event.target) return;
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.stl')) {
      setFile(selectedFile);
      calculateMetrics(selectedFile, setLoading, infillDensity, setPrintTime, setCost, setError);
      setError(''); // Clear previous error
    } else {
      setError('Please upload a valid STL file.');
    }
  };
  

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-900 w-screen min-h-screen">
      <div className="grid grid-cols-2 gap-8 p-10 bg-white rounded-lg shadow-xl">
        <form className="flex flex-col space-y-6  " action="/api/jobsubmit" method="post" encType="multipart/form-data">
          <h2 className="text-3xl font-semibold text-gray-700">Upload STL Model</h2>
          <input
            name="file"
            type="file"
            accept=".stl"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full mb-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-500"
          />
          <input
            type="number"
            value={infillDensity}
            onChange={(e) => setInfillDensity(e.target.value as unknown as number)}
            className="input input-bordered w-full mb-4 p-2 border-2 text-black border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            min="0"
            max="100"
            placeholder="Infill Density (%)"
            name="inFillPercentage"
          />
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          {loading && <p className="text-gray-500">Calculating...</p>}
          {printTime !== null && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <p className="text-gray-700 font-medium">Estimated Print Time: <span className="text-purple-700">{printTime} hours</span></p>
              <p className="text-gray-700 font-medium">Estimated Cost: <span className="text-purple-700">${cost}</span></p>
            </div>
          )}
          <input type="text" name="name" placeholder="Enter Model Name" className="input text-black input-bordered w-full mb-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required />
          <input type="text" name="color" placeholder="Color" className="input text-black input-bordered w-full mb-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required />
          <input type="text" name="printer" placeholder="Printer" className="input text-black input-bordered w-full mb-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required />
          <textarea name="notes" placeholder="Notes" className="input text-black input-bordered w-full mb-4 p-2 border-2 min-h-[20vh] border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required />
          <button type="submit" className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-2">Submit</button>
        </form>
       <STLRender stlFile = {file}  />
      </div>
    </div>
  );
}
