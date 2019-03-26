# MarkOps

```javascript
const subjects = {
  EM1: {
    data: "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Engineering Mathematics 1"
  },
  PHY: {
    data: "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Applied Physics"
  },
  ECE: {
    data: "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Elements of Electronics Engineering"
  },
  EME: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Elements of Mechanical Engineering"
  },
  CCP: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "C Computer Programming"
  },
  KAK: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Kannada Kali"
  },
  CHY: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Engineering Chemistry"
  },
  BEE: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Basic Electrical Engineering"
  },
  ENM: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Engineering Mechanics"
  },
  EED: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Elements of Engineering Drawing"
  },
  ENG: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Functional English"
  },
  EM2: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Engineering Mathematics 2"
  },
  DMS: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Discrete Mathematics"
  },
  COE: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Computer Organication and Embedded Systems"
  },
  DSC: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Data Structures with C"
  },
  TFC: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Theoretical Foundations of Computations"
  },
  PCP: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Programming with C++"
  },
  LIA: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Linear Algebra"
  },
  USP: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Unix System Programming"
  },
  ADA: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Analysis and Design of Algorithms"
  },
  PSQ: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Probability, Statistics and Queuing for Engineerings"
  },
  OPS: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Operating System"
  },
  JAV: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Programming with Java"
  },
  DBM: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Database Management Systems"
  },
  DCN: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Data Communication and Networking"
  },
  WEP: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Web Programming"
  },
  DMG: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Data Mining"
  },
  PYP: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Python Programming"
  },
  AIN: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Artificial Intelligence"
  },
  SEO: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Software Engineering and Object Oriented Design"
  },
  CNS: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Computer Networks and Security"
  },
  EAM: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Entrepreneurship and Management"
  },
  CDN: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "C# and .NET"
  },
  SNA: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Social Network Analysis"
  },
  VCS: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Virtualization and Cloud Security"
  },
  MLG: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",,
      name: "Machine Learning"
  },
  MAD: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Mobile Application Development"
  },
  MCT: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Mobile Computing"
  },
  ICL: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Indian Cyber Law and IT"
  },
  AWP: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Advanced Web Programming"
  },
  SAN: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Storage Area Network"
  },
  CTS: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Cryptographic Techniques and Security"
  },
  FDS: {
    data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
    name: "Foundations of Data Science"
  },
  ACC: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Advanced Cloud Computing"
  },
  STG: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Software Testing"
  },
  _1ML: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Machine Learning"
  },
  _1IS: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Information Security"
  }
  PRW: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Project Work"
  },
  GCT: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Green Computing"
  },
  SPF: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "HSS-Software Project Management and Finance"
  },
  ISC: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Internship/Soft Computing Technical Seminar"
  },
  FLG: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "HSS-Foreign Language"
  },
  _2WI: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Web Programming and Internet Applications"
  },
  _2BD: {
      data:
      "1=:::::::::::|2=:::::::::::|3=:::::::::::|4=:::::::::::|5=:::::::::::",
      name: "Big Data Analytics"
  }
};

const departments = {
    ISE: {
        I: {
            A: {
                subjects: 'EM1,PHY,ECE,EME,CCP,KAK,CHY,ELE,ENM,EED,ENG,EM2'
            },
            B: {
                subjects: 'EM1,PHY,ECE,EME,CCP,KAK,CHY,ELE,ENM,EED,ENG,EM2'
            }
        },
        II: {
            A: {
                subjects: 'DMS,COE,DSC,TFC,PCP,LIA,USP,ADA,PSQ,OPS'
            },
            B: {
                subjects: 'DMS,COE,DSC,TFC,PCP,LIA,USP,ADA,PSQ,OPS'
            }
        },
        III: {
            A: {
                subjects: 'JAV,DBM,DCN,WEP,DMG,PYP,AIN,SEO,CNS,EAM,CDN,SNA,VCS,MLG'
            },
            B: {
                subjects: 'JAV,DBM,DCN,WEP,DMG,PYP,AIN,SEO,CNS,EAM,CDN,SNA,VCS,MLG'
            }
        },
        IV: {
            A: {
                subjects: "MAD,MCT,ICL,AWP,SAN,CTS,FDS,ACC,STG,_1ML,_1IS,PRW,GCT,SPF,ISC,FLG,_2WI,_2BD"
            },
            B: {
                subjects: "MAD,MCT,ICL,AWP,SAN,CTS,FDS,ACC,STG,_1ML,_1IS,PRW,GCT,SPF,ISC,FLG,_2WI,_2BD"
            }
        },
        name: 'Information Science and Engineering'
    }
}

```
