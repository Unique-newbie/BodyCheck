import React, { useState, useRef, useEffect } from 'react';
import { BodyRegion, PatientRecord } from '../types/bodyCheck';
import { DEMO_SCENARIOS } from '../data/mockRecords';
import { 
  Layers, 
  Upload, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2
} from 'lucide-react';

interface NewCheckViewProps {
  patients: PatientRecord[];
  initialPatientId?: string;
  onAnalyze: (params: {
    patientRecordId: string;
    referenceImage: string;
    referenceImageId: string;
    referenceDate: string;
    newImage: string;
    newImageId: string;
    newImageDate: string;
    bodyRegion: BodyRegion;
  }) => void;
  onCancel: () => void;
}

const CONTROLLED_BODY_REGIONS: BodyRegion[] = [
  'Left Shoulder',
  'Right Shoulder',
  'Left Upper Arm',
  'Right Upper Arm',
  'Left Forearm',
  'Right Forearm',
  'Chest',
  'Abdomen',
  'Back',
  'Left Thigh',
  'Right Thigh',
  'Left Lower Leg',
  'Right Lower Leg'
];

const SELECTABLE_QUICK_RECORDS = [
  { id: 'IF456', region: 'Left Shoulder', isPrimary: true },
  { id: 'IF455', region: 'Right Forearm', isPrimary: false },
  { id: 'IF452', region: 'Back', isPrimary: false },
  { id: 'IF439', region: 'Right Lower Leg', isPrimary: false },
];

export const NewCheckView: React.FC<NewCheckViewProps> = ({
  patients,
  initialPatientId = 'IF456',
  onAnalyze,
  onCancel
}) => {
  // Current active step (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Scenario initialization: Default to primary IF456 scenario
  const primaryScenario = DEMO_SCENARIOS[0];

  const [patientId, setPatientId] = useState<string>(initialPatientId);
  const [bodyRegion, setBodyRegion] = useState<BodyRegion>(primaryScenario.bodyRegion);
  
  // Reference Image Data
  const [refImage, setRefImage] = useState<string>(primaryScenario.referenceImage);
  const [refImageId, setRefImageId] = useState<string>(primaryScenario.expectedResult.referenceImageId);
  const [refDate, setRefDate] = useState<string>(primaryScenario.referenceDate);
  const [refFileName, setRefFileName] = useState<string>('if456-shoulder-ref.jpg');
  
  // New Image Data
  const [newImage, setNewImage] = useState<string>(primaryScenario.newImage);
  const [newImageId, setNewImageId] = useState<string>(primaryScenario.expectedResult.newImageId);
  const [newDate, setNewDate] = useState<string>(primaryScenario.newImageDate);
  const [newFileName, setNewFileName] = useState<string>('if456-shoulder-review.jpg');

  const [validationError, setValidationError] = useState<string | null>(null);

  const refFileInputRef = useRef<HTMLInputElement>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialPatientId) {
      setPatientId(initialPatientId);
      const match = DEMO_SCENARIOS.find(s => s.patientRecordId === initialPatientId);
      if (match) {
        loadScenario(match);
      }
    }
  }, [initialPatientId]);

  const loadScenario = (scenario: typeof DEMO_SCENARIOS[0]) => {
    setPatientId(scenario.patientRecordId);
    setBodyRegion(scenario.bodyRegion);
    setRefImage(scenario.referenceImage);
    setRefImageId(scenario.expectedResult.referenceImageId);
    setRefDate(scenario.referenceDate);
    setRefFileName(`${scenario.patientRecordId.toLowerCase()}-baseline.jpg`);
    setNewImage(scenario.newImage);
    setNewImageId(scenario.expectedResult.newImageId);
    setNewDate(scenario.newImageDate);
    setNewFileName(`${scenario.patientRecordId.toLowerCase()}-review.jpg`);
    setValidationError(null);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'reference' | 'new'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format
    const validFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validFormats.includes(file.type)) {
      setValidationError('Unsupported image format. Please upload a standard JPG or PNG photo.');
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setValidationError('File size exceeds 15MB limit. Please provide an optimized clinical photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const nowStr = new Date().toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace('T', ' ');

      if (target === 'reference') {
        setRefImage(result);
        setRefImageId(`REF-${patientId}`);
        setRefFileName(file.name);
        setRefDate(nowStr);
      } else {
        setNewImage(result);
        setNewImageId(`NEW-${patientId}`);
        setNewFileName(file.name);
        setNewDate(nowStr);
      }
      setValidationError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleNextStep = () => {
    setValidationError(null);
    if (currentStep === 1) {
      if (!patientId) {
        setValidationError('Please select a valid record.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!refImage) {
        setValidationError('Please select or upload a baseline reference photograph.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!newImage) {
        setValidationError('Please select or upload a new review photograph.');
        return;
      }
      setCurrentStep(4);
    }
  };

  const handleProcessSubmit = () => {
    if (!refImage || !newImage) {
      setValidationError('Both reference baseline and follow-up review images are required.');
      return;
    }

    onAnalyze({
      patientRecordId: patientId,
      referenceImage: refImage,
      referenceImageId: refImageId || `${patientId}-REF`,
      referenceDate: refDate,
      newImage: newImage,
      newImageId: newImageId || `${patientId}-NEW`,
      newImageDate: newDate,
      bodyRegion: bodyRegion,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">New Body Check</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Guided visual comparison workflow: record selection, baseline reference image, review photograph, and comparison.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-medium px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Simple Step Indicator: 1 Record → 2 Reference Image → 3 Review Image → 4 Compare */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs overflow-x-auto gap-2 py-1">
            {[
              { num: 1, title: 'Record' },
              { num: 2, title: 'Reference Image' },
              { num: 3, title: 'Review Image' },
              { num: 4, title: 'Compare' }
            ].map((step, idx, arr) => (
              <React.Fragment key={step.num}>
                <button
                  type="button"
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-medium ${
                    currentStep === step.num
                      ? 'bg-sky-50 text-sky-900 font-semibold border border-sky-300'
                      : currentStep > step.num
                      ? 'text-slate-700 hover:bg-slate-50 font-medium'
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    currentStep === step.num
                      ? 'bg-sky-700 text-white'
                      : currentStep > step.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {currentStep > step.num ? '✓' : step.num}
                  </span>
                  <span>{step.num} {step.title}</span>
                </button>
                {idx < arr.length - 1 && (
                  <span className="text-slate-300 select-none font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Select a Record */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-xs shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-600" />
            <span>Select a record</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SELECTABLE_QUICK_RECORDS.map(rec => {
            const scenario = DEMO_SCENARIOS.find(s => s.patientRecordId === rec.id);
            const isSelected = patientId === rec.id;
            return (
              <button
                key={rec.id}
                type="button"
                onClick={() => {
                  if (scenario) loadScenario(scenario);
                }}
                className={`text-left p-3 rounded-md border text-xs transition-colors ${
                  isSelected
                    ? 'bg-sky-50 border-sky-400 text-sky-950 font-semibold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono font-bold text-slate-900 text-sm">{rec.id}</span>
                  {rec.isPrimary && (
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-900 text-white rounded font-medium">Primary</span>
                  )}
                </div>
                <div className="text-xs text-slate-600 font-medium">{rec.region}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Alert */}
      {validationError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800 flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      {/* STEP 1: SELECT RECORD */}
      {currentStep === 1 && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              STEP 1 — SELECT RECORD
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose an existing record to begin a body check.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Record
              </label>
              <select
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value);
                  const match = DEMO_SCENARIOS.find(s => s.patientRecordId === e.target.value);
                  if (match) loadScenario(match);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm font-mono font-medium text-slate-900 focus:ring-1 focus:ring-sky-500"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.id} — {p.name.replace('Youth Record ', 'Record ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Controlled Body Region
              </label>
              <select
                value={bodyRegion}
                onChange={(e) => setBodyRegion(e.target.value as BodyRegion)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm font-medium text-slate-900 focus:ring-1 focus:ring-sky-500"
              >
                {CONTROLLED_BODY_REGIONS.map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded shadow-sm flex items-center gap-1.5"
            >
              <span>Continue to Step 2 (Reference Image)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REFERENCE BASELINE IMAGE */}
      {currentStep === 2 && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              STEP 2 — REFERENCE IMAGE
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select the earlier image used as the comparison baseline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="aspect-[4/3] bg-slate-950 rounded border border-slate-200 flex items-center justify-center overflow-hidden relative">
              <img
                src={refImage}
                alt="Reference Baseline"
                className="w-full h-full object-contain"
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                REFERENCE BASELINE
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900">{refImageId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Capture Timestamp:</span>
                  <span className="font-mono text-slate-800">{refDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Asset File:</span>
                  <span className="font-mono text-slate-700 truncate max-w-[200px]">{refFileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Validation:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Validated Reference Baseline
                  </span>
                </div>
              </div>

              <div>
                <input
                  type="file"
                  ref={refFileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileUpload(e, 'reference')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => refFileInputRef.current?.click()}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload Alternative Reference Image</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded text-xs font-medium flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Step 1 (Record)</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded shadow-sm flex items-center gap-1.5"
            >
              <span>Continue to Step 3 (Review Image)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: NEW / REVIEW IMAGE */}
      {currentStep === 3 && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              STEP 3 — REVIEW IMAGE
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload the new image to compare with the reference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="aspect-[4/3] bg-slate-950 rounded border border-slate-200 flex items-center justify-center overflow-hidden relative">
              <img
                src={newImage}
                alt="New Review Photo"
                className="w-full h-full object-contain"
              />
              <span className="absolute top-2 left-2 bg-sky-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                REVIEW IMAGE
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">New Image ID:</span>
                  <span className="font-mono font-bold text-slate-900">{newImageId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Review Timestamp:</span>
                  <span className="font-mono text-slate-800">{newDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Asset File:</span>
                  <span className="font-mono text-slate-700 truncate max-w-[200px]">{newFileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Validation:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Validated Review Image
                  </span>
                </div>
              </div>

              <div>
                <input
                  type="file"
                  ref={newFileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileUpload(e, 'new')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => newFileInputRef.current?.click()}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload Alternative Review Image</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded text-xs font-medium flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Step 2 (Reference Image)</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded shadow-sm flex items-center gap-1.5"
            >
              <span>Continue to Step 4 (Compare)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW SIDE-BY-SIDE & RUN ANALYSIS */}
      {currentStep === 4 && (
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  STEP 4 — COMPARE & ANALYZE
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Summary of the two selected images and body region.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Region:</span>
                <span className="text-xs font-bold font-mono px-2 py-1 bg-slate-100 rounded border border-slate-300 text-slate-800">
                  {bodyRegion}
                </span>
              </div>
            </div>

            {/* Side-by-Side Verification Viewport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              
              {/* Reference Preview Card */}
              <div className="border border-slate-200 rounded overflow-hidden flex flex-col">
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-slate-700">REFERENCE IMAGE: {refImageId}</span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-[11px] text-sky-700 hover:underline"
                  >
                    Replace
                  </button>
                </div>
                <div className="aspect-[4/3] bg-slate-950 flex items-center justify-center">
                  <img src={refImage} alt="Reference Baseline" className="w-full h-full object-contain" />
                </div>
                <div className="p-2.5 bg-slate-50 text-[11px] text-slate-600 font-mono border-t border-slate-200 flex justify-between">
                  <span>Baseline: {refDate}</span>
                  <span className="truncate max-w-[150px]">{refFileName}</span>
                </div>
              </div>

              {/* New Review Preview Card */}
              <div className="border border-slate-200 rounded overflow-hidden flex flex-col">
                <div className="bg-sky-50 px-3 py-2 border-b border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-slate-800">REVIEW IMAGE: {newImageId}</span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-[11px] text-sky-700 hover:underline"
                  >
                    Replace
                  </button>
                </div>
                <div className="aspect-[4/3] bg-slate-950 flex items-center justify-center">
                  <img src={newImage} alt="New Review" className="w-full h-full object-contain" />
                </div>
                <div className="p-2.5 bg-slate-50 text-[11px] text-slate-600 font-mono border-t border-slate-200 flex justify-between">
                  <span>Review: {newDate}</span>
                  <span className="truncate max-w-[150px]">{newFileName}</span>
                </div>
              </div>

            </div>

            {/* Run Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded text-xs font-medium flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 3 (Review Image)</span>
              </button>

              <button
                type="button"
                onClick={handleProcessSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-sky-500"
              >
                <span>Analyze Images</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
