import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    // Load last read chapter from localStorage
    const savedChapter = localStorage.getItem('lastReadChapter');
    if (savedChapter) {
      setLastRead(parseInt(savedChapter));
    }
  }, []);

  useEffect(() => {
    // Save current chapter to localStorage
    localStorage.setItem('lastReadChapter', selectedChapter.toString());
  }, [selectedChapter]);

  const handleContinueReading = () => {
    if (lastRead) {
      setSelectedChapter(lastRead);
    }
  };

  const currentContent = chapterContent[selectedChapter] || chapterContent[1];

  return (
    <div className="h-screen bg-[#0d1117] flex">
      {/* Table of Contents */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 bg-[#161b22] border-r border-[#30363d] flex flex-col overflow-hidden"
      >
        <div className="p-6 border-b border-[#30363d]">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-6 h-6 text-[#1f6feb]" />
            <h2 className="text-lg font-semibold text-[#f1f5f9]">
              Surgical Reference
            </h2>
          </div>

          {lastRead && lastRead !== selectedChapter && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinueReading}
              className="w-full flex items-center gap-2 bg-[#1f6feb]/10 border border-[#1f6feb]/20 text-[#1f6feb] px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#1f6feb]/20 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Continue Reading Chapter {lastRead}
            </motion.button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {chapters.map((chapter) => (
              <motion.button
                key={chapter.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedChapter(chapter.id)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  selectedChapter === chapter.id
                    ? 'bg-[#1f6feb]/10 border border-[#1f6feb]/20'
                    : 'hover:bg-[#21262d]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#8b949e]">
                        {chapter.id.toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-sm font-medium text-[#f1f5f9]">
                        {chapter.title}
                      </h3>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {chapter.sections.map((section, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-[#8b949e] pl-6 flex items-center gap-1"
                        >
                          <ChevronRight className="w-3 h-3" />
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {lastRead === chapter.id && (
                    <Clock className="w-4 h-4 text-[#1f6feb] flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Reading Area */}
      <div className="flex-1 overflow-y-auto">
        <motion.div
          key={selectedChapter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto px-8 py-12"
        >
          {/* Chapter Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#8b949e] text-sm mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chapter {selectedChapter}</span>
            </div>
            <h1 className="text-3xl font-semibold text-[#f1f5f9] mb-2">
              {currentContent.title}
            </h1>
            <div className="h-1 w-16 bg-[#1f6feb] rounded-full"></div>
          </div>

          {/* Chapter Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-[#c9d1d9] leading-relaxed space-y-6">
              {currentContent.content.split('\n\n').map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-[15px] leading-7"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-[#30363d] flex items-center justify-between">
            {selectedChapter > 1 && (
              <motion.button
                whileHover={{ x: -4 }}
                onClick={() => setSelectedChapter(selectedChapter - 1)}
                className="flex items-center gap-2 text-[#8b949e] hover:text-[#f1f5f9] transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span className="text-sm">Previous Chapter</span>
              </motion.button>
            )}
            <div className="flex-1"></div>
            {selectedChapter < chapters.length && (
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setSelectedChapter(selectedChapter + 1)}
                className="flex items-center gap-2 text-[#8b949e] hover:text-[#f1f5f9] transition-colors"
              >
                <span className="text-sm">Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

