export type DataField = {
  key: string;
  label: string;
  value: string;
  icon: string; // lucide icon name
};

export type ClaimCardData = {
  title: string;
  subtitle: string;
  patientName: string;
  claimType: string;
  fields: DataField[];
};

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type LevelDef = {
  id: string;
  number: number;
  name: string;
  caseName: string;
  outcomes: string[];
  images: ClaimCardData[];
  questions: Question[];
};

// Helper: shuffle but keep correctIndex tracking
function makeQ(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[]
): Question {
  const opts = [correct, ...distractors];
  // deterministic shuffle by id hash so it's stable
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = [...opts]
    .map((o, i) => ({ o, k: (seed * 9301 + i * 49297) % 233280 }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.o);
  return {
    id,
    prompt,
    options: shuffled,
    correctIndex: shuffled.indexOf(correct),
  };
}

export const LEVELS: LevelDef[] = [
  {
    id: "lvl-1",
    number: 1,
    name: "Professional Claim — Case 1",
    caseName: "GRIEGO, DAVID L",
    outcomes: [
      "Identify CMS vs UB claim from Place of Service",
      "Locate key claim header data (UMID, dates, charges)",
      "Read billing & rendering provider blocks",
    ],
    images: [
      {
        title: "eHUB Transaction Viewer",
        subtitle: "Professional Claim Summary",
        patientName: "GRIEGO, DAVID L",
        claimType: "CMS — Professional",
        fields: [
          { key: "dob", label: "Date of Birth", value: "08/22/1959", icon: "Calendar" },
          { key: "umid", label: "Member UMID", value: "H67409890", icon: "IdCard" },
          { key: "rcv", label: "Received Date", value: "01/29/2025", icon: "Inbox" },
          { key: "dos", label: "Date of Service", value: "01/16/2025", icon: "CalendarDays" },
          { key: "pos", label: "Place of Service", value: "24 — Ambulatory Surgical Center", icon: "Building2" },
          { key: "lines", label: "Service Lines", value: "1 Line", icon: "ListOrdered" },
          { key: "charge", label: "Total Charge", value: "$1,746.00", icon: "DollarSign" },
          { key: "dx", label: "Diagnosis Code", value: "H02135", icon: "Stethoscope" },
        ],
      },
      {
        title: "837 — Provider Information",
        subtitle: "Professional",
        patientName: "GRIEGO, DAVID L",
        claimType: "Provider Block",
        fields: [
          { key: "billing", label: "Billing Provider", value: "PARK AVE OCULOPLASTIC SURGEONS PAOS", icon: "Hospital" },
          { key: "rendering", label: "Rendering Provider", value: "Yash, Vaishnav", icon: "UserRound" },
          { key: "tax", label: "Tax ID (TIN)", value: "201418623", icon: "Hash" },
          { key: "addr", label: "Billing Address", value: "1800 Emerson Street, Suite 200, Denver, CO 802181080", icon: "MapPin" },
          { key: "npi", label: "NPI", value: "1700XXXXXX", icon: "ShieldCheck" },
          { key: "taxonomy", label: "Taxonomy", value: "207W00000X — Ophthalmology", icon: "Briefcase" },
        ],
      },
    ],
    questions: [
      makeQ("l1q1", "Is this a CMS or UB hospital claim?", "CMS claim (Place of Service 24)", [
        "UB hospital claim (inpatient)",
        "UB hospital claim (outpatient)",
        "Dental claim",
      ]),
      makeQ("l1q2", "When did Humana receive the claim?", "01/29/2025", [
        "01/16/2025",
        "01/27/2025",
        "02/01/2025",
      ]),
      makeQ("l1q3", "What are the Dates of Service?", "01/16/2025", [
        "01/29/2025",
        "01/13/2025",
        "08/22/1959",
      ]),
      makeQ("l1q4", "What is the Member's ID / UMID?", "H67409890", [
        "H04052170",
        "H67049980",
        "H67400989",
      ]),
      makeQ("l1q5", "What is the Place of Service?", "24 — Ambulatory Surgical Center", [
        "11 — Office",
        "22 — Outpatient Hospital",
        "21 — Inpatient Hospital",
      ]),
      makeQ("l1q6", "Who is the billing provider?", "PARK AVE OCULOPLASTIC SURGEONS PAOS", [
        "TIM LONG MD PSC",
        "DENVER EYE SURGEONS LLC",
        "EMERSON OPHTHALMOLOGY PC",
      ]),
      makeQ("l1q7", "Who is the rendering provider?", "Yash, Vaishnav", [
        "Timothy, Long",
        "Vaishnav, Park",
        "David, Griego",
      ]),
      makeQ("l1q8", "What is the tax ID number?", "201418623", [
        "371420890",
        "210148623",
        "204118623",
      ]),
      makeQ("l1q9", "What is the billing provider's address?", "1800 Emerson Street, Suite 200, Denver, CO 802181080", [
        "1320 Andrea St, Bowling Green, KY 421043334",
        "1800 Emerson Street, Suite 100, Denver, CO 802181080",
        "200 Park Avenue, New York, NY 100170000",
      ]),
      makeQ("l1q10", "How many services were billed?", "1 Line", [
        "2 Lines",
        "3 Lines",
        "4 Lines",
      ]),
      makeQ("l1q11", "What is the charge amount of the first line item?", "$1,746.00", [
        "$1,476.00",
        "$746.00",
        "$1,946.00",
      ]),
      makeQ("l1q12", "What is the diagnosis code?", "H02135", [
        "Z23",
        "H02315",
        "H21035",
      ]),
    ],
  },
  {
    id: "lvl-2",
    number: 2,
    name: "Professional Claim — Case 2",
    caseName: "GOAD, JAMES DAVID",
    outcomes: [
      "Recognize an office-based (POS 11) professional claim",
      "Distinguish total claim charge vs. first-line charge",
      "Map provider info to TIN and address fields",
    ],
    images: [
      {
        title: "eHUB Transaction Viewer",
        subtitle: "Professional Claim Summary",
        patientName: "GOAD, JAMES DAVID",
        claimType: "CMS — Professional",
        fields: [
          { key: "umid", label: "Member UMID", value: "H04052170", icon: "IdCard" },
          { key: "rcv", label: "Received Date", value: "01/27/2025", icon: "Inbox" },
          { key: "dos", label: "Date of Service", value: "01/13/2025", icon: "CalendarDays" },
          { key: "pos", label: "Place of Service", value: "11 — Office", icon: "Building2" },
          { key: "lines", label: "Service Lines", value: "2 Lines", icon: "ListOrdered" },
          { key: "line1", label: "Line 1 Charge", value: "$40.00", icon: "DollarSign" },
          { key: "charge", label: "Total Charge", value: "$75.00", icon: "Wallet" },
          { key: "dx", label: "Diagnosis Code", value: "Z23", icon: "Stethoscope" },
        ],
      },
      {
        title: "837 — Provider Information",
        subtitle: "Professional",
        patientName: "GOAD, JAMES DAVID",
        claimType: "Provider Block",
        fields: [
          { key: "billing", label: "Billing Provider", value: "TIM LONG MD PSC", icon: "Hospital" },
          { key: "rendering", label: "Rendering Provider", value: "Timothy, Long", icon: "UserRound" },
          { key: "tax", label: "Tax ID (TIN)", value: "371420890", icon: "Hash" },
          { key: "addr", label: "Billing Address", value: "1320 Andrea St, Bowling Green, KY 421043334", icon: "MapPin" },
          { key: "npi", label: "NPI", value: "1234XXXXXX", icon: "ShieldCheck" },
          { key: "taxonomy", label: "Taxonomy", value: "207R00000X — Internal Medicine", icon: "Briefcase" },
        ],
      },
    ],
    questions: [
      makeQ("l2q1", "Is this a CMS or UB hospital claim?", "CMS claim (Place of Service 11)", [
        "UB hospital claim (inpatient)",
        "UB hospital claim (outpatient)",
        "Dental claim",
      ]),
      makeQ("l2q2", "When did Humana receive the claim?", "01/27/2025", [
        "01/13/2025",
        "01/29/2025",
        "02/03/2025",
      ]),
      makeQ("l2q3", "What are the Dates of Service?", "01/13/2025", [
        "01/27/2025",
        "01/16/2025",
        "01/30/2025",
      ]),
      makeQ("l2q4", "What is the Member's ID / UMID?", "H04052170", [
        "H67409890",
        "H40052170",
        "H04025710",
      ]),
      makeQ("l2q5", "What is the Place of Service?", "11 — Office", [
        "24 — Ambulatory Surgical Center",
        "22 — Outpatient Hospital",
        "21 — Inpatient Hospital",
      ]),
      makeQ("l2q6", "Who is the billing provider?", "TIM LONG MD PSC", [
        "PARK AVE OCULOPLASTIC SURGEONS PAOS",
        "BOWLING GREEN MEDICAL GROUP",
        "ANDREA STREET CLINIC PSC",
      ]),
      makeQ("l2q7", "Who is the rendering provider?", "Timothy, Long", [
        "Yash, Vaishnav",
        "Long, Tim",
        "James, Goad",
      ]),
      makeQ("l2q8", "What is the tax ID number?", "371420890", [
        "201418623",
        "317420890",
        "371402890",
      ]),
      makeQ("l2q9", "What is the billing provider's address?", "1320 Andrea St, Bowling Green, KY 421043334", [
        "1800 Emerson Street, Suite 200, Denver, CO 802181080",
        "1320 Andrea St, Bowling Green, KY 421040000",
        "1230 Andrea St, Bowling Green, KY 421043334",
      ]),
      makeQ("l2q10", "How many services were billed?", "2", [
        "1",
        "3",
        "4",
      ]),
      makeQ("l2q11", "What is the charge amount of the first line item?", "$40.00", [
        "$75.00",
        "$35.00",
        "$40.50",
      ]),
      makeQ("l2q12", "What is the diagnosis code?", "Z23", [
        "H02135",
        "Z32",
        "Z03",
      ]),
    ],
  },
];
