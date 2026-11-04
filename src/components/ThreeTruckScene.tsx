import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, CloudRain, Zap, Sparkles, EyeOff } from 'lucide-react';
import { useReducedMotion } from '../context/MotionContext';
import { StaticTruckFallback } from './StaticTruckFallback';

interface ThreeTruckSceneProps {
  onStepChange?: (step: number) => void;
}

export const ThreeTruckScene: React.FC<ThreeTruckSceneProps> = ({ onStepChange }) => {
  const { prefersReducedMotion, toggleReducedMotion } = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [cameraMode, setCameraMode] = useState<'cinematic' | 'chase' | 'front' | 'orbit'>('cinematic');
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // References for animation loop
  const animFrameId = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const truckGroupRef = useRef<THREE.Group | null>(null);
  const leftDoorPivotRef = useRef<THREE.Group | null>(null);
  const rightDoorPivotRef = useRef<THREE.Group | null>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const boxesGroupRef = useRef<THREE.Group | null>(null);
  const highwayGroupRef = useRef<THREE.Group | null>(null);
  const rainSystemRef = useRef<THREE.Points | null>(null);
  const lightningLightRef = useRef<THREE.PointLight | null>(null);
  const signMeshRef = useRef<THREE.Mesh | null>(null);
  const signCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const signTextureRef = useRef<THREE.CanvasTexture | null>(null);

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  const cameraModeRef = useRef(cameraMode);
  cameraModeRef.current = cameraMode;

  // Exact 4-Step Sequence:
  // Step 1: Boxes being loaded into the truck, followed by the doors closing
  // Step 2: Truck beginning its journey
  // Step 3: Rain and lighting effects introduced as the truck travels
  // Step 4: Dynamic sign board updating with city names as it crosses them (Kanyakumari to Kashmir), truck arrives at destination and doors open
  const stepDescriptions = [
    { 
      step: 1, 
      title: 'Boxes Loaded & Doors Closed', 
      subtitle: 'Household boxes glide into the truck container, followed by rear doors securely closing',
      icon: 'box' 
    },
    { 
      step: 2, 
      title: 'Journey Begins', 
      subtitle: 'Engine powers up and the JJJ moving truck rolls onto the highway to begin its journey',
      icon: 'truck' 
    },
    { 
      step: 3, 
      title: 'Rain & Lightning Effects', 
      subtitle: 'Monsoon rainfall and atmospheric thunder lightning illuminate the highway as the truck travels',
      icon: 'storm' 
    },
    { 
      step: 4, 
      title: 'Kanyakumari to Kashmir & Arrival', 
      subtitle: 'Dynamic signboard tracks city milestones across India, truck arrives at destination and doors open',
      icon: 'destination' 
    },
  ];

  // Helper to draw dynamic highway milestone signboard
  const updateSignboard = (textLine1: string, textLine2: string, textLine3: string) => {
    const canvas = signCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Green Indian National Highway sign style
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 492, 236);

    // Header badge
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(20, 20, 472, 34);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NATIONAL HIGHWAY CORRIDOR • NH-44', 256, 44);

    // Dynamic Route Line 1 (Current City / Landmark)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(textLine1, 256, 108);

    // Dynamic Route Line 2 (Checkpoint / Route segment)
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 25px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(textLine2, 256, 158);

    // Dynamic Route Line 3 (Distance / Arrival status)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(textLine3, 256, 210);

    if (signTextureRef.current) {
      signTextureRef.current.needsUpdate = true;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060b18);
    const sceneFog = new THREE.FogExp2(0x060b18, 0.012);
    scene.fog = sceneFog;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(-14, 6, -12);
    camera.lookAt(0, 2.5, -2);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x22365c, 1.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 2.4);
    sunLight.position.set(30, 45, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    scene.add(sunLight);

    // Warm rim light for truck container
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 1.8);
    rimLight.position.set(-25, 12, -25);
    scene.add(rimLight);

    // Lightning Flash Light (used during Step 3 storm)
    const lightningLight = new THREE.PointLight(0xa5f3fc, 0, 160);
    lightningLight.position.set(5, 30, 10);
    scene.add(lightningLight);
    lightningLightRef.current = lightningLight;

    // 5. Build Texture for JJJ Packers & Movers Livery
    const createTruckBrandTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#08142c';
        ctx.fillRect(0, 0, 1024, 512);

        // Gold decorative accent stripes
        const grad = ctx.createLinearGradient(0, 0, 1024, 0);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(0.5, '#fbbf24');
        grad.addColorStop(1, '#d97706');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 36, 1024, 16);
        ctx.fillRect(0, 460, 1024, 16);

        // Chevron accents
        ctx.fillStyle = 'rgba(245, 158, 11, 0.16)';
        for (let i = 0; i < 7; i++) {
          ctx.beginPath();
          ctx.moveTo(820 + i * 26, 65);
          ctx.lineTo(865 + i * 26, 256);
          ctx.lineTo(820 + i * 26, 447);
          ctx.lineTo(800 + i * 26, 447);
          ctx.lineTo(845 + i * 26, 256);
          ctx.lineTo(800 + i * 26, 65);
          ctx.fill();
        }

        // Main Title
        ctx.font = 'bold 54px "Outfit", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('JJJ PACKERS & MOVERS', 480, 205);

        // Tagline
        ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('Safe • Reliable • On Time', 480, 260);

        // Route line
        ctx.font = 'bold 20px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('KANYAKUMARI ➔ KASHMIR • ALL INDIA SERVICE', 480, 315);

        // Border outline
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.strokeRect(36, 65, 952, 382);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const brandTexture = createTruckBrandTexture();

    // 6. Build the Moving Truck
    const truckGroup = new THREE.Group();
    truckGroupRef.current = truckGroup;
    scene.add(truckGroup);

    // Chassis
    const chassisGeo = new THREE.BoxGeometry(3.2, 0.6, 12);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8, metalness: 0.3 });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 1.2;
    chassis.castShadow = true;
    truckGroup.add(chassis);

    // Cabin
    const cabinGroup = new THREE.Group();
    cabinGroup.position.set(0, 2.5, 4.4);

    const cabinMainGeo = new THREE.BoxGeometry(3.0, 2.8, 3.2);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x0f2752,
      roughness: 0.3,
      metalness: 0.6,
    });
    const cabin = new THREE.Mesh(cabinMainGeo, cabinMat);
    cabin.castShadow = true;
    cabinGroup.add(cabin);

    // Aerodynamic wind deflector on roof
    const deflectorShape = new THREE.Shape();
    deflectorShape.moveTo(-1.4, 0);
    deflectorShape.lineTo(1.4, 0);
    deflectorShape.lineTo(1.2, 1.1);
    deflectorShape.lineTo(-1.2, 1.1);
    deflectorShape.closePath();
    const extrudeSettings = { depth: 2.2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const deflectorGeo = new THREE.ExtrudeGeometry(deflectorShape, extrudeSettings);
    const deflectorMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.4 });
    const deflector = new THREE.Mesh(deflectorGeo, deflectorMat);
    deflector.position.set(0, 1.4, -0.9);
    deflector.rotation.x = Math.PI / 12;
    cabinGroup.add(deflector);

    // Windshield
    const windshieldGeo = new THREE.BoxGeometry(2.6, 1.2, 0.1);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85
    });
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 0.6, 1.62);
    windshield.rotation.x = -Math.PI / 18;
    cabinGroup.add(windshield);

    // Grille & Headlights
    const grilleGeo = new THREE.BoxGeometry(2.4, 0.9, 0.1);
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.95, roughness: 0.1 });
    const grille = new THREE.Mesh(grilleGeo, chromeMat);
    grille.position.set(0, -0.6, 1.62);
    cabinGroup.add(grille);

    const headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff0aa, emissiveIntensity: 2 });
    const leftHeadlight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.1), headlightMat);
    leftHeadlight.position.set(-1.0, -0.6, 1.63);
    const rightHeadlight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.1), headlightMat);
    rightHeadlight.position.set(1.0, -0.6, 1.63);
    cabinGroup.add(leftHeadlight);
    cabinGroup.add(rightHeadlight);

    // Spotlights
    const frontSpotLeft = new THREE.SpotLight(0xfff4d6, 5, 45, Math.PI / 6, 0.4);
    frontSpotLeft.position.set(-1.0, 1.9, 6.2);
    frontSpotLeft.target.position.set(-1.0, 0, 30);
    truckGroup.add(frontSpotLeft);
    truckGroup.add(frontSpotLeft.target);

    const frontSpotRight = new THREE.SpotLight(0xfff4d6, 5, 45, Math.PI / 6, 0.4);
    frontSpotRight.position.set(1.0, 1.9, 6.2);
    frontSpotRight.target.position.set(1.0, 0, 30);
    truckGroup.add(frontSpotRight);
    truckGroup.add(frontSpotRight.target);

    // Side mirrors
    const mirrorMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.5 });
    const leftMirror = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.3), mirrorMat);
    leftMirror.position.set(-1.65, 0.6, 1.2);
    const rightMirror = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.3), mirrorMat);
    rightMirror.position.set(1.65, 0.6, 1.2);
    cabinGroup.add(leftMirror);
    cabinGroup.add(rightMirror);

    truckGroup.add(cabinGroup);

    // 7. Large Cargo Container with JJJ Branding
    const containerGroup = new THREE.Group();
    containerGroup.position.set(0, 3.2, -1.8);

    const containerMatSide = new THREE.MeshStandardMaterial({
      map: brandTexture,
      roughness: 0.4,
      metalness: 0.2,
    });
    const containerMatPlain = new THREE.MeshStandardMaterial({
      color: 0x091734,
      roughness: 0.4,
      metalness: 0.2,
    });

    const containerMaterials = [
      containerMatSide, // right (+x)
      containerMatSide, // left (-x)
      containerMatPlain, // top (+y)
      containerMatPlain, // bottom (-y)
      containerMatPlain, // front (+z)
      containerMatPlain  // back (-z)
    ];

    const containerMain = new THREE.Mesh(new THREE.BoxGeometry(3.18, 3.5, 8.8), containerMaterials);
    containerMain.castShadow = true;
    containerMain.receiveShadow = true;
    containerGroup.add(containerMain);

    // Interior parcels already stacked inside truck container
    const interiorParcels = new THREE.Group();
    for (let iz = -3.5; iz <= 2.5; iz += 1.4) {
      for (let ix = -0.9; ix <= 0.9; ix += 0.9) {
        const boxMat = new THREE.MeshStandardMaterial({ color: 0xba834c, roughness: 0.7 });
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.65, 0.7), boxMat);
        box.position.set(ix, -0.9, iz);
        interiorParcels.add(box);
      }
    }
    containerGroup.add(interiorParcels);

    // Rear Doors
    const doorGeo = new THREE.BoxGeometry(1.5, 3.3, 0.15);
    const doorMat = new THREE.MeshStandardMaterial({
      color: 0x0a1b3c,
      roughness: 0.4,
      metalness: 0.3
    });

    // Left door pivot (hinge at left edge x = -1.5)
    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(-1.5, 0, -4.4);
    const leftDoor = new THREE.Mesh(doorGeo, doorMat);
    leftDoor.position.set(0.75, 0, 0);
    leftDoor.castShadow = true;
    leftDoorPivot.add(leftDoor);
    containerGroup.add(leftDoorPivot);
    leftDoorPivotRef.current = leftDoorPivot;

    // Right door pivot (hinge at right edge x = 1.5)
    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(1.5, 0, -4.4);
    const rightDoor = new THREE.Mesh(doorGeo, doorMat);
    rightDoor.position.set(-0.75, 0, 0);
    rightDoor.castShadow = true;
    rightDoorPivot.add(rightDoor);
    containerGroup.add(rightDoorPivot);
    rightDoorPivotRef.current = rightDoorPivot;

    truckGroup.add(containerGroup);

    // 8. Wheels (6 wheels: 2 front steering, 4 rear dual axle)
    const wheels: THREE.Mesh[] = [];
    const wheelGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.6, 24);
    wheelGeo.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9, metalness: 0.1 });
    const rimGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.62, 16);
    rimGeo.rotateZ(Math.PI / 2);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.8 });

    const wheelPositions = [
      [-1.5, 0.85, 4.2],  // Front Left
      [1.5, 0.85, 4.2],   // Front Right
      [-1.5, 0.85, -2.2], // Mid Left
      [1.5, 0.85, -2.2],  // Mid Right
      [-1.5, 0.85, -4.6], // Rear Left
      [1.5, 0.85, -4.6],  // Rear Right
    ];

    wheelPositions.forEach((pos) => {
      const wheelMesh = new THREE.Mesh(wheelGeo, tireMat);
      wheelMesh.position.set(pos[0], pos[1], pos[2]);
      wheelMesh.castShadow = true;

      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      wheelMesh.add(rimMesh);

      truckGroup.add(wheelMesh);
      wheels.push(wheelMesh);
    });
    wheelsRef.current = wheels;

    // 9. Ground / Indian Highway with Asphalt and Striping
    const highwayGroup = new THREE.Group();
    highwayGroupRef.current = highwayGroup;
    scene.add(highwayGroup);

    // Road surface
    const roadGeo = new THREE.PlaneGeometry(16, 300);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x18202d, roughness: 0.85 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, 20);
    road.receiveShadow = true;
    highwayGroup.add(road);

    // Road center dashed lines
    for (let z = -120; z < 160; z += 8) {
      const stripeGeo = new THREE.PlaneGeometry(0.35, 4.5);
      const stripeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(0, 0.02, z);
      highwayGroup.add(stripe);
    }

    // Road shoulder lines
    const shoulderGeo = new THREE.PlaneGeometry(0.3, 300);
    const shoulderMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftShoulder = new THREE.Mesh(shoulderGeo, shoulderMat);
    leftShoulder.rotation.x = -Math.PI / 2;
    leftShoulder.position.set(-7, 0.02, 20);
    highwayGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, shoulderMat);
    rightShoulder.rotation.x = -Math.PI / 2;
    rightShoulder.position.set(7, 0.02, 20);
    highwayGroup.add(rightShoulder);

    // Roadside terrain
    const terrainGeo = new THREE.PlaneGeometry(140, 300);
    const terrainMat = new THREE.MeshStandardMaterial({ color: 0x09101d, roughness: 0.95 });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.set(0, -0.05, 20);
    terrain.receiveShadow = true;
    highwayGroup.add(terrain);

    // 10. Moving Boxes / Parcels for Step 1
    // In Step 1: Boxes are loaded into the truck, and then doors close.
    // In Step 2, 3, 4: Boxes are safely inside and NEVER left on the road!
    const boxesGroup = new THREE.Group();
    boxesGroupRef.current = boxesGroup;
    scene.add(boxesGroup);

    const boxColors = [0xba834c, 0xa3713f, 0xc4935b, 0x8a5b30];
    const boxMatTape = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 });

    const parcelMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const w = 0.85 + (i % 2) * 0.2;
      const h = 0.75 + (i % 3) * 0.15;
      const d = 0.85;
      const boxGeo = new THREE.BoxGeometry(w, h, d);
      const boxMat = new THREE.MeshStandardMaterial({ color: boxColors[i % 4], roughness: 0.7 });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.castShadow = true;
      box.receiveShadow = true;

      // Initial positions on the ground staging area behind the truck
      const startX = ((i % 3) - 1) * 1.3 - 0.5;
      const startZ = -7.5 - Math.floor(i / 3) * 1.5;
      box.position.set(startX, h / 2, startZ);

      // Tape stripe
      const tape = new THREE.Mesh(new THREE.BoxGeometry(w * 1.01, 0.12, d * 1.01), boxMatTape);
      box.add(tape);

      boxesGroup.add(box);
      parcelMeshes.push(box);
    }

    // 11. Realistic Rain Particles System (for Step 3)
    const rainCount = 1800;
    const rainGeo = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    const rainVelocities = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 60;
      rainPositions[i * 3 + 1] = Math.random() * 40;
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      rainVelocities[i] = 25 + Math.random() * 20;
    }

    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.25,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const rainSystem = new THREE.Points(rainGeo, rainMat);
    scene.add(rainSystem);
    rainSystemRef.current = rainSystem;

    // 12. Dynamic Indian Highway Signboard (KANYAKUMARI -> KASHMIR)
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 256;
    signCanvasRef.current = signCanvas;

    const signTexture = new THREE.CanvasTexture(signCanvas);
    signTextureRef.current = signTexture;

    const signBoard = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 3.2),
      new THREE.MeshBasicMaterial({ map: signTexture })
    );
    signBoard.position.set(8.5, 7.5, 15);
    signBoard.rotation.y = -Math.PI / 1.1;
    highwayGroup.add(signBoard);
    signMeshRef.current = signBoard;

    // Initialize with first milestone
    updateSignboard(
      'KANYAKUMARI ➔ KASHMIR',
      'ORIGIN: TAMIL NADU HUB',
      'CORRIDOR LENGTH: 3,745 KM'
    );

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 13. Animation Loop
    let clock = new THREE.Clock();
    let currentAnimStep = 1;
    let stepTimer = 0;
    const STEP_DURATION = 4.8; // generous 4.8s per step to fully enjoy each phase
    let lastThunderTime = 0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (isPlayingRef.current) {
        stepTimer += delta;
        if (stepTimer >= STEP_DURATION) {
          stepTimer = 0;
          currentAnimStep = (currentAnimStep % 4) + 1;
          setCurrentStep(currentAnimStep);
          if (onStepChange) onStepChange(currentAnimStep);
        }
      }

      const activeStep = currentStepRef.current;
      const stepAlpha = Math.min(1, stepTimer / STEP_DURATION);

      // =========================================================================
      // STEP 1: BOXES BEING LOADED INTO TRUCK, FOLLOWED BY DOORS CLOSING
      // Part 1a (0.0 to 0.55): Doors wide open, boxes glide from ground into truck.
      // Part 1b (0.55 to 1.0): Boxes are safely inside, rear doors swing shut & seal!
      // =========================================================================
      if (activeStep === 1) {
        if (stepAlpha < 0.55) {
          // Part 1a: Loading boxes
          if (boxesGroup) boxesGroup.visible = true;
          const loadP = stepAlpha / 0.55;

          parcelMeshes.forEach((box, i) => {
            const parcelDelay = (i / 6) * 0.45;
            const p = Math.max(0, Math.min(1, (loadP - parcelDelay) / 0.55));

            const startX = ((i % 3) - 1) * 1.3 - 0.5;
            const startZ = -7.5 - Math.floor(i / 3) * 1.5;
            const targetX = ((i % 2) - 0.5) * 1.2;
            const targetZ = -3.2 + (i % 3) * 0.8;
            const targetY = 2.2;

            box.position.x = THREE.MathUtils.lerp(startX, targetX, p);
            box.position.y = THREE.MathUtils.lerp(0.4, targetY, Math.sin(p * Math.PI) * 1.2 + p * 0.5);
            box.position.z = THREE.MathUtils.lerp(startZ, targetZ, p);

            const scale = THREE.MathUtils.lerp(1, 0.85, p);
            box.scale.set(scale, scale, scale);
          });

          // Doors open wide
          if (leftDoorPivotRef.current && rightDoorPivotRef.current) {
            leftDoorPivotRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorPivotRef.current.rotation.y, -Math.PI * 0.65, 0.1);
            rightDoorPivotRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorPivotRef.current.rotation.y, Math.PI * 0.65, 0.1);
          }

          updateSignboard('STAGE 1: LOADING BOXES', 'PARCELS ENTERING TRUCK', 'CARE & PROTECTION VERIFIED');
        } else {
          // Part 1b: Boxes are now inside. Doors smoothly close!
          if (boxesGroup) boxesGroup.visible = false;
          const closeP = (stepAlpha - 0.55) / 0.45;
          const targetAngle = Math.PI * 0.65 * (1 - closeP);

          if (leftDoorPivotRef.current && rightDoorPivotRef.current) {
            leftDoorPivotRef.current.rotation.y = -targetAngle;
            rightDoorPivotRef.current.rotation.y = targetAngle;
          }

          updateSignboard('STAGE 1: DOORS CLOSING', 'CONTAINER DOORS SEALED', 'READY FOR DISPATCH');
        }
      }

      // =========================================================================
      // STEP 2: TRUCK BEGINNING ITS JOURNEY
      // Doors fully sealed, engine fires up, headlights on, truck begins rolling forward.
      // Road is 100% clean and clear of any packages!
      // =========================================================================
      else if (activeStep === 2) {
        if (boxesGroup) boxesGroup.visible = false;

        // Doors locked shut
        if (leftDoorPivotRef.current && rightDoorPivotRef.current) {
          leftDoorPivotRef.current.rotation.y = 0;
          rightDoorPivotRef.current.rotation.y = 0;
        }

        updateSignboard('STAGE 2: JOURNEY BEGINS', 'DEPARTING CHENNAI / KANYAKUMARI', 'ACCELERATING ONTO HIGHWAY');
      }

      // =========================================================================
      // STEP 3: RAIN AND LIGHTNING EFFECTS INTRODUCED AS THE TRUCK TRAVELS
      // Truck cruises at highway speed while heavy monsoon rain & thunder flashes appear.
      // =========================================================================
      else if (activeStep === 3) {
        if (boxesGroup) boxesGroup.visible = false;

        if (leftDoorPivotRef.current && rightDoorPivotRef.current) {
          leftDoorPivotRef.current.rotation.y = 0;
          rightDoorPivotRef.current.rotation.y = 0;
        }

        updateSignboard('STAGE 3: WEATHERPROOF TRANSIT', 'HEAVY MONSOON CORRIDOR', 'RAIN & LIGHTNING STORM CRUISE');
      }

      // =========================================================================
      // STEP 4: DYNAMIC SIGN BOARD UPDATING WITH CITY NAMES (KANYAKUMARI TO KASHMIR)
      // AND FINALLY TRUCK ARRIVES AT DESTINATION & DOORS OPEN!
      // =========================================================================
      else if (activeStep === 4) {
        if (boxesGroup) boxesGroup.visible = false;

        // City checkpoint progression:
        // 0.0 - 0.22: Kanyakumari / Madurai / Bengaluru
        // 0.22 - 0.44: Hyderabad / Nagpur
        // 0.44 - 0.66: Agra / Delhi NCR
        // 0.66 - 0.82: Jammu / Srinagar
        // 0.82 - 1.0: Destination Reached (Kashmir), truck stops, doors open!
        if (stepAlpha < 0.22) {
          updateSignboard('CROSSING SOUTH CORRIDOR', 'KANYAKUMARI ➔ BENGALURU', 'MILESTONE: NH-44 MILE 420');
        } else if (stepAlpha < 0.44) {
          updateSignboard('CROSSING CENTRAL CORRIDOR', 'HYDERABAD ➔ NAGPUR', 'MILESTONE: NH-44 MILE 1,480');
        } else if (stepAlpha < 0.66) {
          updateSignboard('CROSSING NORTH PLAINS', 'AGRA ➔ DELHI NCR', 'MILESTONE: NH-44 MILE 2,360');
        } else if (stepAlpha < 0.82) {
          updateSignboard('APPROACHING KASHMIR VALLEY', 'JAMMU ➔ SRINAGAR (KASHMIR)', 'MILESTONE: NH-44 MILE 3,450');
        } else {
          updateSignboard('DESTINATION REACHED: KASHMIR', 'SRINAGAR TERMINAL ARRIVAL', 'DOORS OPEN • SAFE DELIVERY');
        }

        // When approaching final phase (0.82 to 1.0), doors open wide upon arrival!
        if (stepAlpha >= 0.82) {
          const openP = Math.min(1, (stepAlpha - 0.82) / 0.18);
          const targetAngle = Math.PI * 0.65 * openP;
          if (leftDoorPivotRef.current && rightDoorPivotRef.current) {
            leftDoorPivotRef.current.rotation.y = -targetAngle;
            rightDoorPivotRef.current.rotation.y = targetAngle;
          }
        } else {
          if (leftDoorPivotRef.current && rightDoorPivotRef.current) {
            leftDoorPivotRef.current.rotation.y = 0;
            rightDoorPivotRef.current.rotation.y = 0;
          }
        }
      }

      // -----------------------------------------------------------------------
      // Weather: Rain & Lightning Management
      // Active specifically during Step 3, with smooth transition
      // -----------------------------------------------------------------------
      if (rainMat) {
        if (activeStep === 3) {
          rainMat.opacity = THREE.MathUtils.lerp(rainMat.opacity, 0.78, 0.08);
          scene.background = new THREE.Color(0x030610);
          sceneFog.density = 0.022;

          // Lightning flash intervals
          if (time - lastThunderTime > 1.1 && Math.random() < 0.06) {
            lastThunderTime = time;
            if (lightningLight) {
              lightningLight.intensity = 18 + Math.random() * 22;
            }
          }
        } else {
          rainMat.opacity = THREE.MathUtils.lerp(rainMat.opacity, 0, 0.1);
          scene.background = new THREE.Color(0x060b18);
          sceneFog.density = 0.012;
        }
      }

      if (lightningLight && lightningLight.intensity > 0) {
        lightningLight.intensity *= 0.82;
        if (lightningLight.intensity < 0.1) lightningLight.intensity = 0;
      }

      // Animate rain streaks
      if (rainSystemRef.current && rainMat.opacity > 0.01) {
        const positions = rainSystemRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < rainCount; i++) {
          positions[i * 3 + 1] -= rainVelocities[i] * delta;
          positions[i * 3 + 2] -= 8 * delta;

          if (positions[i * 3 + 1] < 0) {
            positions[i * 3 + 1] = 35 + Math.random() * 5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
          }
        }
        rainSystemRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // -----------------------------------------------------------------------
      // Motion & Speed Controller
      // Step 1: Stopped (0) while loading and closing doors
      // Step 2: Accelerating forward (3 -> 18) as journey begins
      // Step 3: Cruising speed during rain storm (20)
      // Step 4: High cruise (22), then smooth deceleration to complete stop (0) at Kashmir
      // -----------------------------------------------------------------------
      let speed = 0;
      if (activeStep === 1) {
        speed = 0;
      } else if (activeStep === 2) {
        speed = THREE.MathUtils.lerp(3, 18, stepAlpha);
      } else if (activeStep === 3) {
        speed = 20;
      } else if (activeStep === 4) {
        if (stepAlpha < 0.78) {
          speed = 22;
        } else {
          // Smooth deceleration to 0
          const decelP = (stepAlpha - 0.78) / 0.22;
          speed = THREE.MathUtils.lerp(22, 0, Math.min(1, decelP * 1.3));
        }
      }

      // Rotate wheels when moving
      if (wheels.length > 0 && speed > 0) {
        wheels.forEach((w) => {
          w.rotation.x += speed * delta * 1.5;
        });
      }

      // Highway continuous scroll effect during transit
      if (highwayGroup) {
        if (speed > 0) {
          highwayGroup.position.z = (highwayGroup.position.z - speed * delta) % 40;
        }
      }

      // Engine suspension vibration
      if (truckGroup) {
        if (speed > 0) {
          truckGroup.position.y = Math.sin(time * 32) * 0.025;
          truckGroup.rotation.z = Math.sin(time * 16) * 0.005;
        } else {
          truckGroup.position.y = Math.sin(time * 8) * 0.006;
          truckGroup.rotation.z = 0;
        }
      }

      // -----------------------------------------------------------------------
      // Camera Orchestration
      // -----------------------------------------------------------------------
      const cam = cameraRef.current;
      if (cam && truckGroup) {
        const mode = cameraModeRef.current;
        let targetCamPos = new THREE.Vector3();
        let targetLookAt = new THREE.Vector3(0, 2.5, 0);

        if (mode === 'cinematic') {
          switch (activeStep) {
            case 1:
              // Step 1: Clear rear perspective showing parcels loaded and doors closing
              targetCamPos.set(-7.5, 3.8, -9.5);
              targetLookAt.set(0, 2.5, -3);
              break;
            case 2:
              // Step 2: Front 3/4 highway angle as journey begins
              targetCamPos.set(8.5, 3.2, 11);
              targetLookAt.set(0, 2.4, 2);
              break;
            case 3:
              // Step 3: Dramatic side tracking camera through rain & lightning
              targetCamPos.set(-13.5, 4.8, 1.5 + Math.sin(time * 0.4) * 2.5);
              targetLookAt.set(0, 2.6, 0);
              break;
            case 4:
            default:
              if (stepAlpha < 0.78) {
                // Highway milestone angle focusing on dynamic sign board & truck
                targetCamPos.set(11, 4.2, 7);
                targetLookAt.set(3, 3.2, 10);
              } else {
                // Destination arrival angle as truck stops and doors open wide
                targetCamPos.set(9.5, 4.0, -8.5);
                targetLookAt.set(0, 2.6, -3);
              }
              break;
          }
        } else if (mode === 'chase') {
          targetCamPos.set(0, 5, -14);
          targetLookAt.set(0, 3, 2);
        } else if (mode === 'front') {
          targetCamPos.set(0, 2.8, 14);
          targetLookAt.set(0, 2.8, 2);
        } else {
          // Orbit mode
          const orbitAngle = time * 0.22;
          targetCamPos.set(Math.cos(orbitAngle) * 16, 7.5, Math.sin(orbitAngle) * 16);
          targetLookAt.set(0, 2.5, 0);
        }

        cam.position.lerp(targetCamPos, 0.05);
        cam.lookAt(targetLookAt);
      }

      renderer.render(scene, camera);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (rendererRef.current && rendererRef.current.domElement && container) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleStepJump = (step: number) => {
    setCurrentStep(step);
    setHasInteracted(true);
    if (onStepChange) onStepChange(step);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsPlaying(true);
    setHasInteracted(true);
  };

  if (prefersReducedMotion) {
    return <StaticTruckFallback />;
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[680px] bg-[#070B19] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      {webglSupported ? (
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Graceful High-Fidelity Fallback */
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0B1528] to-[#070B19]">
          <div className="relative max-w-lg text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pan-India Moving Journey</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Kanyakumari ➔ Kashmir Express</h3>
            <p className="text-slate-400 text-sm mb-6">
              Visualizing prompt parcel loading, secure container sealing, long-haul highway transit in rain & storm, to safe destination arrival.
            </p>
            <div className="p-6 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="text-amber-400 font-semibold text-sm">Step {currentStep} of 4</div>
              <div className="text-white text-lg font-bold mt-1">{stepDescriptions[currentStep - 1].title}</div>
              <div className="text-slate-400 text-xs mt-1">{stepDescriptions[currentStep - 1].subtitle}</div>
            </div>
          </div>
        </div>
      )}

      {/* Top HUD: Current Step Indicator & Active Weather/Route Tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
            Step 0{currentStep} / 04
          </span>
          <span className="text-xs text-amber-400 font-mono font-bold hidden sm:inline">
            {stepDescriptions[currentStep - 1]?.title}
          </span>
        </div>

        {/* Dynamic Storm Badge during Step 3 */}
        {currentStep === 3 && (
          <div className="pointer-events-auto flex items-center gap-2 bg-blue-950/90 border border-blue-500/40 text-blue-300 text-xs px-3 py-1.5 rounded-xl shadow-lg animate-pulse">
            <CloudRain className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">Monsoon Rain & Lightning</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
        )}

        {/* Camera Angles & Motion Accessibility Toggle */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs">
          <span className="text-slate-400">View:</span>
          {(['cinematic', 'chase', 'front', 'orbit'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setCameraMode(mode);
                setHasInteracted(true);
              }}
              className={`px-2 py-0.5 rounded capitalize font-medium transition-colors ${
                cameraMode === mode
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
          <div className="w-px h-4 bg-slate-700 mx-1" />
          <button
            onClick={toggleReducedMotion}
            title="Enable reduced motion accessibility mode"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <EyeOff className="w-3.5 h-3.5 text-amber-400" />
            <span>Motion: ON</span>
          </button>
        </div>
      </div>

      {/* Floating Story Caption Box (Bottom-Left) */}
      <div className="absolute bottom-20 left-4 right-4 sm:right-auto sm:max-w-md pointer-events-auto z-10">
        <div className="glass-panel p-4 rounded-xl border border-slate-700/70 shadow-2xl">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 tracking-wide uppercase">
                Step {currentStep} · {stepDescriptions[currentStep - 1]?.title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleStepJump(Math.max(1, currentStep - 1))}
                aria-label="Previous step"
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStepJump(Math.min(4, currentStep + 1))}
                aria-label="Next step"
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-200">
            {stepDescriptions[currentStep - 1]?.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Control Bar & 4-Step Scrubber */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2.5 w-full bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            className="p-1.5 text-slate-200 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleReset}
            aria-label="Restart journey"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0 mr-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* 4-Step Buttons with Titles */}
          <div className="flex-1 grid grid-cols-4 gap-2 items-center">
            {stepDescriptions.map((item) => (
              <button
                key={item.step}
                onClick={() => handleStepJump(item.step)}
                title={`Step ${item.step}: ${item.title}`}
                className={`py-1.5 px-2.5 rounded-lg text-left transition-all flex flex-col justify-center ${
                  currentStep === item.step
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                    : currentStep > item.step
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-900 text-slate-500 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-tighter">
                  Step 0{item.step}
                </div>
                <div className="text-[11px] truncate hidden sm:block">
                  {item.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
