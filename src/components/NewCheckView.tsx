import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BodyRegion, PatientRecord, DemoScenario } from '../types/bodyCheck';
import { DEMO_SCENARIOS } from '../data/mockRecords';
import { 
  Upload, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  Search,
  X
} from 'lucide-react';

export interface SelectableRecord {
  id: string;
  name: string;
  unit?: string;
  bodyRegion: BodyRegion;
  scenario?: DemoScenario;
}

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

export const NewCheckView: React.FC<NewCheckViewProps> = ({
  patients,
  initialPatientId,
  onAnalyze,
  onCancel
}) => {
  // Dynamically derive available records from patients and scenarios (scalable to hundreds of records)
  const availableRecords = useMemo<SelectableRecord[]>(() => {
    const map = new Map<string, SelectableRecord>();

    patients.forEach(p => {
      const scenario = DEMO_SCENARIOS.find(s => s.patientRecordId === p.id);
      const region = (scenario?.bodyRegion || p.defaultRegion || 'Other') as BodyRegion;
      map.set(p.id, {
        id: p.id,
        name: p.name.replace('Youth Record ', 'Record '),
        unit: p.unit,
        bodyRegion: region,
        scenario,
      });
    });

    DEMO_SCENARIOS.forEach(s => {
      if (!map.has(s.patientRecordId)) {
        map.set(s.patientRecordId, {
          id: s.patientRecordId,
          name: `Record ${s.patientRecordId}`,
          bodyRegion: s.bodyRegion,
          scenario: s,
        });
      }
    });

    return Array.from(map.values());
  }, [patients]);

  const initialRecord = useMemo(() => {
    if (!initialPatientId) return undefined;
    return availableRecords.find(r => r.id.toLowerCase() === initialPatientId.toLowerCase());
  }, [initialPatientId, availableRecords]);

  // Current active step (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);
  // Furthest step reached / unlocked (1 to 4)
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1);

  // Selected Record State
  const [patientId, setPatientId] = useState<string>(initialRecord ? initialRecord.id : '');
  const [bodyRegion, setBodyRegion] = useState<BodyRegion>(initialRecord ? initialRecord.bodyRegion : ('' as BodyRegion));
  
  // Reference Image Data
  const [refImage, setRefImage] = useState<string>(initialRecord?.scenario ? initialRecord.scenario.referenceImage : '');
  const [refImageId, setRefImageId] = useState<string>(initialRecord?.scenario ? initialRecord.scenario.expectedResult.referenceImageId : '');
  const [refDate, setRefDate] = useState<string>(initialRecord?.scenario ? initialRecord.scenario.referenceDate : '');
  const [refFileName, setRefFileName] = useState<string>(initialRecord ? `${initialRecord.id.toLowerCase()}-baseline.jpg` : '');
  
  // New Image Data
  const [newImage, setNewImage] = useState<string>(initialRecord?.scenario ? initialRecord.scenario.newImage : '');
  const [newImageId, setNewImageId] = useState<string>(initialRecord?.scenario ? initialRecord.scenario.expectedResult.newImageId : '');
  const [newDate, setNewDate] = useState<string>(initialRecord?.scenario ? initialRecord.scenario.newImageDate : '');
  const [newFileName, setNewFileName] = useState<string>(initialRecord ? `${initialRecord.id.toLowerCase()}-review.jpg` : '');

  // Search & Picker State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [validationError, setValidationError] = useState<string | null>(null);

  const refFileInputRef = useRef<HTMLInputElement>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);

  // Sync when initialPatientId changes
  useEffect(() => {
    if (initialPatientId) {
      const match = availableRecords.find(r => r.id.toLowerCase() === initialPatientId.toLowerCase());
      if (match) {
        handleSelectRecord(match);
      }
    }
  }, [initialPatientId, availableRecords]);

  // Dismiss dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectRecord = (record: SelectableRecord) => {
    setPatientId(record.id);
    setBodyRegion(record.bodyRegion);
    if (record.scenario) {
      setRefImage(record.scenario.referenceImage);
      setRefImageId(record.scenario.expectedResult.referenceImageId);
      setRefDate(record.scenario.referenceDate);
      setRefFileName(`${record.id.toLowerCase()}-baseline.jpg`);
      setNewImage(record.scenario.newImage);
      setNewImageId(record.scenario.expectedResult.newImageId);
      setNewDate(record.scenario.newImageDate);
      setNewFileName(`${record.id.toLowerCase()}-review.jpg`);
    } else {
      setRefImage('');
      setRefImageId('');
      setRefDate('');
      setRefFileName('');
      setNewImage('');
      setNewImageId('');
      setNewDate('');
      setNewFileName('');
    }
    setValidationError(null);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleResetRecordSelection = () => {
    setPatientId('');
    setBodyRegion('' as BodyRegion);
    setRefImage('');
    setRefImageId('');
    setRefDate('');
    setRefFileName('');
    setNewImage('');
    setNewImageId('');
    setNewDate('');
    setNewFileName('');
    setValidationError(null);
    setMaxUnlockedStep(1);
    setCurrentStep(1);
    setSearchQuery('');
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const filteredRecords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return availableRecords;
    return availableRecords.filter(rec => 
      rec.id.toLowerCase().includes(query) ||
      rec.name.toLowerCase().includes(query) ||
      rec.bodyRegion.toLowerCase().includes(query) ||
      (rec.unit && rec.unit.toLowerCase().includes(query))
    );
  }, [availableRecords, searchQuery]);

  const selectedRecord = availableRecords.find(r => r.id === patientId);

  // Sequential Step Verification Gates
  const isStep1Valid = Boolean(patientId && bodyRegion);
  const isStep2Valid = Boolean(isStep1Valid && refImage && refImageId);
  const isStep3Valid = Boolean(isStep2Valid && newImage && newImageId);

  const isStepAccessible = (stepNum: number): boolean => {
    if (stepNum === 1) return true;
    if (stepNum === 2) return maxUnlockedStep >= 2 && isStep1Valid;
    if (stepNum === 3) return maxUnlockedStep >= 3 && isStep2Valid;
    if (stepNum === 4) return maxUnlockedStep >= 4 && isStep3Valid;
    return false;
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
        setRefImageId(`REF-${patientId || 'RECORD'}`);
        setRefFileName(file.name);
        setRefDate(nowStr);
      } else {
        setNewImage(result);
        setNewImageId(`NEW-${patientId || 'RECORD'}`);
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
      if (!patientId || !bodyRegion) {
        setValidationError('Please select a valid record to continue.');
        return;
      }
      setMaxUnlockedStep(prev => Math.max(prev, 2));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!refImage || !refImageId) {
        setValidationError('Please select or upload a baseline reference photograph.');
        return;
      }
      setMaxUnlockedStep(prev => Math.max(prev, 3));
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!newImage || !newImageId) {
        setValidationError('Please select or upload a new review photograph.');
        return;
      }
      setMaxUnlockedStep(prev => Math.max(prev, 4));
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

        {/* Guarded Step Indicator: 1 Record → 2 Reference Image → 3 Review Image → 4 Compare */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs overflow-x-auto gap-2 py-1">
            {[
              { num: 1, title: 'Record' },
              { num: 2, title: 'Reference Image' },
              { num: 3, title: 'Review Image' },
              { num: 4, title: 'Compare' }
            ].map((step, idx, arr) => {
              const isCurrent = currentStep === step.num;
              const isAccessible = isStepAccessible(step.num);
              const isCompleted = isAccessible && currentStep > step.num;

              return (
                <React.Fragment key={step.num}>
                  <button
                    type="button"
                    disabled={!isAccessible}
                    onClick={() => {
                      if (isAccessible) {
                        setValidationError(null);
                        setCurrentStep(step.num);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-medium ${
                      isCurrent
                        ? 'bg-sky-50 text-sky-900 font-semibold border border-sky-300 ring-1 ring-sky-200'
                        : isAccessible
                        ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                        : 'text-slate-400 opacity-40 cursor-not-allowed'
                    }`}
                    title={!isAccessible ? `Complete earlier steps to unlock Step ${step.num}` : undefined}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isCurrent
                        ? 'bg-sky-700 text-white'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isAccessible
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isCompleted ? '✓' : step.num}
                    </span>
                    <span>{step.num} {step.title}</span>
                  </button>
                  {idx < arr.length - 1 && (
                    <span className="text-slate-300 select-none font-bold">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
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
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              STEP 1 — SELECT RECORD
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose an existing record to begin a body check.
            </p>
          </div>

          {/* Searchable Picker when no record is selected */}
          {!patientId ? (
            <div className="space-y-3" ref={searchContainerRef}>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Search records
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                      setValidationError(null);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="Search by record ID or name..."
                    className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {isSearchOpen && (
                    <div className="absolute z-20 top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-lg shadow-lg max-h-72 overflow-y-auto divide-y divide-slate-100 animate-in fade-in duration-100">
                      {filteredRecords.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-500">
                          No records found matching &ldquo;<span className="font-semibold text-slate-700">{searchQuery}</span>&rdquo;
                        </div>
                      ) : (
                        filteredRecords.map((rec) => (
                          <button
                            key={rec.id}
                            type="button"
                            onClick={() => handleSelectRecord(rec)}
                            className="w-full text-left px-4 py-3 hover:bg-sky-50 flex items-center justify-between transition-colors group cursor-pointer"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                              <span className="font-mono font-bold text-sm text-slate-900 group-hover:text-sky-900">
                                {rec.id}
                              </span>
                              <span className="text-xs text-slate-600">
                                {rec.name}
                              </span>
                              {rec.unit && (
                                <span className="text-[11px] text-slate-400 truncate max-w-xs">
                                  ({rec.unit})
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1 sm:mt-0 flex-shrink-0">
                              <span className="text-xs font-medium text-slate-700 px-2 py-0.5 bg-slate-100 rounded border border-slate-200 group-hover:bg-sky-100 group-hover:border-sky-300 group-hover:text-sky-900">
                                {rec.bodyRegion}
                              </span>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Select a record to load its associated body region and baseline documentation.
                </p>
              </div>
            </div>
          ) : (
            /* Selected Record Card */
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Selected Record
                    </span>
                    <div className="flex items-center gap-2.5 mt-1">
                      <span className="font-mono font-bold text-lg text-slate-900">
                        {patientId}
                      </span>
                      {selectedRecord?.name && (
                        <span className="text-xs text-slate-600 font-medium">
                          — {selectedRecord.name}
                        </span>
                      )}
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                        Active
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetRecordSelection}
                    className="text-xs font-semibold px-3 py-1.5 text-sky-800 hover:text-sky-950 bg-white hover:bg-sky-50 border border-slate-300 hover:border-sky-300 rounded shadow-2xs transition-colors inline-flex items-center gap-1 self-start sm:self-center"
                  >
                    <span>Change record</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Body Region
                    </label>
                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-900">
                      <span className="font-semibold text-slate-900">{bodyRegion}</span>
                      <span className="text-[11px] text-slate-400 font-medium">(Locked to record)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Care Unit
                    </label>
                    <div className="bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-700 truncate">
                      {selectedRecord?.unit || 'Residential Wellbeing Unit'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1 Actions */}
          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              type="button"
              onClick={handleNextStep}
              disabled={!patientId || !bodyRegion}
              className={`px-4 py-2 text-xs font-semibold rounded shadow-sm flex items-center gap-1.5 transition-colors ${
                patientId && bodyRegion
                  ? 'bg-sky-700 hover:bg-sky-800 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
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
              onClick={() => {
                setValidationError(null);
                setCurrentStep(1);
              }}
              className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded text-xs font-medium flex items-center gap-1 hover:bg-slate-50"
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
              onClick={() => {
                setValidationError(null);
                setCurrentStep(2);
              }}
              className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded text-xs font-medium flex items-center gap-1 hover:bg-slate-50"
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
                onClick={() => {
                  setValidationError(null);
                  setCurrentStep(3);
                }}
                className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded text-xs font-medium flex items-center gap-1 hover:bg-slate-50"
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
