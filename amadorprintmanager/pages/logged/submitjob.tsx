import { useState, useRef, useEffect } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function STLModelUploader() {
  const [file, setFile] = useState(null);
  const [printTime, setPrintTime] = useState(null);
  const [cost, setCost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infillDensity, setInfillDensity] = useState(20); // Default to 20% infill
  const viewerRef = useRef(null);

  useEffect(() => {
    if (file) {
      renderSTLModel(file);
    }
  }, [file]);

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

  const renderSTLModel = (file) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(450, 450);
    viewerRef.current.innerHTML = ''; 
    viewerRef.current.appendChild(renderer.domElement);
  
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
  
    const loader = new STLLoader();
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const contents = event.target.result;
      const geometry = loader.parse(contents);
      geometry.center(); // Center the geometry
  
      // Calculate bounding box to determine size
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
  
      const maxDimension = Math.max(size.x, size.y, size.z);
      const fitOffset = 1.25; // Scale factor for padding around the model
      camera.position.z = maxDimension * fitOffset; // Adjust the camera distance based on model size
  
      const material = new THREE.MeshPhongMaterial({ color: 0x4a90e2, shininess: 100 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
  
      mesh.rotation.x = -0.5 * Math.PI;
  
      const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.z += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    };
  
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-900 w-screen h-screen">
      <div className="grid grid-cols-2 gap-8 p-10 bg-white rounded-lg shadow-xl max-w-5xl">
        <form className="flex flex-col space-y-6" action="/api/jobsubmit" method="post" encType="multipart/form-data">
          <h2 className="text-3xl font-semibold text-gray-700">Upload STL Model</h2>
          <input
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
          />
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          {loading && <p className="text-gray-500">Calculating...</p>}
          {printTime !== null && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <p className="text-gray-700 font-medium">Estimated Print Time: <span className="text-purple-700">{printTime} hours</span></p>
              <p className="text-gray-700 font-medium">Estimated Cost: <span className="text-purple-700">${cost}</span></p>
            </div>
          )}
          <input type="text" name="name" placeholder="Enter Model Name" className="input input-bordered w-full mb-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" required />
          <button type="submit" className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-2">Submit</button>
        </form>

        <div ref={viewerRef} className="bg-gray-50 rounded-lg shadow-inner p-4 flex items-center justify-center h-[450px]">
          <p className="text-gray-400 text-center">3D Model Preview</p>
        </div>
      </div>
    </div>
  );
}
