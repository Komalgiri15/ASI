import img1 from "@/assets/ASI Practice 1.png";
import img2 from "@/assets/ASI Practice 2.png";
import img3 from "@/assets/ASI Practice 3.png";

export type CaseStepMechanic =
  | "command-builder"
  | "spot-tag"
  | "hotspot-tally"
  | "field-detective"
  | "match-code"
  | "decision-swipe"
  | "tally-tap"
  | "hotspot-tap"
  | "multi-select"
  | "map-pin"
  | "sequence-builder";

export type CaseStep = {
  id: string;
  qNum: string;
  imageUrl?: string;
  prompt: string;
  mechanic: CaseStepMechanic;
  scoutIntro: string;
  scoutHint: string;
  correctAnswer: any;
  data: any; // step-specific data
};

export type CaseDef = {
  id: string;
  number: number;
  name: string;
  caseName: string;
  description: string;
  badge: string;
  xpValue: number;
  outcomes: string[];
  steps: CaseStep[];
};

export const CASES: CaseDef[] = [
  {
    id: "case-1",
    number: 1,
    name: "The Texas Trail",
    caseName: "Markus Jones Search",
    description: "Locate Markus Jones in Texas, check his group configuration, and identify his correct member file.",
    badge: "Search Specialist",
    xpValue: 120,
    outcomes: [
      "Assemble TN3270 ASI command syntax",
      "Scan screen content for 'END OF DATA' and verify page counts",
      "Filter groups and locate specific member attributes (M-GRP, DOB)",
      "Map relationship codes and resolve member card discrepancies",
    ],
    steps: [
      {
        id: "c1-s1",
        qNum: "Q1",
        prompt: "A claim has arrived for Markus Jones in Texas. Read the search control line at the top of the image and drag the tiles to build it.",
        imageUrl: img1,
        mechanic: "command-builder",
        scoutIntro: "Welcome, Search Specialist! Read the control line at the top of the screen and drag the tiles in that exact order.",
        scoutHint: "Look at the top left of the mainframe screen. Drag the tiles: ASI, JONES, MARKUS, TX.",
        correctAnswer: ["ASI", "JONES", "MARKUS", "TX"],
        data: {
          slots: ["Command", "Last Name", "First Name", "State"],
          tiles: ["JONES", "ASI", "TX", "MARKUS", "CLAIM", "56", "SELECT"],
        },
      },
      {
        id: "c1-s2",
        qNum: "Q2",
        prompt: "Confirm the page count. Tap directly on the 'END OF DATA' text where it already appears on the image, then confirm the page count.",
        imageUrl: img1,
        mechanic: "spot-tag",
        scoutIntro: "Search complete! Let's check how long the results list is. Tap the 'END OF DATA' line directly on the image, then confirm the page count.",
        scoutHint: "Look at the top left of the mainframe image under the search query. Tap 'END OF DATA.' then click Submit.",
        correctAnswer: { tagTapped: true, pageCount: 1 },
        data: {
          totalPages: 1,
          mainframeLines: [
            "ASI QUERY RESULTS - CLIENT SEARCH",
            "PAGE 1 OF 1",
            "---------------------------------------",
            "*** END OF DATA ***",
          ],
        },
      },
      {
        id: "c1-s3",
        qNum: "Q3",
        prompt: "Spot client 56. Visually scan the D-GRP column on the image and tap the row where it reads 56.",
        imageUrl: img1,
        mechanic: "hotspot-tally",
        scoutIntro: "Audit time! Scan the D-GRP column on the real image. Tap the row that shows '56' to highlight it.",
        scoutHint: "Look at Row 1 (first row). Its D-GRP value (below the names) is 56. Tap anywhere on Row 1.",
        correctAnswer: 0, // Row 1 (index 0)
        data: {
          headers: ["ROW", "CLIENT", "NAME", "D-GRP", "M-GRP", "REL"],
          rows: [
            { rowNum: "01", client: "56", name: "JONES, MARKUS", dgrp: "56", mgrp: "0E2045", rel: "EE" },
          ],
        },
      },
      {
        id: "c1-s4",
        qNum: "Q4",
        prompt: "Pull the group number. Tap the client-58 row (Row 2) on the image to zoom into it, then drag the correct M-GRP value from the tiles.",
        imageUrl: img1,
        mechanic: "field-detective",
        scoutIntro: "Let's investigate Client 58's medical plan. Tap Row 2 on the image to zoom in, then drag the correct M-GRP value tile.",
        scoutHint: "Row 2 (Client 58) has M-GRP = 0N2312. Drag the '0N2312' tile into the slot.",
        correctAnswer: "0N2312",
        data: {
          targetRowIndex: 1, // row 02
          targetColKey: "mgrp",
          zoomLabel: "M-GRP for Client 58",
          tiles: ["0E2045", "0N2312", "0N2311", "0E2046"],
        },
      },
      {
        id: "c1-s5",
        qNum: "Q5",
        prompt: "Pull the DOB. Tap the client-56 row (Row 1) on the image to zoom into it, then drag the correct DOB value from the tiles.",
        imageUrl: img1,
        mechanic: "field-detective",
        scoutIntro: "We need the DOB for Client 56 to verify their age. Tap Row 1 on the image to zoom, then drag the correct DOB tile.",
        scoutHint: "Look at Row 1 (Client 56) in the image. The DOB is 12/30/96. Drag the '12/30/96' tile.",
        correctAnswer: "12/30/96",
        data: {
          targetRowIndex: 0, // row 01
          targetColKey: "dob",
          zoomLabel: "DOB for Client 56",
          tiles: ["12/30/96", "03/16/95", "12/30/95", "03/16/96"],
        },
      },
      {
        id: "c1-s6",
        qNum: "Q6",
        prompt: "Match the relationship code. Scan the RL column for 'EE', then drag the 'EE' key chip onto Row 1 to decrypt and zoom its address.",
        imageUrl: img1,
        mechanic: "match-code",
        scoutIntro: "Now let's check the primary cardholder. Drag the 'EE' relationship chip onto Row 1 to unlock the address clip from the image.",
        scoutHint: "Drag or tap the 'EE' chip onto Row 1 (the first row) to decrypt and zoom into the address.",
        correctAnswer: 0, // row 01
        data: {
          chipLabel: "EE",
          unlockedAddress: "1404 MARCUS PL., AUSTIN TX 78721",
        },
      },
      {
        id: "c1-s7",
        qNum: "Q7",
        prompt: "Pick the right record. Compare both DOBs visible on the image, then swipe right (approve) on the card matching DOB 12/30/96.",
        imageUrl: img1,
        mechanic: "decision-swipe",
        scoutIntro: "Almost there! Compare both DOBs on the image. Swipe RIGHT to approve the correct record (DOB 12/30/96), and swipe LEFT on the other.",
        scoutHint: "Card A has DOB 12/30/96 (Markus L Jones). Swipe Card A RIGHT (Approve) and Card B LEFT (Reject).",
        correctAnswer: "card-a",
        data: {
          cards: [
            {
              id: "card-a",
              title: "Record A - Match Candidate",
              name: "JONES, MARKUS L",
              dob: "12/30/96",
              umid: "999 97 4520",
              address: "1404 MARCUS PL., AUSTIN TX 78721",
            },
            {
              id: "card-b",
              title: "Record B - Match Candidate",
              name: "JONES, MARKUS S",
              dob: "03/16/95",
              umid: "437 17 6084",
              address: "2715 DEER CREEK, ARLINGTON TX 760100702",
            },
          ],
        },
      },
    ],
  },
  {
    id: "case-2",
    number: 2,
    name: "Kentucky Keys",
    caseName: "Kentucky Record Discernment",
    description: "Search Kentucky member databases and audit suffixes and locations to locate a key regional claim.",
    badge: "Record Detective",
    xpValue: 150,
    outcomes: [
      "Discern multiple record details under Kentucky regional codes",
      "Pinpoint and verify Unique Member IDs (UMID)",
      "Audit record suffixes (S) and identify blanks",
      "Match regional geographical data to specific record cards",
    ],
    steps: [
      {
        id: "c2-s1",
        qNum: "Q8",
        imageUrl: img2,
        prompt: "Tally the records. Count the 3 visible records on the image and tap each row as you count, then tap 'END OF DATA' to confirm.",
        mechanic: "tally-tap",
        scoutIntro: "Welcome to Kentucky! We have retrieved Markus Jones's regional records. Tap each of the 3 rows on the image to count them, then tap the 'END OF DATA.' text to confirm your tally.",
        scoutHint: "Tap all three member rows on the mainframe image (Row 1, Row 2, Row 3). When the count is 3/3, tap 'END OF DATA.' at the top left.",
        correctAnswer: 3,
        data: {
          targetTally: 3,
        },
      },
      {
        id: "c2-s2",
        qNum: "Q9",
        imageUrl: img2,
        prompt: "Find the UMID. Scan all 3 records for a UMID field on the image and tap the UMID where it appears.",
        mechanic: "hotspot-tap",
        scoutIntro: "One of the records contains a Unique Member ID (UMID) starting with 'H'. Locate the record containing it and tap on the UMID value directly on the image.",
        scoutHint: "Look at the 3rd record (Row 3, Erlanger record). Under zip code/D-GRP on its 3rd line, there is the UMID 'H43303654'. Tap it.",
        correctAnswer: "ky-3-umid",
        data: {},
      },
      {
        id: "c2-s3",
        qNum: "Q10",
        imageUrl: img2,
        prompt: "Spot suffix 1. Scan the S (Suffix) column across the 3 rows on the image and tap the one showing '1'.",
        mechanic: "hotspot-tap",
        scoutIntro: "Let's check the suffixes. Find the suffix column 'S' and tap the row value that shows a suffix '1' on the image.",
        scoutHint: "Look under the 'S' column header on Row 1. Tap the '1' showing right next to relationship 'CH'.",
        correctAnswer: "ky-1-suffix",
        data: {},
      },
      {
        id: "c2-s4",
        qNum: "Q11",
        imageUrl: img2,
        prompt: "Count blank suffixes. Tap every row on the image where the S column is empty (blank suffix), then click 'Confirm Suffix Count'.",
        mechanic: "multi-select",
        scoutIntro: "Now let's find the primary records that do NOT have a suffix. Tap all rows on the image where the suffix column 'S' is empty.",
        scoutHint: "Row 2 (Winchester) and Row 3 (Erlanger) have empty suffix columns. Tap both on the image, then click 'Confirm Suffix Count'.",
        correctAnswer: ["ky-2-suffix-blank", "ky-3-suffix-blank"],
        data: {},
      },
      {
        id: "c2-s5",
        qNum: "Q12",
        imageUrl: img2,
        prompt: "Locate Erlanger. Read the 3 addresses on the image and drag the map-pin onto the one that says Erlanger, KY.",
        mechanic: "map-pin",
        scoutIntro: "A local claim has surfaced in Erlanger, Kentucky. Select and drop/tap the location dispatch pin onto the address showing Erlanger, KY on the image.",
        scoutHint: "Look at Row 3. The city listed is ERLANGER. Tap the map pin below the image and drop/tap it on Row 3's address.",
        correctAnswer: "ky-3",
        data: {},
      },
    ],
  },
  {
    id: "case-3",
    number: 3,
    name: "The MRI Mission",
    caseName: "MR Screen Navigation",
    description: "Re-confirm the Erlanger record, then navigate to the Member Referral screen by ordering the correct steps and tapping the SELECT field.",
    badge: "MRI Master",
    xpValue: 180,
    outcomes: [
      "Re-identify the tracked Erlanger record (UMID H43303654)",
      "Order the two navigation steps correctly",
      "Read SELECT = 'MR' directly off the mainframe image",
      "Tap the SELECT field on Image 3 to confirm navigation",
    ],
    steps: [
      {
        id: "c3-s1",
        qNum: "Q13",
        imageUrl: img3,
        prompt: "Reach the MRI screen. First re-confirm the Erlanger record on Image 2, then order the navigation steps and tap the SELECT field on Image 3.",
        mechanic: "mri-mission" as any,
        scoutIntro: "Final mission! We tracked Markus Jones to Erlanger, KY. Let's re-confirm that record, then navigate to the MR screen.",
        scoutHint: "Phase 1: Tap the Erlanger row on Image 2. Phase 2: Drag 'CAS Client' to Step 1 and 'MR Selection' to Step 2. Phase 3: Tap the SELECT field on Image 3 that reads 'MR'.",
        correctAnswer: {
          confirmRowId: "ky-3",
          sequence: ["cas-client", "select-mr"],
          selectField: "MR",
        },
        data: {
          img2: img2,
          img3: img3,
          sequenceSteps: [
            { id: "cas-client",   text: "Go to the appropriate CAS client" },
            { id: "select-mr",    text: "Do the MR selection" },
            { id: "view-claims",  text: "Review open claims list" },
          ],
        },
      },
    ],
  },
];

