/* Dare to Care Home Care — Caregiver Training: course content + quizzes */
window.DTC_COURSES = [
  {
    id: "emergency",
    num: 1,
    code: "EP",
    title: "Emergency Preparedness & Disaster Planning",
    short: "Emergency Preparedness",
    blurb: "Proactive plans, risk assessment, supplies, and communication to keep clients safe during unexpected events.",
    minutes: 4,
    video: "assets/videos/emergency-preparedness.mp4",
    icon: "shield",
    intro: "Emergency preparedness and disaster planning involves proactive measures to ensure the safety of clients during unexpected events — creating detailed plans, identifying potential risks, and training staff on emergency protocols.",
    sections: [
      { h: "Risk Assessment", p: "A process that identifies potential hazards and implements strategies to keep both clients and care workers safe. It means identifying hazards (natural disasters, medical emergencies, security threats), assessing risks, implementing control measures, and continuously reviewing and updating the assessment." },
      { h: "Emergency Plan Development", p: "Develop comprehensive plans covering risk assessments, response protocols, communication procedures, and coordination with local emergency services. Regularly review, update, and test these plans for effectiveness." },
      { h: "Communication Protocols", p: "Use clear, concise language and active listening across multiple channels so clients and caregivers stay on the same page. Foster a supportive environment where questions are encouraged and everyone understands their role." },
      { h: "Emergency Supplies", p: "Keep essential medical equipment, first aid kits, and disaster supplies readily accessible — water, food, first aid, communication devices, plus care-specific items like incontinence aids and medications." },
      { h: "Client Education", p: "Teach clients and families about preparedness, emergency contacts, and how to access support — developing an emergency plan, preparing a disaster kit, and knowing how to reach the agency and emergency services." },
      { h: "Contingency & Regular Review", p: "Decide in advance how to manage human and financial resources, coordinate with partners, and deliver services if disrupted. Review and update the plan regularly so it stays relevant and effective." }
    ],
    quiz: [
      { q: "What is the purpose of a risk assessment in emergency preparedness?", options: ["To assign blame after an emergency occurs", "To reduce the number of staff needed", "To identify potential hazards and implement strategies that keep clients and workers safe", "To replace the emergency plan entirely"], answer: 2, why: "A risk assessment identifies hazards and implements control measures to keep both clients and care workers safe." },
      { q: "Which items should be kept stocked and readily accessible as emergency supplies?", options: ["Water, food, first aid, and communication devices", "Extra office furniture", "Decorative items", "Marketing brochures"], answer: 0, why: "Essential supplies include water, food, first aid, communication devices, and care-specific items." },
      { q: "Why should emergency plans be regularly reviewed and updated?", options: ["Because regulations require deleting old plans", "To ensure they remain relevant and effective", "Only to satisfy clients", "Reviewing is unnecessary once a plan is written"], answer: 1, why: "Regular review keeps the plan relevant and effective as conditions change." },
      { q: "Effective emergency communication includes:", options: ["Using complex medical jargon", "Avoiding client questions", "Communicating only in writing", "Clear, concise language and active listening"], answer: 3, why: "Clear language, active listening, and multiple channels keep everyone on the same page." },
      { q: "What is a contingency plan?", options: ["A plan created only after the disaster ends", "A list of client complaints", "Decisions made before an emergency about resources, coordination, and alternative service delivery", "A staff vacation schedule"], answer: 2, why: "A contingency plan is made in advance to manage resources and deliver services if operations are disrupted." }
    ]
  },
  {
    id: "home-safety",
    num: 2,
    code: "HS",
    title: "Home Safety",
    short: "Home Safety",
    blurb: "Prevent accidents and create a secure environment — hazards, bathroom and kitchen safety, and medication management.",
    minutes: 3,
    video: "assets/videos/home-safety.mp4",
    icon: "home",
    intro: "Home safety means preventing accidents and ensuring a secure environment: evaluating the home for hazards, adding safety measures like grab bars and handrails, and using good hygiene and proper lifting techniques.",
    sections: [
      { h: "Evaluate the Home for Hazards", p: "Assess for tripping hazards (loose rugs, clutter), slippery surfaces (wet floors), and poorly lit areas. Remove or secure loose rugs, clear pathways, and ensure adequate lighting in high-traffic areas." },
      { h: "Consider the Individual", p: "Adjust safety measures to the person's specific needs and abilities rather than applying a one-size-fits-all approach." },
      { h: "Bathroom Safety", p: "Use nonslip mats, install grab bars, and consider a shower chair. Remove items like bathmats or laundry baskets from the floor, and keep towels and toiletries within easy reach to reduce falls." },
      { h: "Medication Management", p: "Keep medications organized, secure, and accessible with a clear schedule so doses aren't missed or doubled. Store medications properly, maintain an up-to-date list of what the client takes, and watch for expired or unused medications." },
      { h: "Secure the Kitchen", p: "Remove hazards like sharp objects from reach, store medications properly, and use appliance safety features. Focus on fire prevention: keep the area clean, store flammables safely, inspect cords, avoid overloading outlets, and keep appliances away from water." }
    ],
    quiz: [
      { q: "Which is an example of a tripping hazard to address in the home?", options: ["Properly installed grab bars", "Loose rugs and clutter", "Adequate lighting", "A shower chair"], answer: 1, why: "Loose rugs and clutter are common tripping hazards that should be removed or secured." },
      { q: "Recommended bathroom safety modifications include:", options: ["Removing all lighting", "Adding loose bathmats", "Storing towels out of reach", "Nonslip mats, grab bars, and a shower chair"], answer: 3, why: "Nonslip mats, grab bars, and a shower chair significantly reduce the risk of falls." },
      { q: "Good medication management in the home includes:", options: ["Keeping medications organized, secure, and on a clear schedule", "Leaving pills loose on the counter", "Combining several medications into one unlabeled bottle", "Storing medications by the bathroom sink"], answer: 0, why: "Medications should be kept organized, secure, and on a clear schedule so doses aren't missed or doubled." },
      { q: "To secure the kitchen, caregivers should focus on:", options: ["Leaving sharp objects within easy reach", "Overloading outlets to save space", "Fire prevention, appliance safety, and general safety practices", "Storing flammables near the stove"], answer: 2, why: "Kitchen safety centers on fire prevention, appliance safety, and good general practices." },
      { q: "When evaluating a home for safety, caregivers should:", options: ["Apply identical measures to everyone regardless of need", "Consider the individual's needs and abilities and adjust accordingly", "Ignore poorly lit areas", "Leave pathways cluttered"], answer: 1, why: "Safety measures should be tailored to the individual's needs and abilities." }
    ]
  },
  {
    id: "abuse",
    num: 3,
    code: "AN",
    title: "Abuse & Neglect Prevention",
    short: "Abuse & Neglect Prevention",
    blurb: "Identify high-risk situations, recognize warning signs, and protect clients from abuse, neglect, and exploitation.",
    minutes: 3,
    video: "assets/videos/abuse-neglect.mp4",
    icon: "hands",
    intro: "Preventing elder abuse and neglect requires identifying high-risk individuals and situations, recognizing warning signs, and ensuring adequate support and training for both caregivers and patients.",
    sections: [
      { h: "Cognitive Impairment", p: "Individuals with dementia or other cognitive impairments are more vulnerable to abuse and neglect and need closer protection." },
      { h: "At-Risk Populations & Conditions", p: "Some populations, such as military veterans and LGBTQ+ older adults, may be at higher risk. Patients with multiple medical conditions or severe disabilities may be at higher risk of neglect." },
      { h: "Caregiver Stress", p: "Caregivers experiencing high stress, economic hardship, or substance abuse are more likely to engage in abusive behavior. Support and training reduce this risk." },
      { h: "Warning Signs", p: "Physical abuse: unexplained injuries, bruises, welts, or broken bones. Emotional abuse: threatening, belittling, or isolating behavior. Neglect: failure to provide adequate food, water, clothing, or personal care. Financial exploitation: unauthorized withdrawals from accounts or assets." }
    ],
    quiz: [
      { q: "Which individuals are generally more vulnerable to abuse and neglect?", options: ["Only people who live alone", "Only younger adults", "People with no medical conditions", "Those with dementia or other cognitive impairments"], answer: 3, why: "Cognitive impairments like dementia increase vulnerability to abuse and neglect." },
      { q: "Which is a warning sign of physical abuse?", options: ["A clean, organized home", "Unexplained injuries, bruises, welts, or broken bones", "Regular doctor visits", "Healthy meals"], answer: 1, why: "Unexplained injuries, bruises, welts, or broken bones are warning signs of physical abuse." },
      { q: "Failure to provide adequate food, water, clothing, or personal care is:", options: ["Neglect", "Informed consent", "Financial exploitation", "Emotional support"], answer: 0, why: "Failing to provide basic needs and personal care is the definition of neglect." },
      { q: "Unauthorized withdrawals from an elder's accounts or assets is a sign of:", options: ["Physical abuse", "Proper money management", "Financial exploitation", "Neglect"], answer: 2, why: "Unauthorized access to an elder's money or assets is financial exploitation." },
      { q: "A caregiver factor that increases the risk of abusive behavior is:", options: ["Taking regular breaks", "Ongoing training", "Good communication", "High stress, economic hardship, or substance abuse"], answer: 3, why: "Caregiver stress, economic hardship, and substance abuse raise the risk of abusive behavior." }
    ]
  },
  {
    id: "first-aid",
    num: 4,
    code: "FA",
    title: "Basic First Aid",
    short: "Basic First Aid",
    blurb: "Handle common emergencies — cuts, burns, choking, bleeding — and know when to call for professional help.",
    minutes: 4,
    video: "assets/videos/first-aid.mp4",
    icon: "cross",
    intro: "Basic first aid combines practical skills with a mindset of preparedness. Caregivers should be ready for common emergencies like cuts, burns, and choking, as well as serious situations requiring CPR or emergency help — while staying aware of their own safety.",
    sections: [
      { h: "Safety First", p: "Before providing any care, ensure the environment is safe for you and the person in need. Remove hazards like fire, electrical wires, or anything that could cause further harm." },
      { h: "Assess & Call for Help", p: "Once the scene is safe, check responsiveness by gently tapping and asking if they're okay. Look for breathing and life-threatening bleeding. If serious — unresponsive, not breathing normally, severe bleeding — call 911 immediately with clear information about the situation and your location." },
      { h: "Cuts, Scrapes & Burns", p: "Cuts/scrapes: clean the wound, apply pressure to stop bleeding, elevate, apply antibiotic ointment, cover, and monitor for infection. Burns: cool with cool running water (never ice or butter), cover with a sterile dressing, and seek help for severe burns." },
      { h: "Choking & Bleeding", p: "Choking (conscious): perform the Heimlich maneuver. Choking (unconscious): call for help and perform chest compressions. Bleeding: apply firm pressure with a clean cloth and elevate; use a tourniquet only as a last resort." },
      { h: "Fractures & Sprains", p: "Immobilize the injured limb and apply ice to reduce swelling. Avoid moving the person if a spinal injury is suspected, and seek medical care." }
    ],
    quiz: [
      { q: "What is the FIRST thing to do before providing first aid?", options: ["Ensure the environment is safe for you and the person", "Begin chest compressions immediately", "Apply a tourniquet", "Give the person food and water"], answer: 0, why: "Safety first — make sure the scene is safe before providing any care." },
      { q: "How should you treat a burn?", options: ["Apply ice directly to the burn", "Spread butter on it", "Cool it with cool running water and cover with a sterile dressing", "Leave it uncovered and ignore it"], answer: 2, why: "Cool burns with cool running water and cover with a sterile dressing — never ice or butter." },
      { q: "For a conscious choking adult, you should:", options: ["Give them water to drink", "Perform the Heimlich maneuver (abdominal thrusts)", "Lay them down and wait", "Do nothing until they pass out"], answer: 1, why: "For a conscious choking adult, perform the Heimlich maneuver." },
      { q: "When should you call emergency services (911)?", options: ["Only after trying every remedy yourself", "Never, to avoid bothering them", "Only for minor scrapes", "When someone is unresponsive, not breathing normally, or has severe bleeding"], answer: 3, why: "Call 911 immediately for unresponsiveness, abnormal breathing, or severe bleeding." },
      { q: "A tourniquet to control bleeding should be used:", options: ["Only as a last resort", "As the first step for any cut", "For minor scrapes", "Instead of applying pressure"], answer: 0, why: "Apply firm pressure first; use a tourniquet only as a last resort." }
    ]
  },
  {
    id: "infection",
    num: 5,
    code: "IC",
    title: "Infection Control & Universal Precautions",
    short: "Infection Control",
    blurb: "Standard precautions for every client — hand hygiene, PPE, sharps safety, and proper cleaning and disinfection.",
    minutes: 6,
    video: "assets/videos/infection-control.mp4",
    icon: "drop",
    intro: "Universal precautions are standard measures for preventing transmission of bloodborne and other infectious agents. They apply to all patients regardless of suspected or confirmed infection status, and include hand hygiene, PPE, and proper handling of sharps.",
    sections: [
      { h: "Hand Hygiene", p: "Wash with soap and water or use alcohol-based sanitizer before and after patient contact, after touching contaminated objects, and after removing gloves." },
      { h: "Personal Protective Equipment (PPE)", p: "PPE is worn to minimize exposure to hazards — gloves, gowns, masks, eye protection, and face shields when exposure to blood or body fluids is expected." },
      { h: "Sharps Safety", p: "Dispose of needles, syringes, and other sharps in designated containers immediately. Never recap needles, keep sharps visible during use, and handle them carefully to prevent accidental exposure." },
      { h: "Respiratory Hygiene & Cough Etiquette", p: "Cover coughs and sneezes with a tissue or the inside of the elbow, use disposable tissues, and wash hands frequently to reduce spread of germs like influenza, RSV, and COVID-19." },
      { h: "Cleaning, Disinfection & Safe Injection", p: "Cleaning removes dirt and debris; disinfection kills germs — disinfect after cleaning. Use aseptic technique and never reuse needles to prevent the spread of bloodborne pathogens." }
    ],
    quiz: [
      { q: "Universal precautions apply to:", options: ["Only patients known to have an infection", "Only patients in hospitals", "All patients, regardless of suspected or confirmed infection status", "Only patients who request them"], answer: 2, why: "Universal precautions apply to all patients regardless of infection status." },
      { q: "Hand hygiene should be performed:", options: ["Only at the start of the shift", "Before and after patient contact, after touching contaminated objects, and after removing gloves", "Only when hands look dirty", "Once per day"], answer: 1, why: "Perform hand hygiene before/after contact, after contaminated objects, and after removing gloves." },
      { q: "Which is an example of PPE (personal protective equipment)?", options: ["A clipboard", "A mobile phone", "A name badge", "Gloves, gowns, masks, and eye protection"], answer: 3, why: "PPE includes gloves, gowns, masks, eye protection, and face shields." },
      { q: "Proper sharps safety includes:", options: ["Never recapping needles and disposing of sharps in designated containers immediately", "Recapping needles by hand", "Leaving needles on the counter", "Reusing needles between patients"], answer: 0, why: "Never recap needles; dispose of sharps immediately in designated containers." },
      { q: "What is the difference between cleaning and disinfection?", options: ["They are exactly the same", "Disinfection removes dirt; cleaning kills germs", "Cleaning removes dirt and debris; disinfection kills germs and pathogens", "Neither affects germs"], answer: 2, why: "Cleaning removes dirt and debris; disinfection kills germs — and works best after cleaning." }
    ]
  },
  {
    id: "rights",
    num: 6,
    code: "CR",
    title: "Consumer Rights & Behavior Management",
    short: "Consumer Rights",
    blurb: "Uphold client rights and ethical behavior management — privacy, informed consent, choice, dignity, and respect.",
    minutes: 5,
    video: "assets/videos/consumer-rights.mp4",
    icon: "scale",
    intro: "Understanding consumer rights and ethical behavior management is crucial for a positive caregiving relationship. Ethical practice respects client autonomy, uses evidence-based decisions, communicates effectively, and pursues ongoing education.",
    sections: [
      { h: "Privacy & Confidentiality", p: "Clients can expect their personal space and information — including treatment details — to be kept confidential and handled per regulations like HIPAA, shared only with consent." },
      { h: "Informed Consent", p: "Clients or guardians must be fully informed about treatment options, goals, procedures, and potential risks and benefits in a clear, understandable way so they can participate in decisions." },
      { h: "Choice & Refusal", p: "Clients have the right to make choices about their treatment — to start, continue, or stop therapy — and may decline proposed interventions." },
      { h: "Dignity, Respect & Redress", p: "Every client deserves dignity and respect regardless of ability or challenge, has the right to address grievances (redress), and has the right to access their own care information and records." },
      { h: "Ethical Behavior Management", p: "Respectful practice includes active listening, inclusive communication, incorporating client feedback, cultural sensitivity, and affirming individuality." }
    ],
    quiz: [
      { q: "A client's right to privacy and confidentiality is protected under regulations like:", options: ["OSHA only", "HIPAA", "No regulations", "The Heimlich protocol"], answer: 1, why: "Privacy and confidentiality of client information are protected under HIPAA." },
      { q: "The right to informed consent means clients must be:", options: ["Told only what the caregiver chooses", "Kept unaware of risks", "Given treatment without explanation", "Fully informed about treatment options, goals, risks, and benefits in an understandable way"], answer: 3, why: "Informed consent requires clients be fully informed so they can participate in decisions." },
      { q: "The right to choice and refusal means a client can:", options: ["Never change their mind", "Only follow caregiver decisions", "Decline proposed interventions and stop therapy", "Not participate in decisions"], answer: 2, why: "Clients may make choices about their care, including declining or stopping interventions." },
      { q: "Examples of respectful, ethical practice include:", options: ["Active listening, inclusive communication, and cultural sensitivity", "Ignoring client feedback", "Making decisions without the client", "Dismissing individuality"], answer: 0, why: "Respectful practice includes active listening, inclusive communication, and cultural sensitivity." },
      { q: "The right to redress means clients have the right to:", options: ["Access free medication", "Address grievances", "Refuse to pay", "Demand a specific caregiver"], answer: 1, why: "Redress is the right to address grievances and concerns." }
    ]
  }
];

window.DTC_CONFIG = {
  org: "Dare to Care Home Care",
  trainingEntity: "Dare to Care Home Care",
  logo: "assets/dtc-logo.png",
  passPct: 80,
  signoffName: "Re'jane Tisby",
  signoffTitle: "Dare to Care Home Care",
  policyLinks: {
    emergency: "assets/policies/emergency-preparedness-plan.pdf"
  },
  // Access codes now live in access-config.js (window.DTC_ACCESS) so they are
  // easy to change — edit that one file, or point it at a remote URL.
  // See ACCESS-CODES.md.
};
