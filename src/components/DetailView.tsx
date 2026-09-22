import React, { useState } from 'react';
import { BodyCheckRecord } from '../types/bodyCheck';
import { 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Tag, 
  ZoomIn, 
  X, 
  History, 
  User, 
  FileEdit,
  Clock
} from 'lucide-react';

interface DetailViewProps {
  record: BodyCheckRecord;
  onBack: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ record, onBack }) => {
  const [activeZoomImage, setActiveZoomImage] = useState<{
    title: string;
    src: string;
    id: string;
    date: string;
  } | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 print:space-y-4 print:p-0">
      
      {/* Top Header / Action Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200"
              title="Return to list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-mono font-bold text-slate-900">{record.id}</span>
                {record.status === 'confirmed' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Human Confirmed
                  </span>
                ) : record.status === 'ai_draft_ready' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-sky-50 text-sky-800 border border-sky-200">
                    <FileEdit className="w-3.5 h-3.5 text-sky-600" />
                    AI Draft Ready
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Pending Human Review
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Patient Record: <strong className="font-mono text-slate-800">{record.patientRecordId}</strong> • Region: <strong className="text-slate-800">{record.bodyRegion}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Record</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Report Header */}
      <div className="hidden print:block border-b border-slate-400 pb-4 mb-4">
        <h1 className="text-xl font-bold">Body Check Visual Comparison Record</h1>
        <p className="text-xs text-slate-600">Comparison Documentation</p>
        <div className="text-xs font-mono mt-2">
          Record ID: {record.id} | Patient: {record.patientRecordId} | Date: {record.newImageDate}
        </div>
      </div>

      {/* Side-by-Side Images Card */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden p-5 space-y-4 print-card">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" />
          Comparative Visual Evidence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Reference Image */}
          <div className="border border-slate-200 rounded overflow-hidden flex flex-col">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex justify-between text-xs">
              <span className="font-mono font-bold text-slate-700">REFERENCE: {record.referenceImageId}</span>
              <span className="font-mono text-slate-500">{record.referenceDate}</span>
            </div>
            <div 
              className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center cursor-zoom-in group"
              onClick={() => setActiveZoomImage({
                title: 'Reference Baseline Image',
                src: record.referenceImage,
                id: record.referenceImageId,
                date: record.referenceDate
              })}
            >
              <img
                src={record.referenceImage}
                alt="Baseline reference"
                className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-slate-900/75 hover:bg-slate-900 text-white text-[11px] px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity no-print"
                title="Inspect high-resolution image"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </button>
            </div>
            <div className="p-2.5 bg-slate-50 text-[10px] text-slate-500 font-mono border-t border-slate-200 flex justify-between">
              <span>Baseline Documentation</span>
            </div>
          </div>

          {/* New Image */}
          <div className="border border-slate-200 rounded overflow-hidden flex flex-col">
            <div className="bg-sky-50 px-3 py-2 border-b border-slate-200 flex justify-between text-xs">
              <span className="font-mono font-bold text-slate-800">NEW REVIEW: {record.newImageId}</span>
              <span className="font-mono text-slate-500">{record.newImageDate}</span>
            </div>
            <div 
              className="aspect-[4/3] bg-slate-950 flex items-center justify-center relative cursor-zoom-in group"
              onClick={() => setActiveZoomImage({
                title: 'New Review Image',
                src: record.newImage,
                id: record.newImageId,
                date: record.newImageDate
              })}
            >
              <img
                src={record.newImage}
                alt="New follow-up review"
                className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              />
              {record.changeCoordinates && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${record.changeCoordinates.xPercent}%`,
                    top: `${record.changeCoordinates.yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${record.changeCoordinates.radiusPercent * 2.2}%`,
                    height: `${record.changeCoordinates.radiusPercent * 2.2}%`,
                  }}
                >
                  <div className="w-full h-full rounded-full border-2 border-dashed border-rose-500 bg-rose-500/20"></div>
                </div>
              )}
              <button
                type="button"
                className="absolute top-2 right-2 bg-slate-900/75 hover:bg-slate-900 text-white text-[11px] px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity no-print"
                title="Inspect high-resolution image"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </button>
            </div>
            <div className="p-2.5 bg-slate-50 text-[10px] text-slate-500 font-mono border-t border-slate-200 flex justify-between">
              <span className="text-rose-700 font-semibold">{record.finding}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Metadata & Analysis Details */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4 print-card">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
          <Tag className="w-3.5 h-3.5" />
          Analysis & Finding Classification
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Body Region</span>
            <span className="font-semibold text-slate-900 mt-1 block">{record.bodyRegion}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Change Classification</span>
            <span className="font-medium text-slate-800 mt-1 block">{record.changeType}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Candidate Finding</span>
            <span className="font-semibold text-rose-800 mt-1 block">{record.finding}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Assessed Confidence</span>
              <span className="font-semibold text-slate-900 mt-1 block">
                {record.confidence} confidence
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1" title="Confidence reflects the comparison result and is not diagnostic accuracy.">
              Non-diagnostic comparison
            </span>
          </div>
        </div>
      </div>

      {/* Observation Documentation (AI Draft vs Final Confirmed) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4 print-card">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
          Observation Documentation & Human Review
        </h2>

        {/* 1. Original AI Draft */}
        <div className="bg-slate-50 border border-slate-200 rounded p-3.5 text-xs space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              1. Initial AI-Generated Assistive Draft
            </span>
            <span className="text-[10px] font-mono text-slate-400">Automated Comparison Output</span>
          </div>
          <p className="text-slate-700 italic leading-relaxed">
            "{record.aiObservation}"
          </p>
        </div>

        {/* 2. Final Human-Confirmed Observation */}
        <div className="bg-emerald-50/50 border border-emerald-200 rounded p-4 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              2. Final Human-Confirmed Observation
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">Confirmed Observation</span>
          </div>
          <p className="text-slate-900 font-medium text-sm leading-relaxed">
            "{record.finalObservation || record.aiObservation}"
          </p>
        </div>

        {/* Reviewer Signature Box */}
        <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Reviewer Name</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{record.reviewer || 'Pending review'}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Reviewer Role</span>
            <span className="text-slate-700 mt-0.5 block">{record.reviewerRole || 'Reviewer'}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Confirmation Timestamp</span>
            <span className="font-mono text-slate-800 mt-0.5 block">{record.confirmedAt || 'Not confirmed yet'}</span>
          </div>
        </div>

        {record.reviewerNotes && (
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Reviewer Follow-up Notes:</span>
            <p className="text-slate-800">{record.reviewerNotes}</p>
          </div>
        )}
      </div>

      {/* Chronological Audit Activity Timeline */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4 print-card">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-slate-500" />
            Activity Timeline ({record.auditTrail?.length || 0} Events)
          </h2>
          <span className="text-[11px] font-mono text-slate-400">Activity Log</span>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {record.auditTrail && record.auditTrail.length > 0 ? (
            record.auditTrail.map((ev, index) => {
              const isSystem = ev.actor.toLowerCase() === 'system';
              return (
                <div key={ev.id || index} className="relative group text-xs">
                  {/* Timeline bullet */}
                  <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                    isSystem ? 'bg-slate-400' : 'bg-sky-600'
                  }`}></div>

                  <div className="bg-slate-50/70 hover:bg-slate-50 p-3 rounded border border-slate-200 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        {isSystem ? (
                          <FileText className="w-3 h-3 text-slate-500" />
                        ) : (
                          <User className="w-3 h-3 text-sky-700" />
                        )}
                        <span>{ev.action}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{ev.timestamp}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Actor: <span className="font-semibold text-slate-800">{ev.actor}</span> ({ev.actorRole})
                    </div>

                    {ev.details && (
                      <div className="text-[11px] text-slate-500 mt-1 font-mono bg-white p-1.5 rounded border border-slate-200">
                        {ev.details}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-xs text-slate-400 italic">No audit events logged yet.</div>
          )}
        </div>
      </div>

      {/* High-Resolution Photographic Zoom Inspection Modal */}
      {activeZoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 no-print"
          onClick={() => setActiveZoomImage(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  {activeZoomImage.id}
                </span>
                <span className="text-sm font-semibold">{activeZoomImage.title}</span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">• {activeZoomImage.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveZoomImage(null)}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-black p-2 flex items-center justify-center overflow-auto min-h-[300px]">
              <img
                src={activeZoomImage.src}
                alt={activeZoomImage.title}
                className="max-h-[75vh] w-auto object-contain rounded select-none"
              />
            </div>

            <div className="bg-slate-900 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>High-resolution audit inspection view</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
