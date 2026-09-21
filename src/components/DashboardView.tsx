import React, { useState } from 'react';
import { BodyCheckRecord, PatientRecord } from '../types/bodyCheck';
import { 
  PlusCircle, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileSearch, 
  User, 
  FileEdit,
  FolderKanban
} from 'lucide-react';

interface DashboardViewProps {
  patients: PatientRecord[];
  records: BodyCheckRecord[];
  onStartNewCheck: (patientId?: string) => void;
  onOpenRecord: (record: BodyCheckRecord) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  patients,
  records,
  onStartNewCheck,
  onOpenRecord
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || 'IF456');

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const patientChecks = records.filter(r => r.patientRecordId === selectedPatientId);
  const confirmedChecks = records.filter(r => r.status === 'confirmed');
  const aiDraftReadyChecks = records.filter(r => r.status === 'ai_draft_ready');
  const pendingReviewChecks = records.filter(r => r.status === 'ready_for_review' || r.status === 'human_review');

  return (
    <div className="space-y-6">
      
      {/* Header Banner - Restrained Institutional Style */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Body Check Overview</h1>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                Authorized Staff Portal
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Review and document visible changes between body-check images.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onStartNewCheck('IF456')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ New Body Check</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Metrics Row conforming to PRD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Monitored Records */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Monitored Records</span>
            <div className="mt-1 text-2xl font-bold text-slate-900 font-mono">{patients.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Monitored profiles</div>
          </div>
          <div className="h-10 w-10 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        {/* Total Body Checks */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Body Checks</span>
            <div className="mt-1 text-2xl font-bold text-slate-900 font-mono">{records.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Logged checks</div>
          </div>
          <div className="h-10 w-10 rounded-md bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <FileSearch className="w-5 h-5" />
          </div>
        </div>

        {/* Checks Requiring Review / AI Drafts */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Awaiting Review / Drafts</span>
            <div className="mt-1 text-2xl font-bold text-amber-700 font-mono">
              {aiDraftReadyChecks.length + pendingReviewChecks.length}
            </div>
            <div className="text-[10px] text-amber-700 mt-0.5">Requires human review</div>
          </div>
          <div className="h-10 w-10 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Confirmed Observations */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Confirmed Observations</span>
            <div className="mt-1 text-2xl font-bold text-emerald-700 font-mono">{confirmedChecks.length}</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Human attested</div>
          </div>
          <div className="h-10 w-10 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Patient / Demo Record Selector */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              Record Quick Inspection
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Select a monitored profile to view checks or launch a new comparison</p>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-md px-3 py-1.5 focus:ring-1 focus:ring-sky-500 font-mono font-medium"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} — {p.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => onStartNewCheck(selectedPatientId)}
              className="text-xs font-semibold px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded border border-sky-300 transition-colors flex items-center gap-1.5"
            >
              <span>Start Check for {selectedPatientId}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Patient Details Quick-Bar */}
        {selectedPatient && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-50/80 p-3.5 rounded border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Record ID</span>
              <span className="font-mono font-bold text-slate-900">{selectedPatient.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Care Unit</span>
              <span className="font-medium text-slate-800">{selectedPatient.unit}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Assigned Safeguarding</span>
              <span className="font-medium text-slate-800">{selectedPatient.primaryCaregiver}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Previous Check</span>
              <span className="font-mono text-slate-700">{selectedPatient.lastCheckDate || 'No record'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Logged Checks</span>
              <span className="font-mono font-semibold text-sky-700">{patientChecks.length} record(s)</span>
            </div>
          </div>
        )}
      </div>

      {/* Recent Body Checks Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Recent Body Checks ({records.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Historical comparisons, candidate findings, and confirmed observations</p>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>Audit sync active</span>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p className="text-sm">No body checks recorded yet.</p>
            <button
              onClick={() => onStartNewCheck('IF456')}
              className="mt-3 text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1"
            >
              Start check for IF456
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3">Record ID & Date</th>
                  <th scope="col" className="px-4 py-3">Patient Record</th>
                  <th scope="col" className="px-4 py-3">Body Region</th>
                  <th scope="col" className="px-4 py-3">Visual Comparison</th>
                  <th scope="col" className="px-4 py-3">Finding Summary</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Reviewer</th>
                  <th scope="col" className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Check ID & Date */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-900">{record.id}</div>
                      <div className="text-slate-500 font-mono text-[11px] mt-0.5">{record.newImageDate}</div>
                    </td>

                    {/* Patient Record */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300 text-[11px]">
                        {record.patientRecordId}
                      </span>
                    </td>

                    {/* Body Region */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-semibold text-slate-800">{record.bodyRegion}</span>
                    </td>

                    {/* Visual Comparison Mini-Previews */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="relative group">
                          <img
                            src={record.referenceImage}
                            alt="Reference"
                            className="w-10 h-8 object-cover rounded border border-slate-300 bg-slate-900"
                          />
                          <span className="absolute bottom-0 left-0 bg-slate-900/90 text-[8px] text-white px-0.5 font-mono">
                            REF
                          </span>
                        </div>
                        <span className="text-slate-400 text-xs">→</span>
                        <div className="relative group">
                          <img
                            src={record.newImage}
                            alt="Review"
                            className="w-10 h-8 object-cover rounded border border-slate-300 bg-slate-900"
                          />
                          <span className="absolute bottom-0 left-0 bg-sky-900/90 text-[8px] text-white px-0.5 font-mono">
                            NEW
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Assistive Finding Summary */}
                    <td className="px-4 py-3.5 max-w-xs truncate">
                      <div className="font-medium text-slate-900 truncate">{record.finding}</div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {record.finalObservation || record.aiObservation}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {record.status === 'confirmed' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Confirmed
                        </span>
                      ) : record.status === 'ai_draft_ready' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-sky-50 text-sky-800 border border-sky-200">
                          <FileEdit className="w-3 h-3 text-sky-600" />
                          AI Draft Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertCircle className="w-3 h-3" />
                          Ready for Review
                        </span>
                      )}
                    </td>

                    {/* Reviewer */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                      {record.reviewer || <span className="text-slate-400 italic">Unassigned</span>}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-right">
                      <button
                        onClick={() => onOpenRecord(record)}
                        className="text-xs font-semibold text-sky-700 hover:text-sky-900 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
