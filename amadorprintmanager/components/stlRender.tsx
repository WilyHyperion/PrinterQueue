
import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
interface StlRenderProps {
    stlFile: File | null;

}

export default function STLRender(props: StlRenderProps) {
  const viewerRef = useRef(null);
  const renderSTLModel = (file: Blob) => {
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
  useEffect(() => {
    if(props.stlFile){
    renderSTLModel(props.stlFile);
    }
  }, [props.stlFile]);
  return (
    <div ref={viewerRef} className="bg-gray-50 rounded-lg shadow-inner p-4 flex items-center justify-center h-[450px]">
          <p className="text-gray-400 text-center">3D Model Preview</p>
    </div>
  );
}
