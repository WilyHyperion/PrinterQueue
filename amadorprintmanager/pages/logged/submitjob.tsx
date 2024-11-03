import { useState } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function STLModelUploader() {
  const [file, setFile] = useState(null);
  const [printTime, setPrintTime] = useState(null);
  const [cost, setCost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infillDensity, setInfillDensity] = useState(20); // Default to 20% infill

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.stl')) {
      setFile(selectedFile);
      calculateMetrics(selectedFile);
      setError(''); // Clear previous error
    } else {
      setError('Please upload a valid STL file.');
    }
  };

  const calculateMetrics = (file) => {
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
    const faces = geometry.attributes.position.count; // Number of faces in the geometry
    const vertex = new THREE.Vector3();

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

      // Calculate volume using the tetrahedron volume formula
      volume += (1 / 6) * Math.abs(a.dot(b.cross(c)));
    }

    return Math.abs(volume); // Return absolute volume
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">Upload STL Model</h2>
      <input 
        type="file" 
        accept=".stl"
        onChange={handleFileChange}
        className="mb-4"
      />
      <input
        type="number"
        value={infillDensity}
        onChange={(e) => setInfillDensity(e.target.value)}
        className="mb-4"
        min="0"
        max="100"
        placeholder="Infill Density (%)"
      />
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      {printTime !== null && (
        <div>
          <p>Estimated Print Time: {printTime} hours</p>
          <p>Estimated Cost: ${cost}</p>
        </div>
      )}
    </div>
  );
}
