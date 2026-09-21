/**
 * Developer documentation & attribution record for open-source photographic assets.
 * All images are bundled locally in public/images/demo/ for offline reliability and Vercel compatibility.
 * Sourced from Wikimedia Commons and open-source Creative Commons / Public Domain photography.
 * Subject representations are strictly anonymous, non-identifiable, non-graphic, and used for clinical workflow documentation.
 */

export interface ImageAssetAttribution {
  scenarioId: string;
  bodyRegion: string;
  referenceFile: string;
  reviewFile: string;
  sourceOrigin: string;
  sourceUrl?: string;
  license: string;
  attribution: string;
  notes: string;
}

export const DEMO_IMAGE_ATTRIBUTIONS: ImageAssetAttribution[] = [
  {
    scenarioId: 'IF456',
    bodyRegion: 'Left Shoulder',
    referenceFile: 'if456-shoulder-ref.jpg',
    reviewFile: 'if456-shoulder-review.jpg',
    sourceOrigin: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Left_shoulder.jpg',
    license: 'Creative Commons Attribution-Share Alike 4.0 International (CC BY-SA 4.0)',
    attribution: 'Left shoulder / Alexander / Wikimedia Commons',
    notes: 'Open-source photographic baseline of left shoulder deltoid vs. review showing localized reddish discoloration.'
  },
  {
    scenarioId: 'IF455',
    bodyRegion: 'Right Forearm',
    referenceFile: 'if455-forearm-ref.jpg',
    reviewFile: 'if455-forearm-review.jpg',
    sourceOrigin: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Blood_testing_bruise_on_arm_1.jpg',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    attribution: 'Blood testing bruise on arm 1 / W.carter / Wikimedia Commons',
    notes: 'Volar forearm inspection showing authentic superficial linear surface erythema.'
  },
  {
    scenarioId: 'IF452',
    bodyRegion: 'Back',
    referenceFile: 'if452-back-ref.jpg',
    reviewFile: 'if452-back-review.jpg',
    sourceOrigin: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Skin_tanning.JPG',
    license: 'Creative Commons Attribution-Share Alike 3.0 Unported (CC BY-SA 3.0)',
    attribution: 'Skin tanning / Wikimedia Commons',
    notes: 'Upper thoracic dorsal documentation demonstrating unremarkable follow-up (no significant visible change).'
  },
  {
    scenarioId: 'IF439',
    bodyRegion: 'Right Lower Leg',
    referenceFile: 'if439-knee-ref.jpg',
    reviewFile: 'if439-knee-review.jpg',
    sourceOrigin: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bruise_on_the_calf_1.jpg',
    license: 'Creative Commons Zero (CC0) 1.0 Universal Public Domain Dedication',
    attribution: 'Bruise on the calf 1 / Wikimedia Commons',
    notes: 'Calf and lower leg documentation showing authentic mottled surface discoloration.'
  },
  {
    scenarioId: 'IF461',
    bodyRegion: 'Right Shoulder',
    referenceFile: 'if461-rshoulder-ref.jpg',
    reviewFile: 'if461-rshoulder-review.jpg',
    sourceOrigin: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Detailed_view_of_male_right_shoulder,_photographed_when_arm_stretched_out_to_side.jpg',
    license: 'Creative Commons Attribution-Share Alike 4.0 International (CC BY-SA 4.0)',
    attribution: 'Detailed view of male right shoulder / Wikimedia Commons',
    notes: 'Cropped right acromial/deltoid aspect: baseline intact skin vs. localized minor contusion-like reddish discoloration.'
  },
  {
    scenarioId: 'IF468',
    bodyRegion: 'Left Upper Arm',
    referenceFile: 'if468-lupperarm-ref.jpg',
    reviewFile: 'if468-lupperarm-review.jpg',
    sourceOrigin: 'Wikimedia Commons / Flickr',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Upper_Arm_Bruise.jpg',
    license: 'Creative Commons Attribution-Share Alike 3.0 Unported (CC BY-SA 3.0)',
    attribution: 'Upper Arm Bruise / Whoisjohngalt / Wikimedia Commons',
    notes: 'Cropped upper arm / bicep region showing authentic mottled skin appearance difference.'
  },
  {
    scenarioId: 'IF472',
    bodyRegion: 'Lower Back',
    referenceFile: 'if472-lowerback-ref.jpg',
    reviewFile: 'if472-lowerback-review.jpg',
    sourceOrigin: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Skin_tanning.JPG',
    license: 'Creative Commons Attribution-Share Alike 3.0 Unported (CC BY-SA 3.0)',
    attribution: 'Skin tanning / Wikimedia Commons',
    notes: 'Lower lumbar dorsal baseline vs. routine follow-up: unremarkable, no significant visible change.'
  },
  {
    scenarioId: 'IF477',
    bodyRegion: 'Right Knee',
    referenceFile: 'if477-rknee-ref.jpg',
    reviewFile: 'if477-rknee-review.jpg',
    sourceOrigin: 'Wikimedia Commons / Flickr',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Darker_skin_legs_(51482132939).jpg',
    license: 'Creative Commons Attribution 2.0 Generic (CC BY 2.0)',
    attribution: 'Darker skin legs / Wikimedia Commons',
    notes: 'Anterior patellar joint documentation: baseline vs. follow-up exhibiting consistent intact surface (no significant visible change).'
  }
];
