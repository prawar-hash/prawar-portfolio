/**
 * Technology data — structured technical capability matrix for the AI/ML Engineer portfolio.
 * 4 Groups: Languages, Machine Learning & Data, Database, Tools.
 */
const technologies = [
  {
    code: '01',
    category: 'LANGUAGES',
    subtitle: 'Core programming and query languages',
    items: [
      {
        name: 'Python',
        spec: 'CORE LANGUAGE',
        description: 'Primary language for ML modeling, data pipelines & backend',
        isPrimary: true,
        tag: 'PY.01',
      },
      {
        name: 'SQL',
        spec: 'QUERY & SCHEMA',
        description: 'Relational data querying, complex aggregations & schema design',
        isPrimary: true,
        tag: 'SQL.02',
      },
      {
        name: 'JavaScript',
        spec: 'CLIENT LOGIC',
        description: 'Web application logic, asynchronous operations & dynamic UI',
        isPrimary: false,
        tag: 'JS.03',
      },
    ],
  },
  {
    code: '02',
    category: 'MACHINE LEARNING & DATA',
    subtitle: 'Data processing, statistical visualization, and machine learning',
    items: [
      {
        name: 'NumPy',
        spec: 'NUMERICAL COMPUTATION',
        description: 'Multi-dimensional arrays, vectorization & linear algebra',
        isPrimary: true,
        tag: 'NP.01',
      },
      {
        name: 'Pandas',
        spec: 'DATA STRUCTURES',
        description: 'Tabular analysis, data cleaning & feature engineering pipelines',
        isPrimary: true,
        tag: 'PD.02',
      },
      {
        name: 'Matplotlib',
        spec: 'DATA VISUALIZATION',
        description: 'Engineering plots, trend analysis & visualization charts',
        isPrimary: true,
        tag: 'MPL.03',
      },
      {
        name: 'Seaborn',
        spec: 'STATISTICAL VISUALS',
        description: 'Statistical distribution plotting, correlation heatmaps & aesthetics',
        isPrimary: true,
        tag: 'SNS.04',
      },
      {
        name: 'Scikit-learn',
        spec: 'PREDICTIVE MODELING',
        description: 'Classification, regression, clustering & model evaluation',
        isPrimary: true,
        tag: 'SKL.05',
      },
    ],
  },
  {
    code: '03',
    category: 'DATABASE',
    subtitle: 'Relational data management and architecture',
    items: [
      {
        name: 'MySQL',
        spec: 'RELATIONAL ENGINE',
        description: 'Relational database architecture, normalization & indexing',
        isPrimary: true,
        tag: 'MYS.01',
      },
      {
        name: 'PostgreSQL',
        spec: 'ENTERPRISE RDBMS',
        description: 'Advanced relational data modeling, constraints & ACID transactions',
        isPrimary: false,
        tag: 'PG.02',
      },
    ],
  },
  {
    code: '04',
    category: 'TOOLS',
    subtitle: 'Development, analytics, and database tooling',
    items: [
      {
        name: 'Power BI',
        spec: 'BUSINESS ANALYTICS',
        description: 'Interactive analytics dashboards, metric tracking & BI reporting',
        isPrimary: false,
        tag: 'PBI.01',
      },
      {
        name: 'MySQL Workbench',
        spec: 'DATABASE ADMIN',
        description: 'Visual database schema design, reverse engineering & query execution',
        isPrimary: false,
        tag: 'WB.02',
      },
      {
        name: 'Git',
        spec: 'VERSION CONTROL',
        description: 'Distributed version control, branch management & repository history',
        isPrimary: false,
        tag: 'GIT.03',
      },
      {
        name: 'GitHub',
        spec: 'COLLABORATION',
        description: 'Code hosting, collaboration, issue tracking & release workflows',
        isPrimary: false,
        tag: 'GH.04',
      },
    ],
  },
];

export default technologies;
