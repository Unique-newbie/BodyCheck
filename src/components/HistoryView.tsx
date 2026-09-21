import React, { useState } from 'react';
import { BodyCheckRecord } from '../types/bodyCheck';
import { 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Calendar, 
  FileText, 
  PlusCircle,
  FileEdit
} from 'lucide-react';

interface HistoryViewProps {
  records: BodyCheckRecord[];
  onOpenRecord: (record: BodyCheckRecord) => void;
  onStartNewCheck: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  records,
  onOpenRecord,
  onStartNewCheck
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'ai_draft_ready' | 'ready_for_review'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  // Filter records
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientRecordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.finding.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.reviewer && record.reviewer.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (record.finalObservation && record.finalObservation.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || record.bodyRegion === regionFilter;

    return matchesSearch && matchesStatus && matchesRegion;
  });

  const uniqueRegions = Array.from(new Set(records.map(r => r.bodyRegion)));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Body Check History</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready log of past and pending visual body-check comparisons and human-confirmed observations.
          </p>
        </div>

        <button
          onClick={onStartNewCheck}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Body Check</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID, finding, observation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value="all">All Statuses ({records.length})</option>
              <option value="confirmed">Confirmed</option>
              <option value="ai_draft_ready">AI Draft Ready</option>
              <option value="ready_for_review">Ready for Review</option>
            </select>
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Region:</span>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value="all">All Regions</option>
              {uniqueRegions.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FileText className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-700">No matching body check records found.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3">Record ID & Date</th>
                  <th scope="col" className="px-4 py-3">Patient</th>
                  <th scope="col" className="px-4 py-3">Images (Ref / New)</th>
                  <th scope="col" className="px-4 py-3">Body Region</th>
                  <th scope="col" className="px-4 py-3">Observation Summary</th>
                  <th scope="col" className="px-4 py-3">Reviewer Status</th>
                  <th scope="col" className="px-4 py-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    onClick={() => onOpenRecord(record)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    
                    {/* Record ID & Date */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-900">{record.id}</div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {record.newImageDate}
                      </div>
                    </td>

                    {/* Patient ID */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                        {record.patientRecordId}
                      </span>
                    </td>

                    {/* Side-by-Side Visual Thumbnails */}
                    <td className="px-4 py-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <div className="relative group">
                          <img
                            src={record.referenceImage}
                            alt="Ref"
                            className="w-12 h-9 object-cover rounded border border-slate-300 bg-slate-900"
                          />
                          <span className="absolute bottom-0 left-0 bg-slate-900/90 text-[8px] text-white px-1 font-mono">
                            REF
                          </span>
                        </div>
                        <span className="text-slate-400">→</span>
                        <div className="relative group">
                          <img
                            src={record.newImage}
                            alt="New"
                            className="w-12 h-9 object-cover rounded border border-slate-300 bg-slate-900"
                          />
                          <span className="absolute bottom-0 left-0 bg-sky-900/90 text-[8px] text-white px-1 font-mono">
                            NEW
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Body Region */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-medium text-slate-800">{record.bodyRegion}</span>
                      <div className="text-[10px] text-slate-500 truncate">{record.changeType}</div>
                    </td>

                    {/* Observation Summary */}
                    <td className="px-4 py-3.5 max-w-sm">
                      <div className="font-medium text-slate-900 line-clamp-2 leading-tight">
                        {record.finalObservation || record.aiObservation}
                      </div>
                    </td>

                    {/* Reviewer Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {record.status === 'confirmed' ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Confirmed
                          </span>
                          <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                            {record.reviewer || 'Clinical Reviewer'}
                          </div>
                        </div>
                      ) : record.status === 'ai_draft_ready' ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertCircle className="w-3 h-3" />
                            AI Draft Ready
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Awaiting human review
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-sky-50 text-sky-700 border border-sky-200">
                            <FileEdit className="w-3 h-3" />
                            Ready for Review
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Check initialized
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Open Action */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRecord(record);
                        }}
                        className="text-xs font-semibold text-sky-700 hover:text-sky-900 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open</span>
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
