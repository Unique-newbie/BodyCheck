export type ConfidenceLevel = 'High' | 'Moderate' | 'Low' | 'Uncertain';

export type BodyRegion = 
  | 'Left Shoulder'
  | 'Right Shoulder'
  | 'Left Upper Arm'
  | 'Right Upper Arm'
  | 'Left Forearm'
  | 'Right Forearm'
  | 'Chest'
  | 'Abdomen'
  | 'Back'
  | 'Upper Back'
  | 'Lower Back'
  | 'Left Knee'
  | 'Right Knee'
  | 'Left Thigh'
  | 'Right Thigh'
  | 'Left Lower Leg'
  | 'Right Lower Leg'
  | 'Other';

export type ChangeType = 
  | 'Color / Skin Appearance Change'
  | 'Visible Bruising-like Appearance'
  | 'Tissue / Skin Appearance Difference'
  | 'Other Visible Change'
  | 'No Significant Visible Change';

export type CheckStatus = 
  | 'ready_for_review'
  | 'ai_draft_ready'
  | 'human_review'
  | 'confirmed';

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  details?: string;
}

export interface CandidateFinding {
  bodyRegion: BodyRegion;
  changeType: ChangeType;
  finding: string;
  confidence: ConfidenceLevel;
  confidenceScore: number;
  changeCoordinates?: {
    xPercent: number;
    yPercent: number;
    radiusPercent: number;
  };
}

export interface BodyCheckRecord {
  id: string; // e.g. "BC-2026-0891"
  patientRecordId: string; // e.g. "IF456"
  patientName?: string;
  
  // Reference Baseline Image
  referenceImage: string;
  referenceImageId: string;
  referenceDate: string;
  
  // New / Review Image
  newImage: string;
  newImageId: string;
  newImageDate: string;
  
  // Body Region & Findings
  bodyRegion: BodyRegion;
  changeType: ChangeType;
  finding: string;
  confidence: ConfidenceLevel;
  confidenceScore?: number;
  candidateFinding?: CandidateFinding;
  
  // Observations
  aiObservation: string; // Initial AI draft
  finalObservation: string; // Reviewer-edited or confirmed observation
  draftSavedAt?: string;
  
  // Human Review Status & Governance
  status: CheckStatus;
  reviewer?: string; // e.g. "Sarah Mitchell"
  reviewerRole?: string; // e.g. "Reviewer"
  confirmedAt?: string;
  reviewerNotes?: string;
  
  // Visual Reticle Coordinates
  changeCoordinates?: {
    xPercent: number;
    yPercent: number;
    radiusPercent: number;
  };

  // Chronological Audit Activity Trail
  auditTrail: AuditEvent[];
}

export interface PatientRecord {
  id: string; // e.g. "IF456"
  name: string;
  unit: string;
  dateOfBirth?: string;
  primaryCaregiver?: string;
  lastCheckDate?: string;
  activeStatus: 'active' | 'archived';
  defaultRegion?: BodyRegion;
}

export interface AnalysisResult {
  referenceImageId: string;
  referenceDate: string;
  newImageId: string;
  newImageDate: string;
  bodyRegion: BodyRegion;
  changeType: ChangeType;
  finding: string;
  confidence: ConfidenceLevel;
  confidenceScore: number;
  aiObservation: string;
  candidateFinding: CandidateFinding;
  changeCoordinates?: {
    xPercent: number;
    yPercent: number;
    radiusPercent: number;
  };
}

export interface DemoScenario {
  id: string;
  title: string;
  patientRecordId: string;
  bodyRegion: BodyRegion;
  description: string;
  referenceDate: string;
  newImageDate: string;
  referenceImage: string;
  newImage: string;
  expectedResult: AnalysisResult;
}
