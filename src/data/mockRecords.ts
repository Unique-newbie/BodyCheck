import { BodyCheckRecord, PatientRecord, DemoScenario } from '../types/bodyCheck';

/**
 * Centrally managed demonstration photographic assets.
 * All images are bundled locally in public/images/demo/ for zero external network dependency.
 */
export const DEMO_ASSETS = {
  if456: {
    reference: '/images/demo/if456-shoulder-ref.jpg',
    review: '/images/demo/if456-shoulder-review.jpg',
  },
  if455: {
    reference: '/images/demo/if455-forearm-ref.jpg',
    review: '/images/demo/if455-forearm-review.jpg',
  },
  if452: {
    reference: '/images/demo/if452-back-ref.jpg',
    review: '/images/demo/if452-back-review.jpg',
  },
  if439: {
    reference: '/images/demo/if439-knee-ref.jpg',
    review: '/images/demo/if439-knee-review.jpg',
  },
  if461: {
    reference: '/images/demo/if461-rshoulder-ref.jpg',
    review: '/images/demo/if461-rshoulder-review.jpg',
  },
  if468: {
    reference: '/images/demo/if468-lupperarm-ref.jpg',
    review: '/images/demo/if468-lupperarm-review.jpg',
  },
  if472: {
    reference: '/images/demo/if472-lowerback-ref.jpg',
    review: '/images/demo/if472-lowerback-review.jpg',
  },
  if477: {
    reference: '/images/demo/if477-rknee-ref.jpg',
    review: '/images/demo/if477-rknee-review.jpg',
  }
};

// Built-in synthetic test scenarios using realistic photographic demonstration images
export const DEMO_SCENARIOS: DemoScenario[] = [
  // 1. IF456 — Primary Demonstration (Left Shoulder)
  {
    id: 'scenario-if456',
    title: 'IF456 — Left Shoulder (Color / Bruise-like Change)',
    patientRecordId: 'IF456',
    bodyRegion: 'Left Shoulder',
    description: 'Baseline reference comparison showing visible reddish discoloration on the left shoulder deltoid compared to baseline.',
    referenceDate: '2026-09-14 09:30',
    newImageDate: '2026-09-21 14:15',
    referenceImage: DEMO_ASSETS.if456.reference,
    newImage: DEMO_ASSETS.if456.review,
    expectedResult: {
      referenceImageId: 'IF456',
      referenceDate: '2026-09-14 09:30',
      newImageId: 'IF456-REV-02',
      newImageDate: '2026-09-21 14:15',
      bodyRegion: 'Left Shoulder',
      changeType: 'Color / Skin Appearance Change',
      finding: 'Reddish discoloration / bruise-like appearance',
      confidence: 'Moderate',
      confidenceScore: 0.78,
      candidateFinding: {
        bodyRegion: 'Left Shoulder',
        changeType: 'Color / Skin Appearance Change',
        finding: 'Reddish discoloration / bruise-like appearance',
        confidence: 'Moderate',
        confidenceScore: 0.78,
        changeCoordinates: {
          xPercent: 48.0,
          yPercent: 41.5,
          radiusPercent: 12
        }
      },
      aiObservation: 'Reviewing the new picture against reference image IF456, there is a reddish discoloration on the right side of the left shoulder suggesting a possible bruise-like change.',
      changeCoordinates: {
        xPercent: 48.0,
        yPercent: 41.5,
        radiusPercent: 12
      }
    }
  },

  // 2. IF455 — Right Forearm (Linear Surface Erythema)
  {
    id: 'scenario-if455',
    title: 'IF455 — Right Forearm (Linear Surface Erythema)',
    patientRecordId: 'IF455',
    bodyRegion: 'Right Forearm',
    description: 'Follow-up inspection showing superficial linear surface erythema along the distal volar forearm.',
    referenceDate: '2026-09-10 11:00',
    newImageDate: '2026-09-21 10:45',
    referenceImage: DEMO_ASSETS.if455.reference,
    newImage: DEMO_ASSETS.if455.review,
    expectedResult: {
      referenceImageId: 'IF455',
      referenceDate: '2026-09-10 11:00',
      newImageId: 'IF455-REV-04',
      newImageDate: '2026-09-21 10:45',
      bodyRegion: 'Right Forearm',
      changeType: 'Tissue / Skin Appearance Difference',
      finding: 'Linear surface erythema / abrasion-like marking',
      confidence: 'High',
      confidenceScore: 0.89,
      candidateFinding: {
        bodyRegion: 'Right Forearm',
        changeType: 'Tissue / Skin Appearance Difference',
        finding: 'Linear surface erythema / abrasion-like marking',
        confidence: 'High',
        confidenceScore: 0.89,
        changeCoordinates: {
          xPercent: 54.0,
          yPercent: 55.0,
          radiusPercent: 12
        }
      },
      aiObservation: 'Reviewing the new picture against reference image IF455, superficial linear erythema is noted across the distal volar aspect of the right forearm without visible swelling.',
      changeCoordinates: {
        xPercent: 54.0,
        yPercent: 55.0,
        radiusPercent: 12
      }
    }
  },

  // 3. IF452 — Upper Back (Routine Check / No Significant Change)
  {
    id: 'scenario-if452',
    title: 'IF452 — Upper Back (Routine Check / No Significant Change)',
    patientRecordId: 'IF452',
    bodyRegion: 'Upper Back',
    description: 'Routine follow-up body check showing stable baseline appearance with no identified visible changes.',
    referenceDate: '2026-09-08 16:20',
    newImageDate: '2026-09-21 15:00',
    referenceImage: DEMO_ASSETS.if452.reference,
    newImage: DEMO_ASSETS.if452.review,
    expectedResult: {
      referenceImageId: 'IF452',
      referenceDate: '2026-09-08 16:20',
      newImageId: 'IF452-REV-01',
      newImageDate: '2026-09-21 15:00',
      bodyRegion: 'Upper Back',
      changeType: 'No Significant Visible Change',
      finding: 'No significant visible change identified',
      confidence: 'High',
      confidenceScore: 0.94,
      candidateFinding: {
        bodyRegion: 'Upper Back',
        changeType: 'No Significant Visible Change',
        finding: 'No significant visible change identified',
        confidence: 'High',
        confidenceScore: 0.94
      },
      aiObservation: 'Reviewing the new picture against reference image IF452, no significant visible change or new focal discoloration identified across the upper thoracic dorsal region.'
    }
  },

  // 4. IF439 — Right Lower Leg (Faint Mottled Discoloration)
  {
    id: 'scenario-if439',
    title: 'IF439 — Right Lower Leg (Faint Mottled Discoloration)',
    patientRecordId: 'IF439',
    bodyRegion: 'Right Lower Leg',
    description: 'Post-activity check noting faint mottled discoloration along the lateral patellar border.',
    referenceDate: '2026-09-12 13:10',
    newImageDate: '2026-09-20 16:30',
    referenceImage: DEMO_ASSETS.if439.reference,
    newImage: DEMO_ASSETS.if439.review,
    expectedResult: {
      referenceImageId: 'IF439',
      referenceDate: '2026-09-12 13:10',
      newImageId: 'IF439-REV-03',
      newImageDate: '2026-09-20 16:30',
      bodyRegion: 'Right Lower Leg',
      changeType: 'Visible Bruising-like Appearance',
      finding: 'Faint mottled discoloration / possible minor contusion',
      confidence: 'Moderate',
      confidenceScore: 0.72,
      candidateFinding: {
        bodyRegion: 'Right Lower Leg',
        changeType: 'Visible Bruising-like Appearance',
        finding: 'Faint mottled discoloration / possible minor contusion',
        confidence: 'Moderate',
        confidenceScore: 0.72,
        changeCoordinates: {
          xPercent: 56.0,
          yPercent: 53.0,
          radiusPercent: 11
        }
      },
      aiObservation: 'Reviewing the new picture against reference image IF439, faint mottled discoloration observed near the superior-lateral border of the right knee.',
      changeCoordinates: {
        xPercent: 56.0,
        yPercent: 53.0,
        radiusPercent: 11
      }
    }
  },

  // 5. IF461 — Right Shoulder (Localized Reddish Discoloration)
  {
    id: 'scenario-if461',
    title: 'IF461 — Right Shoulder (Localized Reddish Discoloration)',
    patientRecordId: 'IF461',
    bodyRegion: 'Right Shoulder',
    description: 'Post-incident review showing localized reddish skin discoloration across the lateral right shoulder deltoid.',
    referenceDate: '2026-09-11 14:00',
    newImageDate: '2026-09-21 11:20',
    referenceImage: DEMO_ASSETS.if461.reference,
    newImage: DEMO_ASSETS.if461.review,
    expectedResult: {
      referenceImageId: 'IF461',
      referenceDate: '2026-09-11 14:00',
      newImageId: 'IF461-REV-02',
      newImageDate: '2026-09-21 11:20',
      bodyRegion: 'Right Shoulder',
      changeType: 'Color / Skin Appearance Change',
      finding: 'Localized reddish discoloration / contusion-like mark',
      confidence: 'Moderate',
      confidenceScore: 0.81,
      candidateFinding: {
        bodyRegion: 'Right Shoulder',
        changeType: 'Color / Skin Appearance Change',
        finding: 'Localized reddish discoloration / contusion-like mark',
        confidence: 'Moderate',
        confidenceScore: 0.81,
        changeCoordinates: {
          xPercent: 52.0,
          yPercent: 46.0,
          radiusPercent: 12
        }
      },
      aiObservation: 'Reviewing the new picture against reference image IF461, there is a localized reddish discoloration across the lateral aspect of the right shoulder consistent with a minor contusion-like appearance. Surrounding skin remains intact without open breach.',
      changeCoordinates: {
        xPercent: 52.0,
        yPercent: 46.0,
        radiusPercent: 12
      }
    }
  },

  // 6. IF468 — Left Upper Arm (Faint Mottled Discoloration)
  {
    id: 'scenario-if468',
    title: 'IF468 — Left Upper Arm (Faint Mottled Discoloration)',
    patientRecordId: 'IF468',
    bodyRegion: 'Left Upper Arm',
    description: 'Routine wellbeing check identifying faint localized mottled skin discoloration on the lateral upper arm.',
    referenceDate: '2026-09-13 10:30',
    newImageDate: '2026-09-21 15:45',
    referenceImage: DEMO_ASSETS.if468.reference,
    newImage: DEMO_ASSETS.if468.review,
    expectedResult: {
      referenceImageId: 'IF468',
      referenceDate: '2026-09-13 10:30',
      newImageId: 'IF468-REV-01',
      newImageDate: '2026-09-21 15:45',
      bodyRegion: 'Left Upper Arm',
      changeType: 'Visible Bruising-like Appearance',
      finding: 'Faint localized mottled discoloration',
      confidence: 'Moderate',
      confidenceScore: 0.74,
      candidateFinding: {
        bodyRegion: 'Left Upper Arm',
        changeType: 'Visible Bruising-like Appearance',
        finding: 'Faint localized mottled discoloration',
        confidence: 'Moderate',
        confidenceScore: 0.74,
        changeCoordinates: {
          xPercent: 49.0,
          yPercent: 50.0,
          radiusPercent: 11
        }
      },
      aiObservation: 'Reviewing the new picture against reference image IF468, faint localized mottled discoloration is noted on the lateral left upper arm that was not visible on baseline capture. Skin surface remains intact without edema.',
      changeCoordinates: {
        xPercent: 49.0,
        yPercent: 50.0,
        radiusPercent: 11
      }
    }
  },

  // 7. IF472 — Lower Back (Routine Check / No Significant Change)
  {
    id: 'scenario-if472',
    title: 'IF472 — Lower Back (Routine Check / No Significant Change)',
    patientRecordId: 'IF472',
    bodyRegion: 'Lower Back',
    description: 'Routine scheduled documentation; reference and follow-up images exhibit consistent, intact skin presentation without new markings.',
    referenceDate: '2026-09-09 09:15',
    newImageDate: '2026-09-21 13:30',
    referenceImage: DEMO_ASSETS.if472.reference,
    newImage: DEMO_ASSETS.if472.review,
    expectedResult: {
      referenceImageId: 'IF472',
      referenceDate: '2026-09-09 09:15',
      newImageId: 'IF472-REV-02',
      newImageDate: '2026-09-21 13:30',
      bodyRegion: 'Lower Back',
      changeType: 'No Significant Visible Change',
      finding: 'No significant visible change identified',
      confidence: 'High',
      confidenceScore: 0.95,
      candidateFinding: {
        bodyRegion: 'Lower Back',
        changeType: 'No Significant Visible Change',
        finding: 'No significant visible change identified',
        confidence: 'High',
        confidenceScore: 0.95
      },
      aiObservation: 'Reviewing the new picture against reference image IF472, no significant visible change or new discoloration identified across the lower lumbar and dorsal region. Cutaneous presentation appears stable.'
    }
  },

  // 8. IF477 — Right Knee (Routine Check / No Significant Change)
  {
    id: 'scenario-if477',
    title: 'IF477 — Right Knee (Routine Check / No Significant Change)',
    patientRecordId: 'IF477',
    bodyRegion: 'Right Knee',
    description: 'Post-recreational activity check; anatomical landmarks and surface skin texture remain unremarkable compared to baseline.',
    referenceDate: '2026-09-15 11:45',
    newImageDate: '2026-09-21 16:15',
    referenceImage: DEMO_ASSETS.if477.reference,
    newImage: DEMO_ASSETS.if477.review,
    expectedResult: {
      referenceImageId: 'IF477',
      referenceDate: '2026-09-15 11:45',
      newImageId: 'IF477-REV-01',
      newImageDate: '2026-09-21 16:15',
      bodyRegion: 'Right Knee',
      changeType: 'No Significant Visible Change',
      finding: 'No significant visible change identified',
      confidence: 'High',
      confidenceScore: 0.92,
      candidateFinding: {
        bodyRegion: 'Right Knee',
        changeType: 'No Significant Visible Change',
        finding: 'No significant visible change identified',
        confidence: 'High',
        confidenceScore: 0.92
      },
      aiObservation: 'Reviewing the new picture against reference image IF477, no significant visible change identified across the right anterior patellar region. Joint contour and cutaneous surface remain consistent with baseline.'
    }
  }
];

// Monitored records for selector
export const MOCK_PATIENTS: PatientRecord[] = [
  {
    id: 'IF456',
    name: 'Record IF-456',
    unit: 'Residential Unit B (Care & Wellbeing)',
    dateOfBirth: '2009-04-12',
    primaryCaregiver: 'Case Officer Miller',
    lastCheckDate: '2026-09-14 09:30',
    activeStatus: 'active',
    defaultRegion: 'Left Shoulder'
  },
  {
    id: 'IF455',
    name: 'Record IF-455',
    unit: 'Residential Unit A (Assessment)',
    dateOfBirth: '2010-08-25',
    primaryCaregiver: 'Sarah Mitchell, Reviewer',
    lastCheckDate: '2026-09-10 11:00',
    activeStatus: 'active',
    defaultRegion: 'Right Forearm'
  },
  {
    id: 'IF452',
    name: 'Record IF-452',
    unit: 'Community Care Placement Unit',
    dateOfBirth: '2008-11-03',
    primaryCaregiver: 'Case Worker D. Chen',
    lastCheckDate: '2026-09-08 16:20',
    activeStatus: 'active',
    defaultRegion: 'Upper Back'
  },
  {
    id: 'IF439',
    name: 'Record IF-439',
    unit: 'Care Support Wing',
    dateOfBirth: '2009-01-19',
    primaryCaregiver: 'Care Worker T. Harris',
    lastCheckDate: '2026-09-12 13:10',
    activeStatus: 'active',
    defaultRegion: 'Right Lower Leg'
  },
  {
    id: 'IF461',
    name: 'Record IF-461',
    unit: 'Residential Unit C (Health & Safety)',
    dateOfBirth: '2009-07-14',
    primaryCaregiver: 'Sarah Mitchell, Reviewer',
    lastCheckDate: '2026-09-11 14:00',
    activeStatus: 'active',
    defaultRegion: 'Right Shoulder'
  },
  {
    id: 'IF468',
    name: 'Record IF-468',
    unit: 'Transitional Care Unit 2',
    dateOfBirth: '2010-02-18',
    primaryCaregiver: 'Senior Practitioner O. Bailey',
    lastCheckDate: '2026-09-13 10:30',
    activeStatus: 'active',
    defaultRegion: 'Left Upper Arm'
  },
  {
    id: 'IF472',
    name: 'Record IF-472',
    unit: 'Residential Unit A (Intake Assessment)',
    dateOfBirth: '2008-09-05',
    primaryCaregiver: 'Case Worker J. Patel',
    lastCheckDate: '2026-09-09 09:15',
    activeStatus: 'active',
    defaultRegion: 'Lower Back'
  },
  {
    id: 'IF477',
    name: 'Record IF-477',
    unit: 'Care Support Wing',
    dateOfBirth: '2009-11-22',
    primaryCaregiver: 'Case Officer Miller',
    lastCheckDate: '2026-09-15 11:45',
    activeStatus: 'active',
    defaultRegion: 'Right Knee'
  }
];

// Seeded Initial Checks with comprehensive audit trail
export const INITIAL_BODY_CHECKS: BodyCheckRecord[] = [
  // 1. Confirmed: IF455
  {
    id: 'BC-2026-0889',
    patientRecordId: 'IF455',
    patientName: 'Record IF-455',
    referenceImage: DEMO_ASSETS.if455.reference,
    referenceImageId: 'IF455',
    referenceDate: '2026-09-10 11:00',
    newImage: DEMO_ASSETS.if455.review,
    newImageId: 'IF455-REV-04',
    newImageDate: '2026-09-21 10:45',
    bodyRegion: 'Right Forearm',
    changeType: 'Tissue / Skin Appearance Difference',
    finding: 'Linear surface erythema / abrasion-like marking',
    confidence: 'High',
    confidenceScore: 0.89,
    candidateFinding: {
      bodyRegion: 'Right Forearm',
      changeType: 'Tissue / Skin Appearance Difference',
      finding: 'Linear surface erythema / abrasion-like marking',
      confidence: 'High',
      confidenceScore: 0.89,
      changeCoordinates: {
        xPercent: 54.0,
        yPercent: 55.0,
        radiusPercent: 12
      }
    },
    aiObservation: 'Reviewing the new picture against reference image IF455, superficial linear erythema is noted across the distal volar aspect of the right forearm without visible swelling.',
    finalObservation: 'Reviewing the new picture against reference image IF455, superficial linear erythema is noted across the distal volar aspect of the right forearm without visible swelling. Skin is unbroken.',
    status: 'confirmed',
    reviewer: 'Sarah Mitchell',
    reviewerRole: 'Reviewer',
    confirmedAt: '2026-09-21 11:05',
    reviewerNotes: 'Surface cleansed. Routine reassessment scheduled for morning rounds.',
    changeCoordinates: {
      xPercent: 54.0,
      yPercent: 55.0,
      radiusPercent: 12
    },
    auditTrail: [
      {
        id: 'aud-889-4',
        timestamp: '2026-09-21 11:05',
        actor: 'Sarah Mitchell',
        actorRole: 'Reviewer',
        action: 'Observation confirmed',
        details: 'Observation confirmed with note: "Surface cleansed. Routine reassessment scheduled for morning rounds."'
      },
      {
        id: 'aud-889-3',
        timestamp: '2026-09-21 10:55',
        actor: 'System',
        actorRole: 'Comparative Analysis',
        action: 'Comparative analysis completed',
        details: 'Candidate finding identified: Linear surface erythema / abrasion-like marking (High confidence).'
      },
      {
        id: 'aud-889-2',
        timestamp: '2026-09-21 10:45',
        actor: 'Sarah Mitchell',
        actorRole: 'Reviewer',
        action: 'Review check initiated',
        details: 'New review image IF455-REV-04 registered for Right Forearm.'
      },
      {
        id: 'aud-889-1',
        timestamp: '2026-09-10 11:00',
        actor: 'System',
        actorRole: 'Baseline Intake',
        action: 'Baseline image registered',
        details: 'Reference image IF455 established.'
      }
    ]
  },

  // 2. Confirmed: IF461 (Right Shoulder)
  {
    id: 'BC-2026-0895',
    patientRecordId: 'IF461',
    patientName: 'Record IF-461',
    referenceImage: DEMO_ASSETS.if461.reference,
    referenceImageId: 'IF461',
    referenceDate: '2026-09-11 14:00',
    newImage: DEMO_ASSETS.if461.review,
    newImageId: 'IF461-REV-02',
    newImageDate: '2026-09-21 11:20',
    bodyRegion: 'Right Shoulder',
    changeType: 'Color / Skin Appearance Change',
    finding: 'Localized reddish discoloration / contusion-like mark',
    confidence: 'Moderate',
    confidenceScore: 0.81,
    candidateFinding: {
      bodyRegion: 'Right Shoulder',
      changeType: 'Color / Skin Appearance Change',
      finding: 'Localized reddish discoloration / contusion-like mark',
      confidence: 'Moderate',
      confidenceScore: 0.81,
      changeCoordinates: {
        xPercent: 52.0,
        yPercent: 46.0,
        radiusPercent: 12
      }
    },
    aiObservation: 'Reviewing the new picture against reference image IF461, there is a localized reddish discoloration across the lateral aspect of the right shoulder consistent with a minor contusion-like appearance. Surrounding skin remains intact without open breach.',
    finalObservation: 'Reviewing the new picture against reference image IF461, localized reddish discoloration is present on the lateral right shoulder deltoid. Consistent with minor surface contusion. No edema.',
    status: 'confirmed',
    reviewer: 'Sarah Mitchell',
    reviewerRole: 'Reviewer',
    confirmedAt: '2026-09-21 11:40',
    reviewerNotes: 'Documented in daily log. Monitoring comfort.',
    changeCoordinates: {
      xPercent: 52.0,
      yPercent: 46.0,
      radiusPercent: 12
    },
    auditTrail: [
      {
        id: 'aud-895-4',
        timestamp: '2026-09-21 11:40',
        actor: 'Sarah Mitchell',
        actorRole: 'Reviewer',
        action: 'Observation confirmed',
        details: 'Observation confirmed with note: "Documented in daily log. Monitoring comfort."'
      },
      {
        id: 'aud-895-3',
        timestamp: '2026-09-21 11:28',
        actor: 'System',
        actorRole: 'Comparative Analysis',
        action: 'Comparative analysis completed',
        details: 'Candidate finding identified: Localized reddish discoloration / contusion-like mark (Moderate confidence).'
      },
      {
        id: 'aud-895-2',
        timestamp: '2026-09-21 11:20',
        actor: 'Sarah Mitchell',
        actorRole: 'Reviewer',
        action: 'Review check initiated',
        details: 'New review image IF461-REV-02 registered for Right Shoulder.'
      },
      {
        id: 'aud-895-1',
        timestamp: '2026-09-11 14:00',
        actor: 'System',
        actorRole: 'Baseline Intake',
        action: 'Baseline image registered',
        details: 'Reference image IF461 established.'
      }
    ]
  },

  // 3. Confirmed Routine Check: IF452 (Upper Back, No change)
  {
    id: 'BC-2026-0872',
    patientRecordId: 'IF452',
    patientName: 'Record IF-452',
    referenceImage: DEMO_ASSETS.if452.reference,
    referenceImageId: 'IF452',
    referenceDate: '2026-09-08 16:20',
    newImage: DEMO_ASSETS.if452.review,
    newImageId: 'IF452-REV-01',
    newImageDate: '2026-09-21 15:00',
    bodyRegion: 'Upper Back',
    changeType: 'No Significant Visible Change',
    finding: 'No significant visible change identified',
    confidence: 'High',
    confidenceScore: 0.94,
    candidateFinding: {
      bodyRegion: 'Upper Back',
      changeType: 'No Significant Visible Change',
      finding: 'No significant visible change identified',
      confidence: 'High',
      confidenceScore: 0.94
    },
    aiObservation: 'Reviewing the new picture against reference image IF452, no significant visible change or new focal discoloration identified across the upper thoracic dorsal region.',
    finalObservation: 'Reviewing the new picture against reference image IF452, no significant visible change or new focal discoloration identified across the upper thoracic dorsal region. Normal presentation.',
    status: 'confirmed',
    reviewer: 'Dr. Marcus Vance',
    reviewerRole: 'Consulting Physician',
    confirmedAt: '2026-09-21 15:30',
    reviewerNotes: 'Routine weekly check complete. Skin clear.',
    auditTrail: [
      {
        id: 'aud-872-4',
        timestamp: '2026-09-21 15:30',
        actor: 'Dr. Marcus Vance',
        actorRole: 'Consulting Physician',
        action: 'Observation confirmed',
        details: 'Observation confirmed with note: "Routine weekly check complete. Skin clear."'
      },
      {
        id: 'aud-872-3',
        timestamp: '2026-09-21 15:10',
        actor: 'System',
        actorRole: 'Comparative Analysis',
        action: 'Comparative analysis completed',
        details: 'Candidate finding identified: No significant visible change identified (High confidence).'
      },
      {
        id: 'aud-872-2',
        timestamp: '2026-09-21 15:00',
        actor: 'Case Worker D. Chen',
        actorRole: 'Reviewer',
        action: 'Review check initiated',
        details: 'New review image IF452-REV-01 registered for Upper Back.'
      },
      {
        id: 'aud-872-1',
        timestamp: '2026-09-08 16:20',
        actor: 'System',
        actorRole: 'Baseline Intake',
        action: 'Baseline image registered',
        details: 'Reference image IF452 established.'
      }
    ]
  },

  // 4. Confirmed Routine Check: IF472 (Lower Back, No change)
  {
    id: 'BC-2026-0851',
    patientRecordId: 'IF472',
    patientName: 'Record IF-472',
    referenceImage: DEMO_ASSETS.if472.reference,
    referenceImageId: 'IF472',
    referenceDate: '2026-09-09 09:15',
    newImage: DEMO_ASSETS.if472.review,
    newImageId: 'IF472-REV-02',
    newImageDate: '2026-09-21 13:30',
    bodyRegion: 'Lower Back',
    changeType: 'No Significant Visible Change',
    finding: 'No significant visible change identified',
    confidence: 'High',
    confidenceScore: 0.95,
    candidateFinding: {
      bodyRegion: 'Lower Back',
      changeType: 'No Significant Visible Change',
      finding: 'No significant visible change identified',
      confidence: 'High',
      confidenceScore: 0.95
    },
    aiObservation: 'Reviewing the new picture against reference image IF472, no significant visible change or new discoloration identified across the lower lumbar and dorsal region. Cutaneous presentation appears stable.',
    finalObservation: 'Reviewing the new picture against reference image IF472, no significant visible change or new discoloration identified across the lower lumbar and dorsal region. Cutaneous presentation appears stable.',
    status: 'confirmed',
    reviewer: 'Nurse E. Davies',
    reviewerRole: 'Registered Nurse',
    confirmedAt: '2026-09-21 14:00',
    reviewerNotes: 'Routine intake re-examination. All dorsal regions intact.',
    auditTrail: [
      {
        id: 'aud-851-4',
        timestamp: '2026-09-21 14:00',
        actor: 'Nurse E. Davies',
        actorRole: 'Registered Nurse',
        action: 'Observation confirmed',
        details: 'Observation confirmed with note: "Routine intake re-examination. All dorsal regions intact."'
      },
      {
        id: 'aud-851-3',
        timestamp: '2026-09-21 13:40',
        actor: 'System',
        actorRole: 'Comparative Analysis',
        action: 'Comparative analysis completed',
        details: 'Candidate finding identified: No significant visible change identified (High confidence).'
      },
      {
        id: 'aud-851-2',
        timestamp: '2026-09-21 13:30',
        actor: 'Case Worker J. Patel',
        actorRole: 'Reviewer',
        action: 'Review check initiated',
        details: 'New review image IF472-REV-02 registered for Lower Back.'
      },
      {
        id: 'aud-851-1',
        timestamp: '2026-09-09 09:15',
        actor: 'System',
        actorRole: 'Baseline Intake',
        action: 'Baseline image registered',
        details: 'Reference image IF472 established.'
      }
    ]
  },

  // 5. AI Draft Ready: IF468 (Left Upper Arm)
  {
    id: 'BC-2026-0898',
    patientRecordId: 'IF468',
    patientName: 'Record IF-468',
    referenceImage: DEMO_ASSETS.if468.reference,
    referenceImageId: 'IF468',
    referenceDate: '2026-09-13 10:30',
    newImage: DEMO_ASSETS.if468.review,
    newImageId: 'IF468-REV-01',
    newImageDate: '2026-09-21 15:45',
    bodyRegion: 'Left Upper Arm',
    changeType: 'Visible Bruising-like Appearance',
    finding: 'Faint localized mottled discoloration',
    confidence: 'Moderate',
    confidenceScore: 0.74,
    candidateFinding: {
      bodyRegion: 'Left Upper Arm',
      changeType: 'Visible Bruising-like Appearance',
      finding: 'Faint localized mottled discoloration',
      confidence: 'Moderate',
      confidenceScore: 0.74,
      changeCoordinates: {
        xPercent: 49.0,
        yPercent: 50.0,
        radiusPercent: 11
      }
    },
    aiObservation: 'Reviewing the new picture against reference image IF468, faint localized mottled discoloration is noted on the lateral left upper arm that was not visible on baseline capture. Skin surface remains intact without edema.',
    finalObservation: 'Reviewing the new picture against reference image IF468, faint localized mottled discoloration is noted on the lateral left upper arm that was not visible on baseline capture. Skin surface remains intact without edema.',
    status: 'ai_draft_ready',
    changeCoordinates: {
      xPercent: 49.0,
      yPercent: 50.0,
      radiusPercent: 11
    },
    auditTrail: [
      {
        id: 'aud-898-3',
        timestamp: '2026-09-21 15:50',
        actor: 'System',
        actorRole: 'Comparative Analysis',
        action: 'Comparative analysis completed',
        details: 'Candidate finding identified: Faint localized mottled discoloration (Moderate confidence).'
      },
      {
        id: 'aud-898-2',
        timestamp: '2026-09-21 15:45',
        actor: 'Senior Practitioner O. Bailey',
        actorRole: 'Reviewer',
        action: 'Review check initiated',
        details: 'New review image IF468-REV-01 registered for Left Upper Arm.'
      },
      {
        id: 'aud-898-1',
        timestamp: '2026-09-13 10:30',
        actor: 'System',
        actorRole: 'Baseline Intake',
        action: 'Baseline image registered',
        details: 'Reference image IF468 established.'
      }
    ]
  },

  // 6. AI Draft Ready: IF439 (Right Lower Leg)
  {
    id: 'BC-2026-0864',
    patientRecordId: 'IF439',
    patientName: 'Record IF-439',
    referenceImage: DEMO_ASSETS.if439.reference,
    referenceImageId: 'IF439',
    referenceDate: '2026-09-12 13:10',
    newImage: DEMO_ASSETS.if439.review,
    newImageId: 'IF439-REV-03',
    newImageDate: '2026-09-20 16:30',
    bodyRegion: 'Right Lower Leg',
    changeType: 'Visible Bruising-like Appearance',
    finding: 'Faint mottled discoloration / possible minor contusion',
    confidence: 'Moderate',
    confidenceScore: 0.72,
    candidateFinding: {
      bodyRegion: 'Right Lower Leg',
      changeType: 'Visible Bruising-like Appearance',
      finding: 'Faint mottled discoloration / possible minor contusion',
      confidence: 'Moderate',
      confidenceScore: 0.72,
      changeCoordinates: {
        xPercent: 56.0,
        yPercent: 53.0,
        radiusPercent: 11
      }
    },
    aiObservation: 'Reviewing the new picture against reference image IF439, faint mottled discoloration observed near the superior-lateral border of the right knee.',
    finalObservation: 'Reviewing the new picture against reference image IF439, faint mottled discoloration observed near the superior-lateral border of the right knee.',
    status: 'ai_draft_ready',
    changeCoordinates: {
      xPercent: 56.0,
      yPercent: 53.0,
      radiusPercent: 11
    },
    auditTrail: [
      {
        id: 'aud-864-3',
        timestamp: '2026-09-20 16:40',
        actor: 'System',
        actorRole: 'Comparative Analysis',
        action: 'Comparative analysis completed',
        details: 'Candidate finding identified: Faint mottled discoloration / possible minor contusion (Moderate confidence).'
      },
      {
        id: 'aud-864-2',
        timestamp: '2026-09-20 16:30',
        actor: 'Care Worker T. Harris',
        actorRole: 'Reviewer',
        action: 'Review check initiated',
        details: 'New review image IF439-REV-03 registered for Right Lower Leg.'
      },
      {
        id: 'aud-864-1',
        timestamp: '2026-09-12 13:10',
        actor: 'System',
        actorRole: 'Baseline Intake',
        action: 'Baseline image registered',
        details: 'Reference image IF439 established.'
      }
    ]
  },

  // 7. Ready for Review: IF477 (Right Knee)
  {
    id: 'BC-2026-0847',
    patientRecordId: 'IF477',
    patientName: 'Record IF-477',
    referenceImage: DEMO_ASSETS.if477.reference,
    referenceImageId: 'IF477',
    referenceDate: '2026-09-15 11:45',
    newImage: DEMO_ASSETS.if477.review,
    newImageId: 'IF477-REV-01',
    newImageDate: '2026-09-21 16:15',
    bodyRegion: 'Right Knee',
    changeType: 'No Significant Visible Change',
    finding: 'No significant visible change identified',
    confidence: 'High',
    confidenceScore: 0.92,
    candidateFinding: {
      bodyRegion: 'Right Knee',
      changeType: 'No Significant Visible Change',
      finding: 'No significant visible change identified',
      confidence: 'High',
      confidenceScore: 0.92
    },
    aiObservation: 'Reviewing the new picture against reference image IF477, no significant visible change identified across the right anterior patellar region. Joint contour and cutaneous surface remain consistent with baseline.',
    finalObservation: 'Reviewing the new picture against reference image IF477, no significant visible change identified across the right anterior patellar region. Joint contour and cutaneous surface remain consistent with baseline.',
    status: 'ready_for_review',
    auditTrail: [
      {
        id: 'aud-847-2',
        timestamp: '2026-09-21 16:15',
        actor: 'Case Officer Miller',
        actorRole: 'Reviewer',
        action: 'Review check initiated',
        details: 'New review image IF477-REV-01 registered for Right Knee.'
      },
      {
        id: 'aud-847-1',
        timestamp: '2026-09-15 11:45',
        actor: 'System',
        actorRole: 'Baseline Intake',
        action: 'Baseline image registered',
        details: 'Reference image IF477 established.'
      }
    ]
  }
];
