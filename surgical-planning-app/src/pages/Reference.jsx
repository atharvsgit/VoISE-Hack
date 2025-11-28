import React, { useState, useEffect } from 'react';
import { Book, BookOpen, Clock, ChevronRight } from 'lucide-react';

const chapters = [
  {
    id: 1,
    title: 'Introduction to Surgical Planning',
    sections: ['Overview', 'Key Principles', 'Risk Assessment']
  },
  {
    id: 2,
    title: 'Orthopedic Procedures',
    sections: ['Joint Replacement', 'Arthroscopy', 'Fracture Management']
  },
  {
    id: 3,
    title: 'Spinal Surgery',
    sections: ['Fusion Techniques', 'Decompression', 'Minimally Invasive']
  },
  {
    id: 4,
    title: 'Patient Assessment',
    sections: ['Medical History', 'Physical Examination', 'Imaging Studies']
  },
  {
    id: 5,
    title: 'Preoperative Planning',
    sections: ['Risk Stratification', 'Surgical Approach', 'Equipment Preparation']
  },
  {
    id: 6,
    title: 'Intraoperative Considerations',
    sections: ['Anesthesia', 'Positioning', 'Monitoring']
  },
  {
    id: 7,
    title: 'Postoperative Care',
    sections: ['Recovery Room', 'Pain Management', 'Complications']
  },
  {
    id: 8,
    title: 'Rehabilitation Protocols',
    sections: ['Physical Therapy', 'Range of Motion', 'Strength Training']
  }
];

const chapterContent = {
  1: {
    title: 'Introduction to Surgical Planning',
    content: `Surgical planning is a critical component of modern orthopedic practice. It involves a systematic approach to patient evaluation, risk assessment, and procedural preparation to optimize surgical outcomes.

The process begins with comprehensive patient assessment, including detailed medical history, physical examination, and relevant imaging studies. This foundational work enables surgeons to identify potential complications, plan surgical approaches, and prepare appropriate equipment and resources.

Key principles of surgical planning include:

1. Patient-Centered Care: Understanding individual patient needs, expectations, and limitations
2. Evidence-Based Practice: Utilizing current research and clinical guidelines
3. Risk Mitigation: Identifying and addressing potential complications before they occur
4. Resource Optimization: Ensuring all necessary equipment and personnel are available
5. Communication: Clear dialogue with patients, families, and surgical team members

Modern surgical planning increasingly incorporates advanced technologies such as 3D imaging, computer-assisted navigation, and patient-specific instrumentation. These tools enhance precision and may improve outcomes in complex cases.

The importance of thorough preoperative planning cannot be overstated. Studies have consistently demonstrated that comprehensive planning correlates with reduced operative time, decreased complication rates, and improved patient satisfaction.`
  },
  2: {
    title: 'Orthopedic Procedures',
    content: `Orthopedic surgery encompasses a wide range of procedures designed to treat musculoskeletal conditions. This chapter focuses on common surgical interventions and their planning requirements.

JOINT REPLACEMENT

Total joint arthroplasty represents one of the most successful orthopedic procedures. Hip and knee replacements have transformed the lives of millions of patients suffering from debilitating arthritis.

Planning considerations include:
- Patient selection and timing
- Implant selection (cemented vs. uncemented)
- Surgical approach (anterior, posterior, lateral)
- Leg length and offset planning
- Thromboembolism prophylaxis

ARTHROSCOPY

Minimally invasive arthroscopic procedures have revolutionized the treatment of joint disorders. Common applications include meniscal repair, ligament reconstruction, and cartilage procedures.

Key planning elements:
- Portal placement strategy
- Equipment and instrument preparation
- Fluid management systems
- Anticipated complications and backup plans

FRACTURE MANAGEMENT

Surgical treatment of fractures requires careful assessment of fracture pattern, soft tissue injury, and patient factors to determine optimal fixation strategy.`
  }
};

export default function Reference() {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('lastReadChapter');
    if (stored) {
      const parsed = parseInt(stored, 10);
      setSelectedChapter(parsed);
      setLastRead(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lastReadChapter', selectedChapter.toString());
    setLastRead(selectedChapter);
  }, [selectedChapter]);

  const currentContent = chapterContent[selectedChapter] || chapterContent[1];

  return (
    <div className="h-screen bg-gray-50 flex">
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-xs uppercase text-gray-500">Reference</p>
              <h2 className="text-lg font-semibold text-gray-900">Surgical manual</h2>
            </div>
          </div>
          {lastRead && (
            <button
              type="button"
              onClick={() => setSelectedChapter(lastRead)}
              className="w-full inline-flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
            >
              <Clock className="w-4 h-4" />
              Continue at chapter {lastRead}
            </button>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => setSelectedChapter(chapter.id)}
              className={`w-full text-left border rounded-md px-3 py-2 ${
                selectedChapter === chapter.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{chapter.title}</p>
                {lastRead === chapter.id && <Clock className="w-4 h-4 text-gray-400" />}
              </div>
              <ul className="mt-2 space-y-1 text-xs text-gray-500">
                {chapter.sections.map((section) => (
                  <li key={section} className="flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    {section}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-8 py-10 space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wide">
              <BookOpen className="w-4 h-4" />
              Chapter {selectedChapter}
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mt-2">{currentContent.title}</h1>
            <div className="w-12 h-1 bg-gray-900 mt-4" />
          </div>
          <article className="prose prose-sm max-w-none text-gray-800">
            {currentContent.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-base leading-7 text-gray-700">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </main>
    </div>
  );
}

