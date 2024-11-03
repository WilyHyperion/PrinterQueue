import { useState, useRef, useEffect } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import STLRender from '@/components/stlRender';

export default function STLModelUploader() {
  const [file, setFile] = useState(null);
  const [printTime, setPrintTime] = useState(null);
  const [cost, setCost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infillDensity, setInfillDensity] = useState(20); // Default to 20% infill

  const handleFileChange = (event: { target: { files: any[]; }; }) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.stl')) {
      setFile(selectedFile);
      calculateMetrics(selectedFile);
      setError(''); // Clear previous error
    } else {
      setError('Please upload a valid STL file.');
    }
  };
  const calculateMetrics = (file: Blob) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target.result;
      const loader = new STLLoader();

      try {
        const geometry = loader.parse(contents);

        // Calculate volume
        const volume = calculateVolume(geometry);

        // Parameters for calculations
        const printSpeed = 25000; // mm/hour
        const materialCostPerCc = 0.000025; // Cost per cubic centimeter

        // Calculate volume used based on infill density
        const effectiveVolume = volume * (infillDensity / 100);

        // Calculate print time and cost
        const printTimeHours = effectiveVolume / printSpeed;
        const costAmount = effectiveVolume * materialCostPerCc;

        setPrintTime(printTimeHours.toFixed(2));
        setCost(costAmount.toFixed(2));
      } catch (err) {
        setError('Failed to parse the STL file. Please ensure it is a valid file.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const calculateVolume = (geometry) => {
    let volume = 0;
    const faces = geometry.attributes.position.count;

    for (let i = 0; i < faces; i += 3) {
      const a = new THREE.Vector3(
        geometry.attributes.position.getX(i),
        geometry.attributes.position.getY(i),
        geometry.attributes.position.getZ(i)
      );

      const b = new THREE.Vector3(
        geometry.attributes.position.getX(i + 1),
        geometry.attributes.position.getY(i + 1),
        geometry.attributes.position.getZ(i + 1)
      );

      const c = new THREE.Vector3(
        geometry.attributes.position.getX(i + 2),
        geometry.attributes.position.getY(i + 2),
        geometry.attributes.position.getZ(i + 2)
      );

      volume += (1 / 6) * Math.abs(a.dot(b.cross(c)));
    }

    return Math.abs(volume);
  };

 

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-900 w-screen h-screen">
      <div className="grid grid-cols-2 gap-8 p-10 bg-white rounded-lg shadow-xl max-w-5xl">
        <form className="flex flex-col space-y-6" action="/api/jobsubmit" method="post" encType="multipart/form-data">
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
            onChange={(e) => setInfillDensity(e.target.value)}
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
          <button type="submit" className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-2">Submit</button>
        </form>
       <STLRender stlFile = {file}  />
      </div>
    </div>
  );
}
